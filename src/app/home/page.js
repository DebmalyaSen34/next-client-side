"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, User, Home, Search, ShoppingCart, ChevronDown, Heart } from 'lucide-react';
import Link from 'next/link';
import Layout from '../components/layout';
import Image from 'next/image';

//TODO: Add redirect link to profile, search and other

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [restaurants, setRestaurant] = useState([]);

  React.useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/vendor/restaurant');
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        }
      } catch (err) {
        console.error('Failure fetching restaurants from database!', err);
      }
    }
    fetchRestaurants();
  }, []);

  return (
    <Layout>
      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Featured Restaurant */}
        <div className="relative">
          <img
            src="https://www.fabhotels.com/blog/wp-content/uploads/2018/08/resize_290818_Tatva_New.jpg"
            alt="Featured Restaurant"
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-xl font-bold">Featured Restaurant</h2>
            <p className="text-gray-200">Elegant dining experience</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants or cuisines"
              className="w-full p-2 pl-10 pr-4 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-red-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-800" />
          </div>
        </div>

        {/* Recommended Section */}
        {/* <section className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-800">Recommended</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden relative shadow-md"
              >
                <img
                  src={'https://assets.architecturaldigest.in/photos/64f85037ec0bc118bdd98aba/master/pass/Untitled%20design%20(14).png'}
                  alt={`Recommended ${item}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Restaurants Section */}
        <section className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-800">Restaurants</h3>
          <motion.div layout className="space-y-4">
            {restaurants.map((restaurant) => (
              <Link key={restaurant._id} href={`/restaurant/${restaurant._id}`}>
                <motion.div
                  key={restaurant._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                >
                  <Image
                    src={'https://b.zmtcdn.com/data/pictures/9/20273339/ed7e64c33ece1ac02e9422fd1bf56cd4.jpg'}
                    alt={restaurant.restaurantName}
                    className="rounded-lg object-cover"
                    width={120}
                    height={120}
                  />
                  <div>
                    <h4 className="font-semibold text-orange-800">{restaurant.restaurantName}</h4>
                    <p className="text-sm text-gray-600">{restaurant.address}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-orange-600">{restaurant.rating}</span>
                    </div>
                  </div>
                </motion.div>
                </Link>
            ))}
              </motion.div>
        </section>
      </main>
    </Layout>
  );
}