import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MusicProvider } from './contexts/MusicContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Queue from './components/Queue';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
import Genres from './pages/Genres';
import AudioVisualizer from './components/visualizer/AudioVisualizer';
import FriendActivity from './components/social/FriendActivity';
import EnhancedPlaylist from './components/playlist/EnhancedPlaylist';
import AdvancedSearch from './components/search/AdvancedSearch';
import Personalization from './components/personalization/Personalization';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
  },
});

function App() {
  const [audioData, setAudioData] = useState(new Array(32).fill(0));

  // Simulate audio data updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAudioData(prev => prev.map(() => Math.random() * 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <MusicProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <div className="app__body">
              <Sidebar />
              <main className="app__main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<AdvancedSearch />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/genres" element={<Genres />} />
                  <Route path="/playlist/:id" element={<EnhancedPlaylist />} />
                  <Route path="/album/:id" element={<Album />} />
                  <Route path="/social" element={<FriendActivity />} />
                  <Route path="/personalization" element={<Personalization />} />
                </Routes>
                <AudioVisualizer audioData={audioData} />
              </main>
              <Queue />
            </div>
            <Player />
          </div>
        </Router>
      </ThemeProvider>
    </MusicProvider>
  );
}

export default App;
