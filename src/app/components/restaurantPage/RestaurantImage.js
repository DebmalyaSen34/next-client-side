import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RestaurantImage = ({ src, name }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
  
    React.useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
    }, [src]);

    return (
      <div className="relative h-72 overflow-hidden">
        <motion.img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
    );
  };

export default RestaurantImage;