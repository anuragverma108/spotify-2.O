import React from 'react';
import { useParams } from 'react-router-dom';
import { PlayArrow, Favorite, MoreHoriz } from '@mui/icons-material';
import './Playlist.css';

function Playlist() {
  const { id } = useParams();

  // Mock playlist data
  const playlist = {
    id: id,
    title: 'Today\'s Top Hits',
    description: 'The biggest hits right now.',
    imageUrl: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663bb',
    tracks: [
      {
        id: 1,
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        album: '\u00f7 (Divide)',
        duration: '3:53',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 2,
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: '3:20',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 3,
        title: 'Dance Monkey',
        artist: 'Tones and I',
        album: 'The Kids Are Coming',
        duration: '3:29',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Tones_and_I_-_Dance_Monkey.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
    ],
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/232?text=No+Image';
  }

  return (
    <div className="playlist">
      <div className="playlist__header">
        <img src={playlist.imageUrl} alt={playlist.title} className="playlist__image" onError={handleImgError} />
        <div className="playlist__info">
          <h1>{playlist.title}</h1>
          <p>{playlist.description}</p>
        </div>
      </div>

      <div className="playlist__actions">
        <button className="playlist__playButton">
          <PlayArrow />
        </button>
        <button className="playlist__favoriteButton">
          <Favorite />
        </button>
        <button className="playlist__moreButton">
          <MoreHoriz />
        </button>
      </div>

      <div className="playlist__tracks">
        <div className="playlist__trackHeader">
          <div className="playlist__trackNumber">#</div>
          <div className="playlist__trackTitle">TITLE</div>
          <div className="playlist__trackAlbum">ALBUM</div>
          <div className="playlist__trackDuration">DURATION</div>
        </div>

        {playlist.tracks.map((track, index) => (
          <div key={track.id} className="playlist__track">
            <div className="playlist__trackNumber">{index + 1}</div>
            <div className="playlist__trackTitle">
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
            <div className="playlist__trackAlbum">{track.album}</div>
            <div className="playlist__trackDuration">{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist; 