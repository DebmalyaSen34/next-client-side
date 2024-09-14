"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Home, Grid, User } from 'lucide-react';
import Image from 'next/image';

const PreperlyApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="max-w-md mx-auto bg-gray-100 h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <motion.div
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            P
          </motion.div>
          <h1 className="ml-2 text-2xl font-bold text-gray-800">PREPERLY</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
        >
          Order Now
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="overflow-y-auto h-[calc(100vh-8rem)]">
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
              className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Recommended Section */}
        <section className="p-4">
          <h3 className="text-lg font-semibold mb-2">Recommended</h3>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden relative"
              >
                <img
                  src="https://assets.architecturaldigest.in/photos/64f85037ec0bc118bdd98aba/master/pass/Untitled%20design%20(14).png"
                  alt={`Recommended ${item}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ❤️
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="p-4">
          <h3 className="text-lg font-semibold mb-2">Restaurants</h3>
          <motion.div layout className="space-y-4">
            {[
              { name: "Yummy's", location: "NITW, Warangal, Telangana", rating: 4.5 },
              { name: "Spice Haven", location: "Downtown, Cityville", rating: 4.2 },
              { name: "Green Leaf Cafe", location: "Uptown, Metropolis", rating: 4.7 },
            ].map((restaurant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
              >
                <img
                  src="https://b.zmtcdn.com/data/pictures/9/20273339/ed7e64c33ece1ac02e9422fd1bf56cd4.jpg"
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold">{restaurant.name}</h4>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 h-16">
        <ul className="flex justify-around h-full items-center">
          {[
            { icon: Home, label: 'Home' },
            { icon: Search, label: 'Search' },
            { icon: Grid, label: 'Orders' },
            { icon: User, label: 'Profile' },
          ].map((item) => (
            <li key={item.label}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center ${
                  activeTab === item.label.toLowerCase() ? 'text-red-500' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(item.label.toLowerCase())}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PreperlyApp;