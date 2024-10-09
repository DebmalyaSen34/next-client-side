import React from 'react';
import {MapPin, Star } from 'lucide-react';

const RestaurantInfo = ({ name, rating, distance }) => (
    <div className="p-4 -mt-16 relative z-5">
      <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center bg-green-500 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-white fill-current" />
            <span className="ml-1 text-sm font-semibold text-white">{rating}</span>
          </div>
          <span className="ml-2 text-sm text-black font-medium">({Math.floor(rating * 100)} ratings)</span>
        </div>
        <div className="flex items-center text-black font-medium">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{distance} km</span>
        </div>
      </div>
    </div>
  );

export default RestaurantInfo;