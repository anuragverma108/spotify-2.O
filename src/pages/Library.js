import React from 'react';
import { Link } from 'react-router-dom';
import './Library.css';

function Library() {
  const savedPlaylists = [
    {
      id: 1,
      title: 'Liked Songs',
      description: 'Your favorite tracks',
      imageUrl: 'https://i.scdn.co/image/ab67616d00004851e8b066f70c206551210d902b',
    },
    {
      id: 2,
      title: 'My Playlist #1',
      description: 'Created by you',
      imageUrl: 'https://i.scdn.co/image/ab67616d00004851e8b066f70c206551210d902b',
    },
  ];

  const savedAlbums = [
    {
      id: 1,
      title: 'Album Title 1',
      artist: 'Artist Name',
      imageUrl: 'https://i.scdn.co/image/ab67616d00004851e8b066f70c206551210d902b',
    },
    {
      id: 2,
      title: 'Album Title 2',
      artist: 'Artist Name',
      imageUrl: 'https://i.scdn.co/image/ab67616d00004851e8b066f70c206551210d902b',
    },
  ];

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  }

  return (
    <div className="library">
      <section className="library__section">
        <h2>Your Playlists</h2>
        <div className="library__grid">
          {savedPlaylists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="library__card">
              <img src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="library__section">
        <h2>Saved Albums</h2>
        <div className="library__grid">
          {savedAlbums.map((album) => (
            <Link to={`/album/${album.id}`} key={album.id} className="library__card">
              <img src={album.imageUrl} alt={album.title} onError={handleImgError} />
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Library; 