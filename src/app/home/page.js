"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Layout from '../components/layout';
import Image from 'next/image';
import NoRestaurantsFound from '@/components/loaders/noRestaurantsFound';
import LoadingRestaurants from '@/components/loaders/loadingRestaurants';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      setIsLoading(true);
      try {
        const cachedRestaurants = localStorage.getItem('restaurants');
        if (cachedRestaurants) {
          try {
            const parsedRestaurants = JSON.parse(cachedRestaurants);
            console.log('Fetched restaurants from cache:', parsedRestaurants);
            setRestaurants(parsedRestaurants);
            setIsLoading(false);
          } catch (error) {
            console.error('Failed to fetch restaurants from cache:', error);
          }
        }
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/home`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched restaurants:', data.data);
          setRestaurants(data.data);

          localStorage.setItem('restaurants', JSON.stringify(data.data));
        } else {
          console.error('Failed to fetch restaurants:', response.statusText);
        }
      } catch (err) {
        console.error('Failure fetching restaurants from database!', err);
      } finally {
        setIsLoading(false);
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
          <Image
            src="https://www.fabhotels.com/blog/wp-content/uploads/2018/08/resize_290818_Tatva_New.jpg"
            alt="Featured Restaurant"
            className="w-full h-48 object-cover"
            width={800}
            height={300}
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
          {isLoading ? (
            <LoadingRestaurants />
          ) : restaurants.length > 0 ? (
            <motion.div layout className="space-y-4">
              {restaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                  >
                    <Image
                      // src={restaurant.logourl}
                      src='https://storage.googleapis.com/preperly/1234567890/restaurantLogo/image-1741427092822-61f8164f-001e-4c0f-b26f-3d18da7bd008.png'
                      alt={restaurant.restaurantname}
                      className="rounded-lg object-cover"
                      width={120}
                      height={120}
                    />
                    <div>
                      <h4 className="font-semibold text-orange-800">{restaurant.restaurantname}</h4>
                      <p className="text-sm text-gray-600">{restaurant.restaurantaddress}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-orange-600">{restaurant.rating || '5'}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <NoRestaurantsFound />
          )}
        </section>
      </main>
    </Layout>
  );
}