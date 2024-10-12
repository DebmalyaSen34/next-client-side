import React from 'react';
import {MapPin, Star } from 'lucide-react';

const RestaurantInfo = ({ name, rating, distance }) => (
    <div className="p-4 -mt-16 relative z-5">
      <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
    </div>
  );

export default RestaurantInfo;