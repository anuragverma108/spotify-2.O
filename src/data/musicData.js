// Fallback image for any missing imageUrl
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80';

const goodImages = [
  'https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png', // Bohemian Rhapsody
  'https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg', // Stairway to Heaven
];

function assignGoodImages(arr) {
  return arr.map((item, idx) => ({
    ...item,
    imageUrl: goodImages[idx % goodImages.length]
  }));
}

function withFallbackImage(arr) {
  return arr.map(item => ({
    ...item,
    imageUrl: item.imageUrl && item.imageUrl.trim() ? item.imageUrl : FALLBACK_IMAGE
  }));
}

export const sampleTracks = assignGoodImages([
  {
    id: 1,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: '3:53',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Pop',
    year: 2017,
    mood: 'Happy',
    popularity: 95,
    albumId: 'album-1',
    artistId: 'artist-1',
    lyrics: 'The club isn\'t the best place to find a lover...',
    bpm: 96,
    key: 'C# minor'
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Pop',
    year: 2020,
    mood: 'Energetic',
    popularity: 98,
    albumId: 'album-2',
    artistId: 'artist-2',
    lyrics: 'Yeah, I\'ve been tryna call...',
    bpm: 171,
    key: 'D major'
  },
  {
    id: 3,
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: '3:29',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Pop',
    year: 2019,
    mood: 'Happy',
    popularity: 92,
    albumId: 'album-3',
    artistId: 'artist-3',
    lyrics: 'They say oh my god I see the way you shine...',
    bpm: 98,
    key: 'F major'
  },
  {
    id: 4,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Rock',
    year: 1975,
    mood: 'Epic',
    popularity: 99,
    albumId: 'album-4',
    artistId: 'artist-4',
    lyrics: 'Is this the real life? Is this just fantasy?...',
    bpm: 72,
    key: 'B♭ major'
  },
  {
    id: 5,
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    genre: 'Rock',
    year: 1976,
    mood: 'Mysterious',
    popularity: 97,
    albumId: 'album-5',
    artistId: 'artist-5',
    lyrics: 'On a dark desert highway, cool wind in my hair...',
    bpm: 75,
    key: 'B minor'
  },
  {
    id: 6,
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: '3:03',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    genre: 'Rock',
    year: 1971,
    mood: 'Peaceful',
    popularity: 96,
    albumId: 'album-6',
    artistId: 'artist-6',
    lyrics: 'Imagine all the people living life in peace...',
    bpm: 76,
    key: 'C major'
  },
  {
    id: 7,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: '4:54',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    genre: 'Pop',
    year: 1982,
    mood: 'Energetic',
    popularity: 100,
    albumId: 'album-7',
    artistId: 'artist-7',
    lyrics: 'She was more like a beauty queen from a movie scene...',
    bpm: 117,
    key: 'F♯ minor'
  },
  {
    id: 8,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: '8:02',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Rock',
    year: 1971,
    mood: 'Epic',
    popularity: 98,
    albumId: 'album-8',
    artistId: 'artist-8',
    lyrics: 'There\'s a lady who\'s sure all that glitters is gold...',
    bpm: 63,
    key: 'A minor'
  },
  {
    id: 9,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: '5:01',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    genre: 'Rock',
    year: 1991,
    mood: 'Angry',
    popularity: 97,
    albumId: 'album-9',
    artistId: 'artist-9',
    lyrics: 'Load up on guns, bring your friends...',
    bpm: 117,
    key: 'F minor'
  },
  {
    id: 10,
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    duration: '6:13',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    genre: 'Rock',
    year: 1965,
    mood: 'Rebellious',
    popularity: 95,
    albumId: 'album-10',
    artistId: 'artist-10',
    lyrics: 'Once upon a time you dressed so fine...',
    bpm: 88,
    key: 'C major'
  },
  {
    id: 11,
    title: 'Respect',
    artist: 'Aretha Franklin',
    album: 'I Never Loved a Man the Way I Love You',
    duration: '2:27',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    genre: 'R&B',
    year: 1967,
    mood: 'Empowering',
    popularity: 96,
    albumId: 'album-11',
    artistId: 'artist-11',
    lyrics: 'What you want, baby, I got it...',
    bpm: 120,
    key: 'C major'
  },
  {
    id: 12,
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    album: 'What\'s Going On',
    duration: '3:53',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    genre: 'R&B',
    year: 1971,
    mood: 'Thoughtful',
    popularity: 94,
    albumId: 'album-12',
    artistId: 'artist-12',
    lyrics: 'Mother, mother, there\'s too many of you crying...',
    bpm: 82,
    key: 'F major'
  },
  {
    id: 13,
    title: 'Superstition',
    artist: 'Stevie Wonder',
    album: 'Talking Book',
    duration: '4:26',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    genre: 'R&B',
    year: 1972,
    mood: 'Funky',
    popularity: 93,
    albumId: 'album-13',
    artistId: 'artist-13',
    lyrics: 'Very superstitious, writings on the wall...',
    bpm: 100,
    key: 'E♭ minor'
  },
  {
    id: 14,
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    album: 'The Bodyguard',
    duration: '4:31',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    genre: 'R&B',
    year: 1992,
    mood: 'Romantic',
    popularity: 99,
    albumId: 'album-14',
    artistId: 'artist-14',
    lyrics: 'If I should stay, I would only be in your way...',
    bpm: 68,
    key: 'A major'
  },
  {
    id: 15,
    title: 'Purple Haze',
    artist: 'Jimi Hendrix',
    album: 'Are You Experienced',
    duration: '2:50',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    genre: 'Rock',
    year: 1967,
    mood: 'Psychedelic',
    popularity: 95,
    albumId: 'album-15',
    artistId: 'artist-15',
    lyrics: 'Purple haze all in my brain...',
    bpm: 120,
    key: 'E major'
  },
  {
    id: 16,
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    duration: '3:57',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    genre: 'Pop',
    year: 2014,
    mood: 'Energetic',
    popularity: 96,
    albumId: 'album-16',
    artistId: 'artist-16',
    lyrics: 'This hit, that ice cold...',
    bpm: 115,
    key: 'D minor'
  },
  {
    id: 17,
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    album: 'Vida',
    duration: '4:41',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
    genre: 'Pop',
    year: 2017,
    mood: 'Romantic',
    popularity: 97,
    albumId: 'album-17',
    artistId: 'artist-17',
    lyrics: 'Sí, sabes que ya llevo un rato mirándote...',
    bpm: 89,
    key: 'B minor'
  },
  {
    id: 18,
    title: 'Old Town Road',
    artist: 'Lil Nas X',
    album: '7',
    duration: '2:37',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3',
    genre: 'Hip Hop',
    year: 2019,
    mood: 'Energetic',
    popularity: 94,
    albumId: 'album-18',
    artistId: 'artist-18',
    lyrics: 'Yeah, I\'m gonna take my horse to the old town road...',
    bpm: 136,
    key: 'B minor'
  },
  {
    id: 19,
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    album: 'When We All Fall Asleep, Where Do We Go?',
    duration: '3:14',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3',
    genre: 'Pop',
    year: 2019,
    mood: 'Dark',
    popularity: 93,
    albumId: 'album-19',
    artistId: 'artist-19',
    lyrics: 'White shirt now red, my bloody nose...',
    bpm: 135,
    key: 'B minor'
  },
  {
    id: 20,
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3',
    genre: 'Pop',
    year: 2020,
    mood: 'Happy',
    popularity: 91,
    albumId: 'album-20',
    artistId: 'artist-20',
    lyrics: 'If you wanna run away with me, I know a galaxy...',
    bpm: 103,
    key: 'F♯ minor'
  }
]);

