import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  PlayArrow, 
  Pause, 
  Delete, 
  DragIndicator,
  QueueMusic,
  Clear
} from '@mui/icons-material';
import { useMusic } from '../contexts/MusicContext';
import './Queue.css';

function Queue() {
  const { 
    queue, 
    currentTrack, 
    isPlaying, 
    playTrack, 
    removeFromQueue,
    dispatch 
  } = useMusic();
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlayTrack = (track) => {
    playTrack(track);
  };

  const handleRemoveFromQueue = (index) => {
    removeFromQueue(index);
  };

  const clearQueue = () => {
    dispatch({ type: 'SET_QUEUE', payload: [] });
  };

  const formatTime = (duration) => {
    if (!duration) return '0:00';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/40?text=No+Image';
  }

  if (queue.length === 0) {
    return (
      <div className="queue queue--empty">
        <QueueMusic className="queue__emptyIcon" />
        <p>Your queue is empty</p>
        <span>Add songs to get started</span>
      </div>
    );
  }

  return (
    <div className={`queue ${isExpanded ? 'queue--expanded' : ''}`}>
      <div className="queue__header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="queue__headerLeft">
          <QueueMusic />
          <span>Queue</span>
          <span className="queue__count">({queue.length})</span>
        </div>
        <div className="queue__headerRight">
          {queue.length > 0 && (
            <button 
              className="queue__clearButton"
              onClick={(e) => {
                e.stopPropagation();
                clearQueue();
              }}
            >
              <Clear />
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          className="queue__content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Reorder.Group 
            axis="y" 
            values={queue} 
            onReorder={(newQueue) => {
              dispatch({ type: 'SET_QUEUE', payload: newQueue });
            }}
            className="queue__list"
          >
            {queue.map((track, index) => (
              <Reorder.Item 
                key={`${track.id}-${index}`} 
                value={track}
                className="queue__item"
              >
                <div className="queue__itemContent">
                  <div className="queue__dragHandle">
                    <DragIndicator />
                  </div>
                  
                  <img 
                    src={track.imageUrl} 
                    alt={track.title} 
                    onError={handleImgError}
                    className="queue__itemImage"
                  />
                  
                  <div className="queue__itemInfo">
                    <h4 className={`queue__itemTitle ${
                      currentTrack?.id === track.id ? 'queue__itemTitle--playing' : ''
                    }`}>
                      {track.title}
                    </h4>
                    <p className="queue__itemArtist">{track.artist}</p>
                  </div>
                  
                  <div className="queue__itemActions">
                    <button 
                      className="queue__playButton"
                      onClick={() => handlePlayTrack(track)}
                    >
                      {currentTrack?.id === track.id && isPlaying ? <Pause /> : <PlayArrow />}
                    </button>
                    
                    <button 
                      className="queue__removeButton"
                      onClick={() => handleRemoveFromQueue(index)}
                    >
                      <Delete />
                    </button>
                  </div>
                  
                  <span className="queue__itemDuration">
                    {track.duration || '0:00'}
                  </span>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
      )}
    </div>
  );
}

export default Queue; 