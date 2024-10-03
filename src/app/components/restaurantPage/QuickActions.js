import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Share2 } from 'lucide-react';

const QuickActions = () => (
    <div className="flex justify-around py-4 border-b border-gray-200">
      <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-1">
          <Heart className="w-6 h-6 text-red-500" />
        </div>
        <span className="text-xs text-black font-medium">Favorite</span>
      </motion.button>
      <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
          <Share2 className="w-6 h-6 text-blue-500" />
        </div>
        <span className="text-xs text-black font-medium">Share</span>
      </motion.button>
      <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
          <MapPin className="w-6 h-6 text-green-500" />
        </div>
        <span className="text-xs text-black font-medium">Directions</span>
      </motion.button>
    </div>
  );

export default QuickActions;