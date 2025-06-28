import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayArrow, 
  Favorite, 
  FavoriteBorder, 
  Add, 
  TrendingUp,
  MusicNote,
  Mood,
  Whatshot
} from '@mui/icons-material';
import { useMusic } from '../contexts/MusicContext';
import { samplePlaylists, sampleTracks } from '../data/musicData';
import MusicImage from '../components/MusicImage';
import './Home.css';

function Home() {
  const { playTrack, addToQueue, addToLiked, likedSongs, recentlyPlayed } = useMusic();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    updateGreeting();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSongClick = (song) => {
    playTrack(song);
  };

  const handleAddToQueue = (e, song) => {
    e.stopPropagation();
    addToQueue(song);
  };

  const handleLikeSong = (e, song) => {
    e.stopPropagation();
    if (likedSongs.some(s => s.id === song.id)) {
      // Remove from liked (this would need to be implemented in context)
    } else {
      addToLiked(song);
    }
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  }

  // Group tracks by mood for mood-based playlists
  const moodPlaylists = {
    'Happy': sampleTracks.filter(track => track.mood === 'Happy').slice(0, 6),
    'Energetic': sampleTracks.filter(track => track.mood === 'Energetic').slice(0, 6),
    'Chill': sampleTracks.filter(track => track.mood === 'Peaceful' || track.mood === 'Relaxed').slice(0, 6),
    'Romantic': sampleTracks.filter(track => track.mood === 'Romantic').slice(0, 6),
  };

  // Get trending tracks (based on popularity)
  const trendingTracks = sampleTracks
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  // Get recently played tracks
  const recentTracks = recentlyPlayed.length > 0 ? recentlyPlayed.slice(0, 6) : sampleTracks.slice(0, 6);

  return (
    <div className="home">
      {/* Header with greeting and time */}
      <div className="home__header">
        <div className="home__greeting">
          <h1>{greeting}</h1>
          <p className="home__time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="home__quickActions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="home__quickAction"
          >
            <MusicNote />
            <span>Create Playlist</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="home__quickAction"
          >
            <Mood />
            <span>Mood Mix</span>
          </motion.button>
        </div>
      </div>

      {/* Recently Played Section */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <h2>Recently Played</h2>
          <Link to="/library" className="home__seeAll">See All</Link>
        </div>
        <div className="home__grid">
          {recentTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="home__item"
              onClick={() => handleSongClick(track)}
            >
              <div className="home__itemImage">
                <MusicImage 
                  src={track.imageUrl} 
                  alt={track.title} 
                  onError={handleImgError} 
                />
                <div className="home__itemOverlay">
                  <button 
                    className="home__playButton"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PlayArrow />
                  </button>
                  <button 
                    className="home__queueButton"
                    onClick={(e) => handleAddToQueue(e, track)}
                  >
                    <Add />
                  </button>
                  <button 
                    className={`home__likeButton ${likedSongs.some(s => s.id === track.id) ? 'home__likeButton--liked' : ''}`}
                    onClick={(e) => handleLikeSong(e, track)}
                  >
                    {likedSongs.some(s => s.id === track.id) ? <Favorite /> : <FavoriteBorder />}
                  </button>
                </div>
              </div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <div className="home__sectionTitle">
            <TrendingUp className="home__sectionIcon" />
            <h2>Trending Now</h2>
          </div>
          <Link to="/search" className="home__seeAll">See All</Link>
        </div>
        <div className="home__grid">
          {trendingTracks.map((track, index) => (
            <motion.div
              key={`trending-${track.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="home__item home__item--trending"
              onClick={() => handleSongClick(track)}
            >
              <div className="home__itemImage">
                <MusicImage 
                  src={track.imageUrl} 
                  alt={track.title} 
                  onError={handleImgError} 
                />
                <div className="home__trendingBadge">
                  <Whatshot />
                  <span>{track.popularity}</span>
                </div>
                <div className="home__itemOverlay">
                  <button className="home__playButton">
                    <PlayArrow />
                  </button>
                  <button 
                    className="home__queueButton"
                    onClick={(e) => handleAddToQueue(e, track)}
                  >
                    <Add />
                  </button>
                  <button 
                    className={`home__likeButton ${likedSongs.some(s => s.id === track.id) ? 'home__likeButton--liked' : ''}`}
                    onClick={(e) => handleLikeSong(e, track)}
                  >
                    {likedSongs.some(s => s.id === track.id) ? <Favorite /> : <FavoriteBorder />}
                  </button>
                </div>
              </div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <p className="home__itemGenre">{track.genre}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Made For You Playlists */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <h2>Made For You</h2>
          <Link to="/library" className="home__seeAll">See All</Link>
        </div>
        <div className="home__grid">
          {samplePlaylists.slice(0, 6).map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/playlist/${playlist.id}`} className="home__card home__card--made">
                <MusicImage src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
                <div className="home__cardOverlay">
                  <button className="home__playButton">
                    <PlayArrow />
                  </button>
                </div>
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mood-Based Playlists */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <h2>Mood Playlists</h2>
          <Link to="/genres" className="home__seeAll">Browse All</Link>
        </div>
        <div className="home__moodGrid">
          {Object.entries(moodPlaylists).map(([mood, tracks], moodIndex) => (
            <motion.div
              key={mood}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: moodIndex * 0.2 }}
              className="home__moodCard"
            >
              <div className="home__moodHeader">
                <h3>{mood} Vibes</h3>
                <span className="home__moodCount">{tracks.length} songs</span>
              </div>
              <div className="home__moodTracks">
                {tracks.map((track, trackIndex) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: moodIndex * 0.2 + trackIndex * 0.1 }}
                    className="home__moodTrack"
                    onClick={() => handleSongClick(track)}
                  >
                    <MusicImage src={track.imageUrl} alt={track.title} onError={handleImgError} />
                    <div className="home__moodTrackInfo">
                      <h4>{track.title}</h4>
                      <p>{track.artist}</p>
                    </div>
                    <button 
                      className={`home__likeButton ${likedSongs.some(s => s.id === track.id) ? 'home__likeButton--liked' : ''}`}
                      onClick={(e) => handleLikeSong(e, track)}
                    >
                      {likedSongs.some(s => s.id === track.id) ? <Favorite /> : <FavoriteBorder />}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <h2>Popular Artists</h2>
          <Link to="/search" className="home__seeAll">See All</Link>
        </div>
        <div className="home__grid home__grid--artists">
          {sampleTracks.slice(0, 8).map((track, index) => (
            <motion.div
              key={`artist-${track.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="home__artistCard"
              onClick={() => handleSongClick(track)}
            >
              <MusicImage 
                src={track.imageUrl} 
                alt={track.artist} 
                onError={handleImgError} 
              />
              <h3>{track.artist}</h3>
              <p>Artist</p>
              <div className="home__artistStats">
                <span>{track.popularity}M monthly listeners</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="home__section">
        <div className="home__sectionHeader">
          <h2>New Releases</h2>
          <Link to="/search" className="home__seeAll">See All</Link>
        </div>
        <div className="home__grid">
          {sampleTracks.slice(0, 6).map((track, index) => (
            <motion.div
              key={`new-${track.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="home__item home__item--new"
              onClick={() => handleSongClick(track)}
            >
              <div className="home__itemImage">
                <MusicImage 
                  src={track.imageUrl} 
                  alt={track.title} 
                  onError={handleImgError} 
                />
                <div className="home__newBadge">NEW</div>
                <div className="home__itemOverlay">
                  <button className="home__playButton">
                    <PlayArrow />
                  </button>
                  <button 
                    className="home__queueButton"
                    onClick={(e) => handleAddToQueue(e, track)}
                  >
                    <Add />
                  </button>
                  <button 
                    className={`home__likeButton ${likedSongs.some(s => s.id === track.id) ? 'home__likeButton--liked' : ''}`}
                    onClick={(e) => handleLikeSong(e, track)}
                  >
                    {likedSongs.some(s => s.id === track.id) ? <Favorite /> : <FavoriteBorder />}
                  </button>
                </div>
              </div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <p className="home__itemYear">{track.year}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 