import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaMusic, FaMicrophone, FaHeart } from 'react-icons/fa';

const AdvancedSearch = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('all');
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    mood: '',
    popularity: '',
  });

  const genres = [
    'Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Electronic',
    'R&B', 'Country', 'Metal', 'Folk', 'Blues', 'Reggae'
  ];

  const moods = [
    'Happy', 'Energetic', 'Chill', 'Sad', 'Romantic', 'Angry',
    'Nostalgic', 'Motivational', 'Relaxed', 'Focused'
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-black/30 rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search songs, artists, or lyrics..."
            className="w-full bg-black/40 text-white px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <FaFilter />
          <span>Filters</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-400 mb-2">Search Type</label>
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-lg flex items-center space-x-2 ${
                searchType === 'all' ? 'bg-green-500 text-white' : 'bg-black/40 text-gray-400'
              }`}
              onClick={() => setSearchType('all')}
            >
              <FaMusic />
              <span>All</span>
            </button>
            <button
              className={`p-2 rounded-lg flex items-center space-x-2 ${
                searchType === 'lyrics' ? 'bg-green-500 text-white' : 'bg-black/40 text-gray-400'
              }`}
              onClick={() => setSearchType('lyrics')}
            >
              <FaMicrophone />
              <span>Lyrics</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Genre</label>
          <select
            className="w-full bg-black/40 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Mood</label>
          <select
            className="w-full bg-black/40 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filters.mood}
            onChange={(e) => handleFilterChange('mood', e.target.value)}
          >
            <option value="">All Moods</option>
            {moods.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Year</label>
          <input
            type="number"
            placeholder="Enter year"
            className="w-full bg-black/40 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-black/40 text-white"
          onClick={() => setFilters({
            genre: '',
            year: '',
            mood: '',
            popularity: '',
          })}
        >
          Reset
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg bg-green-500 text-white"
          onClick={() => onSearch({ searchType, ...filters })}
        >
          Search
        </motion.button>
      </div>
    </div>
  );
};

export default AdvancedSearch; 