"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, MapPin, Star, ChevronRight, Check, Coffee, Car, Utensils, Droplet, Heart, Share2, Clock } from 'lucide-react';
import Image from 'next/image';

const Header = ({ name, onBack }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-10 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      animate={{ backgroundColor: isScrolled ? '#FFFFFF' : 'transparent' }}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
        </button>
        {isScrolled && <h1 className="text-lg font-semibold text-gray-800">{name}</h1>}
        <User className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
      </div>
    </motion.header>
  );
};

const RestaurantImage = ({ src, name }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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

const RestaurantInfo = ({ name, rating, distance, cuisine }) => (
  <div className="p-4 -mt-16 relative z-10">
    <h2 className="text-3xl font-bold text-white mb-2">{name}</h2>
    <p className="text-orange-500 mb-2">{cuisine}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center bg-green-500 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-white fill-current" />
          <span className="ml-1 text-sm font-semibold text-white">{rating}</span>
        </div>
        <span className="ml-2 text-sm text-black">({Math.floor(rating * 100)} ratings)</span>
      </div>
      <div className="flex items-center text-gray-200">
        <MapPin className="w-4 h-4 mr-1" />
        <span className="text-sm">{distance} km</span>
      </div>
    </div>
  </div>
);

const QuickActions = () => (
  <div className="flex justify-around py-4 border-b border-gray-200">
    <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-1">
        <Heart className="w-6 h-6 text-red-500" />
      </div>
      <span className="text-xs text-gray-600">Favorite</span>
    </motion.button>
    <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1">
        <Share2 className="w-6 h-6 text-blue-500" />
      </div>
      <span className="text-xs text-gray-600">Share</span>
    </motion.button>
    <motion.button whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1">
        <MapPin className="w-6 h-6 text-green-500" />
      </div>
      <span className="text-xs text-gray-600">Directions</span>
    </motion.button>
  </div>
);

const Description = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setShowMore(descriptionRef.current.scrollHeight > 80);
    }
  }, [text]);

  return (
    <div className="p-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">About {'Restaurant'}</h3>
      <motion.div
        ref={descriptionRef}
        initial={{ height: 80 }}
        animate={{ height: expanded ? 'auto' : 80 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 text-sm">{text}</p>
      </motion.div>
      {showMore && (
        <button
          className="text-red-500 text-sm font-medium mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

const Facilities = ({ facilities }) => (
  <div className="p-4 bg-white mt-2">
    <h3 className="text-lg font-semibold mb-2">Facilities</h3>
    <div className="grid grid-cols-2 gap-4">
      {facilities.map((facility, index) => (
        <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm text-gray-700">{facility}</span>
        </div>
      ))}
    </div>
  </div>
);

const BestOffers = ({ offers }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({ left: direction * 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 bg-white mt-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Best Offers</h3>
        <button className="text-red-500 text-sm font-medium flex items-center">
          See all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="relative">
        <div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-40 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image src={offer.image} alt={offer.name} width={160} height={32} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h4 className="font-medium text-sm mb-1">{offer.name}</h4>
                <p className="text-red-500 text-xs font-semibold">${offer.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PreOrderButton = () => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-4 left-4 right-4 bg-red-500 text-white py-4 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center"
  >
    <Clock className="w-5 h-5 mr-2" />
    Pre-Order Now
  </motion.button>
);

export default function Component() {
  const restaurantData = {
    name: "Yumppy's",
    rating: 4.5,
    distance: 1.2,
    cuisine: "Fine Dining • Chinese • South Indian",
    image: "https://b.zmtcdn.com/data/pictures/9/20273339/ed7e64c33ece1ac02e9422fd1bf56cd4.jpg",
    description: "Experience culinary excellence at Gourmet Delights. Our chefs craft exquisite dishes using the finest ingredients, offering a perfect blend of traditional flavors and modern gastronomy. Enjoy a sophisticated ambiance perfect for both casual dining and special occasions. From our signature seafood platters to delectable pasta dishes, every meal is a celebration of taste and creativity.",
    facilities: ["Outdoor Seating", "Valet Parking", "Full Bar", "Wheelchair Accessible"],
    offers: [
      { name: "Truffle Risotto", image: "https://media.cnn.com/api/v1/images/stellar/prod/220926135452-08-body-chinese-foods-mapo-tofu.jpg?q=w_1110,c_fill", price: 24.99 },
      { name: "Seafood Platter", image: "https://www.eatthis.com/wp-content/uploads/sites/4/2019/02/general-tso-chicken.jpg?quality=82&strip=1", price: 39.99 },
      { name: "Tiramisu", image: "https://www.holidify.com/images/cmsuploads/compressed/breakfast-2408818_960_720_20200107183621.jpg", price: 9.99 },
      { name: "Wine Pairing", image: "https://i0.wp.com/travelgenes.com/wp-content/uploads/2020/10/Uttappam.jpg", price: 29.99 },
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <Header name={restaurantData.name} onBack={() => console.log('Go back')} />
      <main>
        <RestaurantImage src={restaurantData.image} name={restaurantData.name} />
        <RestaurantInfo 
          name={restaurantData.name} 
          rating={restaurantData.rating} 
          distance={restaurantData.distance}
          cuisine={restaurantData.cuisine}
        />
        <QuickActions />
        <Description text={restaurantData.description} />
        <Facilities facilities={restaurantData.facilities} />
        <BestOffers offers={restaurantData.offers} />
      </main>
      <PreOrderButton />
    </div>
  );
}