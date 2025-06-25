import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MusicContext = createContext();

const initialState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  playlists: [],
  likedSongs: [],
  recentlyPlayed: [],
  searchResults: [],
  user: null,
  volume: 50,
  shuffle: false,
  repeat: 'none', // 'none', 'one', 'all'
  crossfade: false,
  audioEffects: {
    bass: 0,
    treble: 0,
    reverb: 0,
  }
};

const musicReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'REMOVE_FROM_QUEUE':
      return { ...state, queue: state.queue.filter((_, index) => index !== action.payload) };
    case 'SET_PLAYLISTS':
      return { ...state, playlists: action.payload };
    case 'ADD_PLAYLIST':
      return { ...state, playlists: [...state.playlists, action.payload] };
    case 'UPDATE_PLAYLIST':
      return {
        ...state,
        playlists: state.playlists.map(playlist =>
          playlist.id === action.payload.id ? action.payload : playlist
        )
      };
    case 'ADD_TO_LIKED':
      return { ...state, likedSongs: [...state.likedSongs, action.payload] };
    case 'REMOVE_FROM_LIKED':
      return { ...state, likedSongs: state.likedSongs.filter(song => song.id !== action.payload) };
    case 'ADD_TO_RECENT':
      return {
        ...state,
        recentlyPlayed: [action.payload, ...state.recentlyPlayed.filter(song => song.id !== action.payload.id)].slice(0, 50)
      };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_SHUFFLE':
      return { ...state, shuffle: action.payload };
    case 'SET_REPEAT':
      return { ...state, repeat: action.payload };
    case 'SET_CROSSFADE':
      return { ...state, crossfade: action.payload };
    case 'SET_AUDIO_EFFECTS':
      return { ...state, audioEffects: { ...state.audioEffects, ...action.payload } };
    default:
      return state;
  }
};

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('spotify-clone-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.keys(parsedState).forEach(key => {
        if (key !== 'currentTrack' && key !== 'isPlaying') {
          dispatch({ type: `SET_${key.toUpperCase()}`, payload: parsedState[key] });
        }
      });
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    const stateToSave = {
      playlists: state.playlists,
      likedSongs: state.likedSongs,
      recentlyPlayed: state.recentlyPlayed,
      volume: state.volume,
      shuffle: state.shuffle,
      repeat: state.repeat,
      crossfade: state.crossfade,
      audioEffects: state.audioEffects,
    };
    localStorage.setItem('spotify-clone-state', JSON.stringify(stateToSave));
  }, [state.playlists, state.likedSongs, state.recentlyPlayed, state.volume, state.shuffle, state.repeat, state.crossfade, state.audioEffects]);

  const playTrack = (track) => {
    dispatch({ type: 'SET_CURRENT_TRACK', payload: track });
    dispatch({ type: 'SET_PLAYING', payload: true });
    dispatch({ type: 'ADD_TO_RECENT', payload: track });
  };

  const togglePlay = () => {
    dispatch({ type: 'SET_PLAYING', payload: !state.isPlaying });
  };

  const addToQueue = (track) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: track });
  };

  const removeFromQueue = (index) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: index });
  };

  const addToLiked = (track) => {
    dispatch({ type: 'ADD_TO_LIKED', payload: track });
  };

  const removeFromLiked = (trackId) => {
    dispatch({ type: 'REMOVE_FROM_LIKED', payload: trackId });
  };

  const createPlaylist = (playlist) => {
    const newPlaylist = {
      ...playlist,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tracks: [],
    };
    dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist });
    return newPlaylist;
  };

  const addToPlaylist = (playlistId, track) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
      const updatedPlaylist = {
        ...playlist,
        tracks: [...playlist.tracks, track]
      };
      dispatch({ type: 'UPDATE_PLAYLIST', payload: updatedPlaylist });
    }
  };

  const removeFromPlaylist = (playlistId, trackId) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
      const updatedPlaylist = {
        ...playlist,
        tracks: playlist.tracks.filter(track => track.id !== trackId)
      };
      dispatch({ type: 'UPDATE_PLAYLIST', payload: updatedPlaylist });
    }
  };

  const value = {
    ...state,
    dispatch,
    playTrack,
    togglePlay,
    addToQueue,
    removeFromQueue,
    addToLiked,
    removeFromLiked,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}; 