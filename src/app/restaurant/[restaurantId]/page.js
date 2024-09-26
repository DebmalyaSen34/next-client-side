"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, MapPin, Star, ChevronRight, Check, Coffee, Car, Utensils, Droplet, Heart, Share2, Clock, Plus, X, Minus, ShoppingCart } from 'lucide-react';
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
        isScrolled ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-transparent'
      }`}
      animate={{ 
        backgroundColor: isScrolled ? ['rgba(255, 255, 255, 0)', 'rgba(239, 68, 68, 1)'] : 'rgba(255, 255, 255, 0)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        {isScrolled && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold text-white"
          >
            {name}
          </motion.h1>
        )}
        <User className="w-6 h-6 text-white" />
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
        <span className="ml-2 text-sm text-black font-medium">({Math.floor(rating * 100)} ratings)</span>
      </div>
      <div className="flex items-center text-black font-medium">
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
      <h3 className="text-lg font-semibold mb-2 text-black">About {'Restaurant'}</h3>
      <motion.div
        ref={descriptionRef}
        initial={{ height: 80 }}
        animate={{ height: expanded ? 'auto' : 80 }}
        className="overflow-hidden"
      >
        <p className="text-black text-sm">{text}</p>
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
    <h3 className="text-lg font-semibold mb-2 text-black">Facilities</h3>
    <div className="grid grid-cols-2 gap-4">
      {facilities.map((facility, index) => (
        <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm text-black">{facility}</span>
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
        <h3 className="text-lg font-semibold text-black">Best Offers</h3>
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
                <h4 className="font-medium text-sm mb-1 text-black">{offer.name}</h4>
                <p className="text-red-500 text-xs font-semibold">${offer.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ item, quantity, onAdd, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex items-center justify-between p-4 border-b border-gray-200"
  >
    <div className="flex items-center">
      <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md mr-4" />
      <div>
        <h4 className="font-medium text-black">{item.name}</h4>
        <p className="text-sm text-black">${item.price.toFixed(2)}</p>
      </div>
    </div>
    <div className="flex items-center">
      {quantity > 0 && (
        <>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white p-2 rounded-full"
            onClick={() => onRemove(item)}
            aria-label={`Remove ${item.name} from order`}
          >
            <Minus className="w-5 h-5" />
          </motion.button>
          <span className="mx-2 font-semibold text-black">{quantity}</span>
        </>
      )}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="bg-red-500 text-white p-2 rounded-full"
        onClick={() => onAdd(item)}
        aria-label={`Add ${item.name} to order`}
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    </div>
  </motion.div>
);

const Menu = ({ items, cart, onAdd, onRemove, totalItems, totalPrice }) => {
  const [displayedItems, setDisplayedItems] = useState(items.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedItems, loading]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newItems = items.slice(displayedItems.length, displayedItems.length + 10);
      setDisplayedItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white mt-2 pb-24">
      <h3 className="text-lg font-semibold p-4 text-black">Menu</h3>
      {displayedItems.map((item, index) => (
        <MenuItem 
          key={index} 
          item={item} 
          quantity={cart[item.name] || 0}
          onAdd={onAdd} 
          onRemove={onRemove}
        />
      ))}
      {displayedItems.length < items.length && (
        <div ref={observerTarget} className="flex justify-center p-4">
          <motion.div
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Coffee className="w-6 h-6 text-red-500" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

const ShowMenuButton = ({ onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="bg-red-500 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center w-full mb-2"
    onClick={onClick}
  >
    <Utensils className="w-5 h-5 mr-2" />
    Show Menu
  </motion.button>
);

const CheckoutButton = ({ totalItems, totalPrice }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className="bg-green-500 text-white py-4 px-6 rounded-full font-semibold text-lg shadow-lg flex items-center justify-center w-full"
  >
    <ShoppingCart className="w-5 h-5 mr-2" />
    Checkout ({totalItems}) - ${totalPrice.toFixed(2)}
  </motion.button>
);

export default function Component() {
  const [cart, setCart] = useState({});
  const [showMenu, setShowMenu] = useState(false);
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

  const menuItems = [
    { name: "Truffle Risotto", image: "https://media.cnn.com/api/v1/images/stellar/prod/220926135452-08-body-chinese-foods-mapo-tofu.jpg?q=w_1110,c_fill", price: 24.99 },
    { name: "Seafood Platter", image: "https://www.eatthis.com/wp-content/uploads/sites/4/2019/02/general-tso-chicken.jpg?quality=82&strip=1", price: 39.99 },
    { name: "Tiramisu", image: "https://www.holidify.com/images/cmsuploads/compressed/breakfast-2408818_960_720_20200107183621.jpg", price: 9.99 },
    { name: "Wine Pairing", image: "https://i0.wp.com/travelgenes.com/wp-content/uploads/2020/10/Uttappam.jpg", price: 29.99 },
    // Add more menu items here...
  ];

  // Duplicate the menu items to simulate a larger menu
  const extendedMenuItems = [...Array(5)].flatMap(() => menuItems);

  const handleAddToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (item) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[item.name] > 1) {
        newCart[item.name]--;
      } else {
        delete newCart[item.name];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [itemName, count]) => {
    const item = extendedMenuItems.find(i => i.name === itemName);
    return sum + (item ? item.price * count : 0);
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen pb-28">
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
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Menu</h2>
              <button onClick={() => setShowMenu(false)} className="p-2">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <Menu 
              items={extendedMenuItems} 
              cart={cart}
              onAdd={handleAddToCart} 
              onRemove={handleRemoveFromCart}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
            {totalItems > 0 && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg">
                <CheckoutButton totalItems={totalItems} totalPrice={totalPrice} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed bottom-4 left-4 right-4 flex flex-col">
        <ShowMenuButton onClick={() => setShowMenu(true)} />
        {totalItems > 0 && !showMenu && (
          <CheckoutButton totalItems={totalItems} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
}