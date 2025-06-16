import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, LibraryMusic } from '@mui/icons-material';
import './Sidebar.css';

function handleImgError(e) {
  e.target.onerror = null;
  e.target.src = 'https://via.placeholder.com/150?text=No+Logo';
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          className="sidebar__logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="Spotify Logo"
          onError={handleImgError}
        />
      </div>

      <nav className="sidebar__nav">
        <Link to="/" className="sidebar__navItem">
          <Home />
          <span>Home</span>
        </Link>
        <Link to="/search" className="sidebar__navItem">
          <Search />
          <span>Search</span>
        </Link>
        <Link to="/library" className="sidebar__navItem">
          <LibraryMusic />
          <span>Your Library</span>
        </Link>
      </nav>

      <div className="sidebar__playlists">
        <h2>PLAYLISTS</h2>
        <div className="sidebar__playlistList">
          {/* Playlist items will be dynamically added here */}
          <div className="sidebar__playlistItem">Liked Songs</div>
          <div className="sidebar__playlistItem">Recently Played</div>
          <div className="sidebar__playlistItem">My Playlist #1</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 