export const sampleAlbums = assignGoodImages([
  {
    id: 'album-1',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    year: 2017,
    genre: 'Pop',
    tracks: sampleTracks.filter(track => track.albumId === 'album-1'),
    description: 'The third studio album by English singer-songwriter Ed Sheeran.',
    totalDuration: '46:14',
    popularity: 95
  },
  {
    id: 'album-2',
    title: 'After Hours',
    artist: 'The Weeknd',
    year: 2020,
    genre: 'Pop',
    tracks: sampleTracks.filter(track => track.albumId === 'album-2'),
    description: 'The fourth studio album by Canadian singer The Weeknd.',
    totalDuration: '56:19',
    popularity: 98
  },
  {
    id: 'album-4',
    title: 'A Night at the Opera',
    artist: 'Queen',
    year: 1975,
    genre: 'Rock',
    tracks: sampleTracks.filter(track => track.albumId === 'album-4'),
    description: 'The fourth studio album by British rock band Queen.',
    totalDuration: '43:08',
    popularity: 99
  },
  {
    id: 'album-7',
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    genre: 'Pop',
    tracks: sampleTracks.filter(track => track.albumId === 'album-7'),
    description: 'The sixth studio album by American singer Michael Jackson.',
    totalDuration: '42:19',
    popularity: 100
  },
  {
    id: 'album-8',
    title: 'Led Zeppelin IV',
    artist: 'Led Zeppelin',
    year: 1971,
    genre: 'Rock',
    tracks: sampleTracks.filter(track => track.albumId === 'album-8'),
    description: 'The fourth studio album by English rock band Led Zeppelin.',
    totalDuration: '42:34',
    popularity: 98
  }
]);

