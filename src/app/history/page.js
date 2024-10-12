"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, Home, Search, ShoppingCart, ChevronRight, UtensilsCrossed, Clock, Package, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Layout from '../components/layout';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [orders, setOrders] = useState({
    ongoing: [], history: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/user/history');
        if (!response.ok) {
          throw new Error('An error occurred while fetching orders');
        }
        const data = await response.json();
        const ongoingOrders = data.filter(order => order.isActive !== false);
        const historyOrders = data.filter(order => order.isActive === false);
        setOrders({ ongoing: ongoingOrders, history: historyOrders });
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = (orderId) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      ongoing: prevOrders.ongoing.filter(order => order._id !== orderId)
    }));
  };

  const handleViewDetails = (order) => {
    if (order && order._id) {
      router.push(`history/orderDetails/${order._id}`);
    } else {
      console.error('Order not found', order);
    }
  };

  const renderOrders = (orderList, isHistory = false) => (
    <AnimatePresence>
      {orderList.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg shadow-md p-4 mb-4"
        >
          <div className="flex items-center mb-4">
            <img src={order.items[0].imageUrl} alt={order.restaurantName} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="font-semibold text-lg text-red-800">{order.restaurantName}</h3>
              <p className="text-red-500 text-sm">
                #{order._id.slice(0, 6)} | {order.items.length} Items
              </p>
              {isHistory && (
                <p className="text-orange-500 text-xs">
                  <Clock className="inline-block w-3 h-3 mr-1" />
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="ml-auto">
              <p className="font-semibold text-lg text-black">Rs. {order.totalAmount}</p>
            </div>
          </div>
          {!isHistory && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewDetails(order)}
                className="flex-1 bg-red-800 text-white py-2 rounded-md font-semibold transition-colors hover:bg-red-700"
              >
                View details
              </button>
              <button
                onClick={() => handleCancel(order._id)}
                className="flex-1 border border-red-600 text-red-600 py-2 rounded-md font-semibold transition-colors hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          )}
          {isHistory && (
            <button
              onClick={() => handleViewDetails(order)}
              className="w-full bg-red-600 text-white py-2 rounded-md font-semibold transition-colors hover:bg-red-700"
            >
              View Details
            </button>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );

  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          transition: { duration: 1.5, repeat: Infinity }
        }}
      >
        <UtensilsCrossed className="w-16 h-16 text-red-800 mb-4" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
      <p className="text-gray-500 text-center mb-4">Your order history will appear here once you place an order.</p>
      <Link href="/home">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-800 text-white py-2 px-4 rounded-md font-semibold transition-colors hover:bg-red-700"
        >
          Start Ordering
        </motion.button>
      </Link>
    </motion.div>
  );

  const renderLoadingState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-64"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-red-800" />
      </motion.div>
      <p className="mt-4 text-lg text-gray-600">Loading your orders...</p>
    </motion.div>
  );

  return (
    <Layout>
      <main className="flex-grow p-4">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === 'ongoing'
                ? 'text-red-800 border-b-2 border-red-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              activeTab === 'history'
                ? 'text-red-800 border-b-2 border-red-800'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            renderLoadingState()
          ) : (
            activeTab === 'ongoing' ? (
              orders.ongoing.length > 0 ? renderOrders(orders.ongoing) : renderEmptyState()
            ) : (
              orders.history.length > 0 ? renderOrders(orders.history, true) : renderEmptyState()
            )
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}