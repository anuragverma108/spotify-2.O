import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const featuredPlaylists = [
    {
      id: 1,
      title: 'Today\'s Top Hits',
      description: 'The biggest hits right now.',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      title: 'RapCaviar',
      description: 'New music from Drake, Kendrick Lamar and more.',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      title: 'All Out 2010s',
      description: 'The biggest songs of the 2010s.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      title: 'Rock Classics',
      description: 'Rock legends & epic songs.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const recentlyPlayed = [
    {
      id: 1,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      id: 2,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: 3,
      title: 'Dance Monkey',
      artist: 'Tones and I',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  ];

  const handleSongClick = (song) => {
    // You can implement a global state management solution here
    // For now, we'll use a simple event dispatch
    const event = new CustomEvent('playSong', { detail: song });
    window.dispatchEvent(event);
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
          {featuredPlaylists.map((playlist) => (
            <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="home__card">
              <img src={playlist.imageUrl} alt={playlist.title} onError={handleImgError} />
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Recently Played</h2>
        <div className="home__grid">
          {recentlyPlayed.map((track) => (
            <div 
              key={track.id} 
              className="home__item"
              onClick={() => handleSongClick(track)}
            >
              <img 
                src={track.imageUrl} 
                alt={track.title} 
                onError={handleImgError} 
              />
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 