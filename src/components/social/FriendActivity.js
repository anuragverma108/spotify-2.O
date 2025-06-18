import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaMusic, FaHeart } from 'react-icons/fa';

const FriendActivity = ({ activities }) => {
  return (
    <div className="bg-black/30 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Friend Activity</h2>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 bg-black/20 rounded-lg"
          >
            <div className="relative">
              <img
                src={activity.userImage}
                alt={activity.userName}
                className="w-12 h-12 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <FaMusic className="text-white text-xs" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{activity.userName}</p>
              <p className="text-gray-400 text-sm">
                Listening to {activity.trackName} by {activity.artistName}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <FaHeart className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FriendActivity; 