export const sampleArtists = assignGoodImages([
  {
    id: 'artist-1',
    name: 'Ed Sheeran',
    genre: 'Pop',
    followers: '45.2M',
    monthlyListeners: '52.1M',
    topTracks: sampleTracks.filter(track => track.artistId === 'artist-1'),
    albums: sampleAlbums.filter(album => album.artist === 'Ed Sheeran'),
    bio: 'English singer-songwriter known for his acoustic sound and heartfelt lyrics.'
  },
  {
    id: 'artist-2',
    name: 'The Weeknd',
    genre: 'Pop',
    followers: '38.7M',
    monthlyListeners: '41.3M',
    topTracks: sampleTracks.filter(track => track.artistId === 'artist-2'),
    albums: sampleAlbums.filter(album => album.artist === 'The Weeknd'),
    bio: 'Canadian singer-songwriter known for his distinctive voice and R&B-influenced pop music.'
  },
  {
    id: 'artist-4',
    name: 'Queen',
    genre: 'Rock',
    followers: '28.9M',
    monthlyListeners: '32.5M',
    topTracks: sampleTracks.filter(track => track.artistId === 'artist-4'),
    albums: sampleAlbums.filter(album => album.artist === 'Queen'),
    bio: 'British rock band formed in London in 1970, known for their theatrical performances and diverse musical styles.'
  },
  {
    id: 'artist-7',
    name: 'Michael Jackson',
    genre: 'Pop',
    followers: '42.1M',
    monthlyListeners: '48.7M',
    topTracks: sampleTracks.filter(track => track.artistId === 'artist-7'),
    albums: sampleAlbums.filter(album => album.artist === 'Michael Jackson'),
    bio: 'American singer, songwriter, and dancer known as the "King of Pop" for his contributions to music and dance.'
  },
  {
    id: 'artist-8',
    name: 'Led Zeppelin',
    genre: 'Rock',
    followers: '25.3M',
    monthlyListeners: '29.8M',
    topTracks: sampleTracks.filter(track => track.artistId === 'artist-8'),
    albums: sampleAlbums.filter(album => album.artist === 'Led Zeppelin'),
    bio: 'English rock band formed in London in 1968, considered one of the most influential bands in rock music history.'
  }
]);

export const sampleGenres = assignGoodImages([
  {
    id: 'pop',
    name: 'Pop',
    description: 'Popular music characterized by catchy melodies and broad appeal',
    color: '#FF6B6B',
    tracks: sampleTracks.filter(track => track.genre === 'Pop'),
    popularity: 95
  },
  {
    id: 'rock',
    name: 'Rock',
    description: 'A broad genre of popular music that originated as "rock and roll"',
    color: '#4ECDC4',
    tracks: sampleTracks.filter(track => track.genre === 'Rock'),
    popularity: 88
  },
  {
    id: 'r&b',
    name: 'R&B',
    description: 'Rhythm and blues, a genre of popular African-American music',
    color: '#45B7D1',
    tracks: sampleTracks.filter(track => track.genre === 'R&B'),
    popularity: 82
  },
  {
    id: 'hip-hop',
    name: 'Hip Hop',
    description: 'A music genre developed in the United States by inner-city African Americans',
    color: '#96CEB4',
    tracks: sampleTracks.filter(track => track.genre === 'Hip Hop'),
    popularity: 85
  },
  {
    id: 'electronic',
    name: 'Electronic',
    description: 'Music that employs electronic musical instruments and electronic music technology',
    color: '#FFEAA7',
    tracks: [],
    popularity: 78
  },
  {
    id: 'jazz',
    name: 'Jazz',
    description: 'A music genre that originated in the African-American communities of New Orleans',
    color: '#DDA0DD',
    tracks: [],
    popularity: 72
  }
]);

