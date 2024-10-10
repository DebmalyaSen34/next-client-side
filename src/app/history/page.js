"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, Home, Search, ShoppingCart, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Layout from '../components/layout';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [orders, setOrders] = useState({
    ongoing: [], history: []
  });
  const router = useRouter();

  React.useEffect(() => {
    const fetchOrders = async () => {
        try {
            const response  = await fetch('/api/user/history');
            if(!response){
                throw new Error('An error occurred while fetching orders');
            }
            const data = await response.json();
            const ongoingOrders = data;
            const historyOrders = data;
            setOrders({ ongoing: ongoingOrders, history: historyOrders });
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    fetchOrders();
  }, []);

  const handleCancel = (orderId) => {
    setOrders(prevOrders => ({
      ...prevOrders,
      ongoing: prevOrders.ongoing.filter(order => order.id !== orderId)
    }));
  };

  const handleViewDetails = (order) => {
    console.log(`Tracking order ${order._id}`);

    if(order && order._id){
      router.push(`history/orderDetails/${order._id}`);
    }else{
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
                #{order.orderId} | {order.items.length} Items
              </p>
              {isHistory && (
                <p className="text-orange-500 text-xs">
                  <Clock className="inline-block w-3 h-3 mr-1" />
                  {order.orderDate}
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
              className="w-full bg-red-600 text-white py-2 rounded-md font-semibold transition-colors hover:bg-gray-200"
            >
              View Details
            </button>
          )}
        </motion.div>
      ))}
    </AnimatePresence>
  );

  return (
    
    <Layout>
      {/* Main Content */}
      <main className="flex-grow p-4">
        {/* Tabs */}
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

        {/* Orders */}
        {activeTab === 'ongoing' ? renderOrders(orders.ongoing) : renderOrders(orders.history, true)}
      </main>

    </Layout>
  );
}