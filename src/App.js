import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Album from './pages/Album';
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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <div className="app__body">
            <Sidebar />
            <main className="app__main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/album/:id" element={<Album />} />
              </Routes>
            </main>
          </div>
          <Player />
    </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
