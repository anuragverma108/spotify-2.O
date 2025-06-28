import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShare, FaChartPie, FaPlus } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import MusicImage from '../MusicImage';

ChartJS.register(ArcElement, Tooltip, Legend);

const EnhancedPlaylist = ({ playlist }) => {
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showMoodAnalysis, setShowMoodAnalysis] = useState(false);

  const moodData = {
    labels: ['Happy', 'Energetic', 'Chill', 'Sad', 'Romantic'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="bg-black/30 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{playlist?.name}</h2>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-green-500 rounded-full"
            onClick={() => setShowCollaborators(!showCollaborators)}
          >
            <FaUsers className="text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-green-500 rounded-full"
            onClick={() => setShowMoodAnalysis(!showMoodAnalysis)}
          >
            <FaChartPie className="text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-green-500 rounded-full"
          >
            <FaShare className="text-white" />
          </motion.button>
        </div>
      </div>

      {showCollaborators && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-black/20 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Collaborators</h3>
          <div className="flex flex-wrap gap-2">
            {playlist?.collaborators?.map((collaborator, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-black/30 p-2 rounded-full"
              >
                <MusicImage
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-white text-sm">{collaborator.name}</span>
              </div>
            ))}
            <button className="p-2 bg-green-500 rounded-full">
              <FaPlus className="text-white" />
            </button>
          </div>
        </motion.div>
      )}

      {showMoodAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-black/20 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-white mb-3">Mood Analysis</h3>
          <div className="w-64 h-64 mx-auto">
            <Pie data={moodData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {playlist?.tracks?.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 bg-black/20 rounded-lg"
          >
            <MusicImage
              src={track.cover}
              alt={track.name}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1">
              <p className="text-white font-medium">{track.name}</p>
              <p className="text-gray-400 text-sm">{track.artist}</p>
            </div>
            <div className="text-gray-400 text-sm">{track.duration}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedPlaylist; 