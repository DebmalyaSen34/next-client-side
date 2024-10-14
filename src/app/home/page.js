"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Layout from '../components/layout';
import Image from 'next/image';

export default function HomePage() {
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