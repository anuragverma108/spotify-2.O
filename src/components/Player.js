import React, { useState, useRef, useEffect } from 'react';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  VolumeUp,
  QueueMusic,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { Slider, IconButton, Tooltip } from '@mui/material';
import { useMusic } from '../contexts/MusicContext';
import './Player.css';

function Player() {
  const {
    currentTrack,
    isPlaying,
    queue,
    volume,
    shuffle,
    repeat,
    togglePlay,
    dispatch,
    addToLiked,
    removeFromLiked,
    likedSongs
  } = useMusic();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const audioRef = useRef(null);

  // Initialize with default track if none is set
  const defaultTrack = {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  };

  const track = currentTrack || defaultTrack;
  const isLiked = likedSongs.some(song => song.id === track?.id);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      dispatch({ type: 'SET_PLAYING', payload: false });
      // Auto-play next track if available
      if (queue.length > 0) {
        // Implementation for next track logic
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, queue]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;
    
    audio.src = track.audioUrl;
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
    setCurrentTime(0);
  }, [track, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleSeek = (event, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleVolumeChange = (event, newValue) => {
    dispatch({ type: 'SET_VOLUME', payload: newValue });
  };

  const toggleShuffle = () => {
    dispatch({ type: 'SET_SHUFFLE', payload: !shuffle });
  };

  const toggleRepeat = () => {
    const repeatStates = ['none', 'one', 'all'];
    const currentIndex = repeatStates.indexOf(repeat);
    const nextIndex = (currentIndex + 1) % repeatStates.length;
    dispatch({ type: 'SET_REPEAT', payload: repeatStates[nextIndex] });
  };

  const handleLike = () => {
    if (isLiked) {
      removeFromLiked(track.id);
    } else {
      addToLiked(track);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/56?text=No+Image';
  }

  return (
    <div className="player">
      <audio ref={audioRef} src={track?.audioUrl} hidden />
      
      <div className="player__left">
        <img
          src={track?.albumArt}
          alt={track?.title}
          className="player__albumArt"
          onError={handleImgError}
        />
        <div className="player__songInfo">
          <h4>{track?.title}</h4>
          <p>{track?.artist}</p>
        </div>
        <Tooltip title={isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}>
          <IconButton onClick={handleLike} className="player__likeButton">
            {isLiked ? <Favorite className="player__likedIcon" /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </div>

      <div className="player__center">
        <div className="player__controls">
          <Tooltip title="Shuffle">
            <IconButton 
              onClick={toggleShuffle}
              className={`player__control ${shuffle ? 'player__control--active' : ''}`}
            >
              <Shuffle />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Previous">
            <IconButton className="player__control">
              <SkipPrevious />
            </IconButton>
          </Tooltip>
          
          <div className="player__playButton" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </div>
          
          <Tooltip title="Next">
            <IconButton className="player__control">
              <SkipNext />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={`Repeat ${repeat === 'one' ? '(One)' : repeat === 'all' ? '(All)' : '(Off)'}`}>
            <IconButton 
              onClick={toggleRepeat}
              className={`player__control ${repeat !== 'none' ? 'player__control--active' : ''}`}
            >
              <Repeat />
            </IconButton>
          </Tooltip>
        </div>

        <div className="player__progress">
          <span className="player__time">{formatTime(currentTime)}</span>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="player__slider"
          />
          <span className="player__time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player__right">
        <Tooltip title="Queue">
          <IconButton 
            onClick={() => setShowQueue(!showQueue)}
            className={`player__queueButton ${showQueue ? 'player__queueButton--active' : ''}`}
          >
            <QueueMusic />
          </IconButton>
        </Tooltip>
        
        <VolumeUp className="player__volumeIcon" />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          className="player__volumeSlider"
        />
      </div>
    </div>
  );
}

export default Player; 