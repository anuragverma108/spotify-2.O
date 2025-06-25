import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMusic } from '../contexts/MusicContext';
import { samplePlaylists, sampleTracks } from '../data/musicData';
import './Home.css';

function Home() {
  const { playTrack, addToQueue, addToLiked, likedSongs } = useMusic();

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

  return (
    <div className="home">
      <section className="home__section">
        <h2>Good Evening</h2>
        <div className="home__grid">
          {samplePlaylists.slice(0, 6).map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/playlist/${playlist.id}`} className="home__card">
                <img src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Recently Played</h2>
        <div className="home__grid">
          {sampleTracks.slice(0, 6).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="home__item"
              onClick={() => handleSongClick(track)}
            >
              <div className="home__itemImage">
                <img 
                  src={track.imageUrl} 
                  alt={track.title} 
                  onError={handleImgError} 
                />
                <div className="home__itemOverlay">
                  <button 
                    className="home__playButton"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ▶
                  </button>
                  <button 
                    className="home__queueButton"
                    onClick={(e) => handleAddToQueue(e, track)}
                  >
                    +
                  </button>
                  <button 
                    className={`home__likeButton ${likedSongs.some(s => s.id === track.id) ? 'home__likeButton--liked' : ''}`}
                    onClick={(e) => handleLikeSong(e, track)}
                  >
                    ♥
                  </button>
                </div>
              </div>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Made For You</h2>
        <div className="home__grid">
          {samplePlaylists.slice(0, 4).map((playlist, index) => (
            <motion.div
              key={`made-${playlist.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/playlist/${playlist.id}`} className="home__card home__card--made">
                <img src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Popular Artists</h2>
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
              <img 
                src={track.imageUrl} 
                alt={track.artist} 
                onError={handleImgError} 
              />
              <h3>{track.artist}</h3>
              <p>Artist</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 