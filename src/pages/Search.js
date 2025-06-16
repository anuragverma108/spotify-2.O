import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement actual search functionality with API
    // For now, using mock data
    const mockResults = [
      {
        id: 1,
        type: 'track',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        imageUrl: 'https://i.scdn.co/image/ab67616d00004851e8b066f70c206551210d902b',
      },
      {
        id: 2,
        type: 'artist',
        name: 'The Weeknd',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576',
      },
      {
        id: 3,
        type: 'playlist',
        title: 'Today\'s Top Hits',
        description: 'The biggest hits right now.',
        imageUrl: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663bb',
      },
    ];
    setSearchResults(mockResults);
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <div className="search__inputWrapper">
          <SearchIcon className="search__icon" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search__input"
          />
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="search__results">
          {searchResults.map((result) => (
            <div key={result.id} className="search__resultCard">
              <img src={result.imageUrl} alt={result.title || result.name} onError={handleImgError} />
              <div className="search__resultInfo">
                <h3>{result.title || result.name}</h3>
                <p>{result.type === 'track' ? result.artist : result.type}</p>
                {result.description && <p>{result.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && (
        <div className="search__noResults">
          <h2>No results found for "{searchQuery}"</h2>
          <p>Try searching for something else</p>
        </div>
      )}
    </div>
  );
}

export default Search; 