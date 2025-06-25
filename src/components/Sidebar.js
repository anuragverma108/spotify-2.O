import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  LibraryMusic, 
  People, 
  Palette, 
  MusicNote,
  Favorite,
  History,
  Category
} from '@mui/icons-material';
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
        <Link to="/genres" className="sidebar__navItem">
          <Category />
          <span>Genres</span>
        </Link>
        <Link to="/library" className="sidebar__navItem">
          <LibraryMusic />
          <span>Your Library</span>
        </Link>
        <Link to="/social" className="sidebar__navItem">
          <People />
          <span>Social</span>
        </Link>
        <Link to="/personalization" className="sidebar__navItem">
          <Palette />
          <span>Personalization</span>
        </Link>
      </nav>

      <div className="sidebar__playlists">
        <h2>PLAYLISTS</h2>
        <div className="sidebar__playlistList">
          <Link to="/playlist/liked" className="sidebar__playlistItem">
            <Favorite className="sidebar__playlistIcon" />
            <span>Liked Songs</span>
          </Link>
          <Link to="/playlist/recent" className="sidebar__playlistItem">
            <History className="sidebar__playlistIcon" />
            <span>Recently Played</span>
          </Link>
          <Link to="/playlist/custom" className="sidebar__playlistItem">
            <MusicNote className="sidebar__playlistIcon" />
            <span>My Playlist #1</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 