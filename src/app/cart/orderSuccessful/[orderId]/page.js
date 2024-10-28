'use client'

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, ArrowLeft, Home, QrCode } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/app/components/layout';

export default function OrderSuccessContent({ params }) {
  const {orderId} = params;
  console.log("OrderID: ", orderId);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }

      try {
        const orderResponse = await fetch(`/api/user/history/${orderId}`);
        if (!orderResponse.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await orderResponse.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    getOrderDetails();

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <QrCode className="w-12 h-12 text-red-600" />
        </motion.div>
        <p className="mt-4 text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <p className="text-xl text-red-600 mb-4">{error || 'Order details not found'}</p>
        <Link href="/home" className="text-red-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-red-800 mb-4"
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-lg text-gray-600 mb-6"
          >
            Thank you for your order at {orderDetails.restaurantId.restaurantName}. Your order number is:
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
            className="bg-orange-100 rounded-lg p-4 mb-6"
          >
            <span className="text-2xl font-bold text-orange-800">{orderDetails._id.slice(0, 6)}</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary:</h2>
            <ul className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between text-gray-600">
                  <span>{item.dishName} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-red-600">₹{orderDetails.totalAmount}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Order QR Code:</h2>
            <div className="flex justify-center">
              <Image src={orderDetails.qrcode} alt="Order QR Code" width={200} height={200} />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/home" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Menu
            </Link>
            <Link href="/home" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}