export const samplePlaylists = assignGoodImages([
  {
    id: 'playlist-1',
    title: 'Today\'s Top Hits',
    description: 'The biggest hits right now.',
    tracks: sampleTracks.slice(0, 10),
    creator: 'Spotify',
    followers: '32.5M',
    totalDuration: '45:23',
    isPublic: true,
    collaborators: [],
    mood: 'Energetic',
    genre: 'Pop'
  },
  {
    id: 'playlist-2',
    title: 'Rock Classics',
    description: 'The greatest rock songs of all time.',
    tracks: sampleTracks.filter(track => track.genre === 'Rock'),
    creator: 'Rock Music',
    followers: '15.2M',
    totalDuration: '52:18',
    isPublic: true,
    collaborators: [],
    mood: 'Energetic',
    genre: 'Rock'
  },
  {
    id: 'playlist-3',
    title: 'Chill Vibes',
    description: 'Relaxing music for your downtime.',
    tracks: sampleTracks.slice(5, 15),
    creator: 'Chill Music',
    followers: '8.7M',
    totalDuration: '38:45',
    isPublic: true,
    collaborators: [],
    mood: 'Chill',
    genre: 'Mixed'
  },
  {
    id: 'playlist-4',
    title: 'Workout Mix',
    description: 'High-energy tracks to keep you motivated.',
    tracks: sampleTracks.filter(track => track.mood === 'Energetic'),
    creator: 'Fitness Music',
    followers: '12.3M',
    totalDuration: '41:12',
    isPublic: true,
    collaborators: [],
    mood: 'Energetic',
    genre: 'Mixed'
  },
  {
    id: 'playlist-5',
    title: 'Romantic Evening',
    description: 'Perfect for a romantic dinner or date night.',
    tracks: sampleTracks.filter(track => track.mood === 'Romantic'),
    creator: 'Love Songs',
    followers: '6.8M',
    totalDuration: '35:29',
    isPublic: true,
    collaborators: [],
    mood: 'Romantic',
    genre: 'Mixed'
  },
  {
    id: 'playlist-6',
    title: 'Road Trip',
    description: 'The perfect soundtrack for your journey.',
    tracks: sampleTracks.slice(0, 12),
    creator: 'Travel Music',
    followers: '9.4M',
    totalDuration: '48:33',
    isPublic: true,
    collaborators: [],
    mood: 'Adventurous',
    genre: 'Mixed'
  }
]);

export const sampleFriendActivity = [
  {
    id: 1,
    userName: 'Sarah Johnson',
    userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    trackName: 'Blinding Lights',
    artistName: 'The Weeknd',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/a/a0/The_Weeknd_-_After_Hours.png',
    timestamp: '2 minutes ago',
    isLiked: false
  },
  {
    id: 2,
    userName: 'Mike Chen',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    trackName: 'Shape of You',
    artistName: 'Ed Sheeran',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
    timestamp: '5 minutes ago',
    isLiked: true
  },
  {
    id: 3,
    userName: 'Emma Davis',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    trackName: 'Bohemian Rhapsody',
    artistName: 'Queen',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png',
    timestamp: '8 minutes ago',
    isLiked: false
  },
  {
    id: 4,
    userName: 'Alex Thompson',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    trackName: 'Hotel California',
    artistName: 'Eagles',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/4/49/Eagles_-_Hotel_California.jpg',
    timestamp: '12 minutes ago',
    isLiked: true
  },
  {
    id: 5,
    userName: 'Lisa Wang',
    userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    trackName: 'Billie Jean',
    artistName: 'Michael Jackson',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/5/57/Michael_Jackson_-_Thriller.png',
    timestamp: '15 minutes ago',
    isLiked: false
  }
];

// Enhanced search functionality
export const searchTracks = (query, filters = {}) => {
  let results = [...sampleTracks];
  
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(track => 
      track.title.toLowerCase().includes(searchTerm) ||
      track.artist.toLowerCase().includes(searchTerm) ||
      track.album.toLowerCase().includes(searchTerm) ||
      track.lyrics.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.genre) {
    results = results.filter(track => track.genre === filters.genre);
  }
  
  if (filters.year) {
    results = results.filter(track => track.year === parseInt(filters.year));
  }
  
  if (filters.mood) {
    results = results.filter(track => track.mood === filters.mood);
  }
  
  if (filters.popularity) {
    const minPopularity = parseInt(filters.popularity);
    results = results.filter(track => track.popularity >= minPopularity);
  }
  
  return results;
};

export const searchArtists = (query) => {
  if (!query) return sampleArtists;
  
  const searchTerm = query.toLowerCase();
  return sampleArtists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm) ||
    artist.genre.toLowerCase().includes(searchTerm)
  );
};

export const searchAlbums = (query) => {
  if (!query) return sampleAlbums;
  
  const searchTerm = query.toLowerCase();
  return sampleAlbums.filter(album => 
    album.title.toLowerCase().includes(searchTerm) ||
    album.artist.toLowerCase().includes(searchTerm) ||
    album.genre.toLowerCase().includes(searchTerm)
  );
};

export const searchPlaylists = (query) => {
  if (!query) return samplePlaylists;
  
  const searchTerm = query.toLowerCase();
  return samplePlaylists.filter(playlist => 
    playlist.title.toLowerCase().includes(searchTerm) ||
    playlist.description.toLowerCase().includes(searchTerm) ||
    playlist.creator.toLowerCase().includes(searchTerm)
  );
}; 