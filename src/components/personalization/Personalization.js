import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaChartLine, FaHeart, FaHistory } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Personalization = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const themes = [
    { id: 'dark', name: 'Dark', color: '#121212' },
    { id: 'light', name: 'Light', color: '#FFFFFF' },
    { id: 'purple', name: 'Purple', color: '#2D1B69' },
    { id: 'green', name: 'Green', color: '#1DB954' },
  ];

  const listeningData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Listening Time (hours)',
        data: [2.5, 3.2, 4.1, 3.8, 5.2, 6.5, 4.8],
        borderColor: '#1DB954',
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const topGenres = [
    { name: 'Pop', percentage: 35 },
    { name: 'Rock', percentage: 25 },
    { name: 'Hip Hop', percentage: 20 },
    { name: 'Electronic', percentage: 15 },
    { name: 'Jazz', percentage: 5 },
  ];

  return (
    <div className="bg-black/30 rounded-lg p-6">
      <div className="flex space-x-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-lg flex items-center space-x-2 ${
            activeTab === 'theme' ? 'bg-green-500 text-white' : 'bg-black/40 text-gray-400'
          }`}
          onClick={() => setActiveTab('theme')}
        >
          <FaPalette />
          <span>Theme</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-lg flex items-center space-x-2 ${
            activeTab === 'stats' ? 'bg-green-500 text-white' : 'bg-black/40 text-gray-400'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          <FaChartLine />
          <span>Statistics</span>
        </motion.button>
      </div>

      {activeTab === 'theme' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-white">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            {themes.map(theme => (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedTheme === theme.id ? 'ring-2 ring-green-500' : ''
                }`}
                style={{ backgroundColor: theme.color }}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="text-center">
                  <span className={`text-lg font-medium ${
                    theme.id === 'light' ? 'text-black' : 'text-white'
                  }`}>
                    {theme.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'stats' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Weekly Listening</h3>
            <div className="h-64">
              <Line
                data={listeningData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                      },
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: 'white',
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                    x: {
                      ticks: {
                        color: 'white',
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Top Genres</h3>
            <div className="space-y-4">
              {topGenres.map(genre => (
                <div key={genre.name} className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>{genre.name}</span>
                    <span>{genre.percentage}%</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${genre.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Personalization; 