import React from 'react';
import { useParams } from 'react-router-dom';
import { PlayArrow, Favorite, MoreHoriz } from '@mui/icons-material';
import './Album.css';

function Album() {
  const { id } = useParams();

  // Mock album data
  const album = {
    id: id,
    title: 'After Hours',
    artist: 'The Weeknd',
    releaseDate: '2020',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
    tracks: [
      {
        id: 1,
        title: 'Alone Again',
        duration: '4:10',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 2,
        title: 'Too Late',
        duration: '3:59',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 3,
        title: 'Hardest To Love',
        duration: '3:31',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 4,
        title: 'Scared To Live',
        duration: '3:11',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
      {
        id: 5,
        title: 'Snowchild',
        duration: '4:07',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
        audioUrl: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c3b.mp3'
      },
    ],
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/232?text=No+Image';
  }

  return (
    <div className="album">
      <div className="album__header">
        <img src={album.imageUrl} alt={album.title} className="album__image" onError={handleImgError} />
        <div className="album__info">
          <h1>{album.title}</h1>
          <p className="album__artist">{album.artist}</p>
          <p className="album__releaseDate">{album.releaseDate}</p>
        </div>
      </div>

      <div className="album__actions">
        <button className="album__playButton">
          <PlayArrow />
        </button>
        <button className="album__favoriteButton">
          <Favorite />
        </button>
        <button className="album__moreButton">
          <MoreHoriz />
        </button>
      </div>

      <div className="album__tracks">
        <div className="album__trackHeader">
          <div className="album__trackNumber">#</div>
          <div className="album__trackTitle">TITLE</div>
          <div className="album__trackDuration">DURATION</div>
        </div>

        {album.tracks.map((track, index) => (
          <div key={track.id} className="album__track">
            <div className="album__trackNumber">{index + 1}</div>
            <div className="album__trackTitle">
              <h4>{track.title}</h4>
            </div>
            <div className="album__trackDuration">{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Album; 