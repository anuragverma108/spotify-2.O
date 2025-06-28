import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, FilterList, Clear } from '@mui/icons-material';
import { IconButton, Chip, Button } from '@mui/material';
import AdvancedSearch from '../components/search/AdvancedSearch';
import { useMusic } from '../contexts/MusicContext';
import { sampleTracks, sampleAlbums, searchTracks, searchArtists, searchAlbums, searchPlaylists } from '../data/musicData';
import MusicImage from '../components/MusicImage';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tracks: [], artists: [], albums: [], playlists: [] });
  const [activeFilters, setActiveFilters] = useState({});
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const { playTrack, addToQueue, addToLiked, likedSongs } = useMusic();

  const handleSearch = (query = searchQuery, filters = activeFilters) => {
    if (!query.trim() && Object.keys(filters).length === 0) {
      setSearchResults({ tracks: [], artists: [], albums: [], playlists: [] });
      return;
    }

    const results = {
      tracks: searchTracks(query, filters),
      artists: searchArtists(query),
      albums: searchAlbums(query),
      playlists: searchPlaylists(query)
    };

    setSearchResults(results);
  };

  const handleAdvancedSearch = (filters) => {
    setActiveFilters(filters);
    handleSearch(searchQuery, filters);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveFilters({});
    setSearchResults({ tracks: [], artists: [], albums: [], playlists: [] });
    setShowAdvancedSearch(false);
  };

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

  const removeFilter = (filterKey, filterValue) => {
    const newFilters = { ...activeFilters };
    if (newFilters[filterKey] === filterValue) {
      delete newFilters[filterKey];
    }
    setActiveFilters(newFilters);
    handleSearch(searchQuery, newFilters);
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  }

  const totalResults = searchResults.tracks.length + searchResults.artists.length + 
                      searchResults.albums.length + searchResults.playlists.length;

  return (
    <div className="search">
      <div className="search__header">
        <form className="search__form" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="search__inputWrapper">
            <SearchIcon className="search__icon" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search__input"
            />
            {searchQuery && (
              <IconButton onClick={handleClearSearch} className="search__clearButton">
                <Clear />
              </IconButton>
            )}
          </div>
          <IconButton 
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className={`search__filterButton ${showAdvancedSearch ? 'search__filterButton--active' : ''}`}
          >
            <FilterList />
          </IconButton>
        </form>
      </div>

      {showAdvancedSearch && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="search__advanced"
        >
          <AdvancedSearch onSearch={handleAdvancedSearch} />
        </motion.div>
      )}

      {Object.keys(activeFilters).length > 0 && (
        <div className="search__filters">
          <h3>Active Filters:</h3>
          <div className="search__filterChips">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                onDelete={() => removeFilter(key, value)}
                className="search__filterChip"
              />
            ))}
          </div>
        </div>
      )}

      {searchQuery && totalResults > 0 && (
        <div className="search__results">
          <div className="search__resultsHeader">
            <h2>Search Results for "{searchQuery}"</h2>
            <p>{totalResults} results found</p>
          </div>

          {/* Tracks */}
          {searchResults.tracks.length > 0 && (
            <section className="search__section">
              <h3>Tracks ({searchResults.tracks.length})</h3>
              <div className="search__tracksGrid">
                {searchResults.tracks.map((track) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="search__trackCard"
                    onClick={() => handleSongClick(track)}
                  >
                    <div className="search__trackImage">
                      <MusicImage src={track.imageUrl} alt={track.title} onError={handleImgError} />
                      <div className="search__trackOverlay">
                        <button className="search__playButton">▶</button>
                        <button 
                          className="search__queueButton"
                          onClick={(e) => handleAddToQueue(e, track)}
                        >
                          +
                        </button>
                        <button 
                          className={`search__likeButton ${likedSongs.some(s => s.id === track.id) ? 'search__likeButton--liked' : ''}`}
                          onClick={(e) => handleLikeSong(e, track)}
                        >
                          ♥
                        </button>
                      </div>
                    </div>
                    <h4>{track.title}</h4>
                    <p>{track.artist}</p>
                    <p className="search__trackAlbum">{track.album}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {searchResults.artists.length > 0 && (
            <section className="search__section">
              <h3>Artists ({searchResults.artists.length})</h3>
              <div className="search__artistsGrid">
                {searchResults.artists.map((artist) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="search__artistCard"
                  >
                    <MusicImage src={artist.imageUrl} alt={artist.name} onError={handleImgError} />
                    <h4>{artist.name}</h4>
                    <p>{artist.genre}</p>
                    <p className="search__artistFollowers">{artist.followers} followers</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {searchResults.albums.length > 0 && (
            <section className="search__section">
              <h3>Albums ({searchResults.albums.length})</h3>
              <div className="search__albumsGrid">
                {searchResults.albums.map((album) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="search__albumCard"
                  >
                    <MusicImage src={album.imageUrl} alt={album.title} onError={handleImgError} />
                    <h4>{album.title}</h4>
                    <p>{album.artist}</p>
                    <p className="search__albumYear">{album.year}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {searchResults.playlists.length > 0 && (
            <section className="search__section">
              <h3>Playlists ({searchResults.playlists.length})</h3>
              <div className="search__playlistsGrid">
                {searchResults.playlists.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="search__playlistCard"
                  >
                    <MusicImage src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
                    <h4>{playlist.title}</h4>
                    <p>{playlist.description}</p>
                    <p className="search__playlistCreator">by {playlist.creator}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {searchQuery && totalResults === 0 && (
        <div className="search__noResults">
          <h2>No results found for "{searchQuery}"</h2>
          <p>Try searching for something else or check your spelling</p>
          <Button 
            variant="contained" 
            onClick={handleClearSearch}
            className="search__clearAllButton"
          >
            Clear Search
          </Button>
        </div>
      )}

      {!searchQuery && !showAdvancedSearch && (
        <div className="search__browse">
          <h2>Browse Categories</h2>
          <div className="search__categories">
            <div className="search__category">
              <h3>Trending</h3>
              <div className="search__categoryContent">
                {sampleTracks.slice(0, 4).map((track) => (
                  <div key={track.id} className="search__categoryItem" onClick={() => handleSongClick(track)}>
                    <MusicImage src={track.imageUrl} alt={track.title} onError={handleImgError} />
                    <span>{track.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="search__category">
              <h3>New Releases</h3>
              <div className="search__categoryContent">
                {sampleAlbums.slice(0, 4).map((album) => (
                  <div key={album.id} className="search__categoryItem">
                    <MusicImage src={album.imageUrl} alt={album.title} onError={handleImgError} />
                    <span>{album.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search; 