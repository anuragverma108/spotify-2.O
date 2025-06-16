import React, { useState, useRef, useEffect } from 'react';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  VolumeUp,
} from '@mui/icons-material';
import { Slider } from '@mui/material';
import './Player.css';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    albumArt: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  });
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlaySong = (event) => {
      setCurrentSong(event.detail);
      setIsPlaying(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    window.addEventListener('playSong', handlePlaySong);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('playSong', handlePlaySong);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentSong.audioUrl;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    setCurrentTime(0);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleSeek = (event, newValue) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  function handleImgError(e) {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/56?text=No+Image';
  }

  return (
    <div className="player">
      <audio ref={audioRef} src={currentSong.audioUrl} hidden />
      <div className="player__left">
        <img
          src={currentSong.albumArt}
          alt={currentSong.title}
          className="player__albumArt"
          onError={handleImgError}
        />
        <div className="player__songInfo">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player__center">
        <div className="player__controls">
          <Shuffle className="player__control" />
          <SkipPrevious className="player__control" />
          <div className="player__playButton" onClick={togglePlay}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </div>
          <SkipNext className="player__control" />
          <Repeat className="player__control" />
        </div>

        <div className="player__progress">
          <span className="player__time">{formatTime(currentTime)}</span>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            className="player__slider"
          />
          <span className="player__time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player__right">
        <VolumeUp />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          className="player__volumeSlider"
        />
      </div>
    </div>
  );
}

export default Player; 