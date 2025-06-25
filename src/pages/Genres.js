import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMusic } from '../contexts/MusicContext';
import { genres } from '../data/musicData';
import './Genres.css';

function Genres() {
  const { playTrack } = useMusic();

  const handleGenreClick = (genre) => {
    // Navigate to genre-specific page or filter
    console.log('Selected genre:', genre.name);
  };

  const handleTrackClick = (track) => {
    playTrack(track);
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
  }

  return (
    <div className="genres">
      <div className="genres__header">
        <h1>Browse Genres</h1>
        <p>Discover music by genre and mood</p>
      </div>

      <section className="genres__section">
        <h2>Music Genres</h2>
        <div className="genres__grid">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="genres__card"
              onClick={() => handleGenreClick(genre)}
              style={{ 
                background: `linear-gradient(135deg, ${genre.color}20, ${genre.color}40)`,
                border: `2px solid ${genre.color}30`
              }}
            >
              <div className="genres__cardImage">
                <img 
                  src={genre.imageUrl} 
                  alt={genre.name} 
                  onError={handleImgError}
                />
                <div 
                  className="genres__cardOverlay"
                  style={{ backgroundColor: `${genre.color}80` }}
                >
                  <h3>{genre.name}</h3>
                  <p>{genre.tracks.length} tracks</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="genres__section">
        <h2>Popular Tracks by Genre</h2>
        {genres.slice(0, 4).map((genre) => (
          <div key={genre.id} className="genres__genreSection">
            <div className="genres__genreHeader">
              <h3 style={{ color: genre.color }}>{genre.name}</h3>
              <Link to={`/genre/${genre.id}`} className="genres__viewAll">
                View All
              </Link>
            </div>
            <div className="genres__tracksGrid">
              {genre.tracks.slice(0, 4).map((track) => (
                <motion.div
                  key={track.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="genres__trackCard"
                  onClick={() => handleTrackClick(track)}
                >
                  <img 
                    src={track.imageUrl} 
                    alt={track.title} 
                    onError={handleImgError}
                  />
                  <div className="genres__trackInfo">
                    <h4>{track.title}</h4>
                    <p>{track.artist}</p>
                    <span className="genres__trackDuration">{track.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Genres; 