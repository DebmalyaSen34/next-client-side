"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, Clock, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Layout from '../components/layout';
import { useRouter } from 'next/navigation';
import { getUserIdFromCookie, confirmOrder } from '../actions';

export default function Component() {
  const { cart, addCart, removeCart, getTotalPrice } = useCart();
  const [activeTab] = useState('cart');
  const [isDineIn, setIsDineIn] = useState(true);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [period, setPeriod] = useState('PM');
  const [currentTime, setCurrentTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccessfulData, setOrderSuccessfulData] = useState(null);
  const router = useRouter();

  const totalPrice = getTotalPrice();
  const isCartEmpty = Object.keys(cart).length === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePlaceOrder = () => {
    setShowArrivalModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    const arrivalTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;

    const [time, modifier] = arrivalTimeString.split(' ');
    let [stringhours, stringminutes, stringseconds] = time.split(':');
    if (stringhours === '12') {
      stringhours = '00';
    }

    if (modifier === 'PM') {
      stringhours = parseInt(stringhours, 10) + 12;
    }

    const now = new Date();
    const arrivalTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), stringhours, stringminutes, stringseconds);

    const customerId = await getUserIdFromCookie();

    if (!customerId) {
      console.error('Customer ID is null. Cannot proceed with order.');
      setIsLoading(false);
      return;
    }

    console.log('Customer id: ', customerId);

    console.log({
      items: cart,
      vendorId: cart[Object.keys(cart)[0]].vendor_id,
      customerId: customerId,
      orderType: isDineIn ? 'Dine-in' : 'Take away',
      arrivalTime: arrivalTime.toISOString(),
      orderStatus: 'pending',
      totalAmount: totalPrice,
      totalQuantity: Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
    })


    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transactions/orderBySql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          vendorId: cart[Object.keys(cart)[0]].vendor_id,
          customerId: customerId,
          orderType: isDineIn ? 'dine-in' : 'takeaway',
          arrivalTime: arrivalTime.toISOString(),
          orderStatus: 'pending',
          totalAmount: totalPrice,
          totalQuantity: Object.values(cart).reduce((sum, item) => sum + item.quantity, 0),
        }),
      });

      console.log('Response: ', response);
      const data = await response.json();

      if (response.ok) {
        console.log('Fetched Data: ', data);

        localStorage.removeItem('cart');

        const { qr, orderId } = data;


        console.log('Order ID:', orderId);
        console.log('QR Code:', qr);

        // Store the order data in local storage as a string
        localStorage.setItem(`orderData-${orderId}`, JSON.stringify({
          items: Object.values(cart),
          qr: qr,
          orderId: orderId,
          totalAmount: totalPrice
        }));

        router.push(`/cart/orderSuccessful/${orderId}`);
      } else {
        console.error('Failed to place order! Please try again');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsLoading(false);
      setShowArrivalModal(false);
    }
  };

  const handleCancelTimer = () => {
    console.log("Cancel timer clicked");
    setShowArrivalModal(false);
  };

  const incrementTime = (setter, value, max, min = 0) => {
    setter(prevValue => (prevValue + 1 > max ? min : prevValue + 1));
  };

  const decrementTime = (setter, value, max, min = 0) => {
    setter(prevValue => (prevValue - 1 < min ? max : prevValue - 1));
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Order Type Switch */}
        <div className="flex justify-end p-4">
          <div className="flex items-center space-x-2 bg-orange-100 rounded-full p-1">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${isDineIn ? 'bg-red-600 text-white' : 'text-red-600'
                }`}
              onClick={() => setIsDineIn(true)}
            >
              Dine-in
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!isDineIn ? 'bg-red-600 text-white' : 'text-red-600'
                }`}
              onClick={() => setIsDineIn(false)}
            >
              Take away
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto p-4 pb-24">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Your Cart</h2>
          {isCartEmpty ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="150"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-300 mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </motion.svg>
              <motion.p
                className="text-xl font-semibold text-orange-600 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Your cart is empty
              </motion.p>
              <motion.p
                className="text-gray-500 mt-2 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Add some delicious meals to get started!
              </motion.p>
            </motion.div>
          ) : (
            Object.values(cart).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{item.name}</h3>
                  <p className="text-red-600">Rs. {item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeCart(item.name)}
                    className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-orange-500">{item.quantity}</span>
                  <button
                    onClick={() => addCart(item)}
                    className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </main>

        {/* Order Summary */}
        {!isCartEmpty && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg text-red-800">Total:</span>
              <span className="font-bold text-xl text-red-600">Rs. {totalPrice}</span>
            </div>
            <button onClick={handlePlaceOrder} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Place Order
            </button>
          </div>
        )}

        {/* Arrival Time Modal - Improved Design */}
        <AnimatePresence mode='wait'>
          {showArrivalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-red-800 to-red-900 p-6 rounded-xl shadow-2xl w-[320px] relative overflow-hidden"
              >
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-red-700/30 blur-xl"></div>
                <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-orange-900/20 blur-xl"></div>

                {/* Close button */}
                <div className="absolute top-3 right-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-700/40 hover:bg-red-700/60 rounded-full p-1.5 text-white z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Close button clicked");
                      setShowArrivalModal(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Header with clock icon */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-red-700/50 rounded-full">
                    <Clock className="w-5 h-5 text-orange-200" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Set your arrival time</h2>
                </div>

                {/* Current and estimated time */}
                <div className="bg-white/10 rounded-lg p-3 mb-6 text-center backdrop-blur-sm">
                  <div className="text-sm font-medium text-orange-200 mb-1">Current time</div>
                  <div className="text-xl text-white font-medium">{currentTime}</div>
                </div>

                {/* Time selector - improved layout and visuals */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-orange-200 mb-1">Hour</label>
                    <div className="bg-red-700/30 rounded-lg p-2 w-full">
                      <button
                        onClick={() => incrementTime(setHours, hours, 12, 1)}
                        className="w-full h-8 flex items-center justify-center text-white hover:bg-red-700/50 rounded-md transition-colors"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <div className="text-2xl text-white font-bold text-center my-2">
                        {hours.toString().padStart(2, '0')}
                      </div>
                      <button
                        onClick={() => decrementTime(setHours, hours, 12, 1)}
                        className="w-full h-8 flex items-center justify-center text-white hover:bg-red-700/50 rounded-md transition-colors"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-orange-200 mb-1">Minute</label>
                    <div className="bg-red-700/30 rounded-lg p-2 w-full">
                      <button
                        onClick={() => incrementTime(setMinutes, minutes, 59)}
                        className="w-full h-8 flex items-center justify-center text-white hover:bg-red-700/50 rounded-md transition-colors"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <div className="text-2xl text-white font-bold text-center my-2">
                        {minutes.toString().padStart(2, '0')}
                      </div>
                      <button
                        onClick={() => decrementTime(setMinutes, minutes, 59)}
                        className="w-full h-8 flex items-center justify-center text-white hover:bg-red-700/50 rounded-md transition-colors"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* AM/PM */}
                  <div className="flex flex-col items-center">
                    <label className="text-xs text-orange-200 mb-1">Period</label>
                    <div className="bg-red-700/30 rounded-lg p-2 w-full h-full flex flex-col justify-between">
                      <button
                        onClick={() => setPeriod('AM')}
                        className={`flex-1 flex items-center justify-center rounded-md transition-colors mb-1 ${period === 'AM'
                          ? 'bg-red-600 text-white font-medium'
                          : 'text-orange-200 hover:bg-red-700/50'}`}
                      >
                        AM
                      </button>
                      <button
                        onClick={() => setPeriod('PM')}
                        className={`flex-1 flex items-center justify-center rounded-md transition-colors ${period === 'PM'
                          ? 'bg-red-600 text-white font-medium'
                          : 'text-orange-200 hover:bg-red-700/50'}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected time preview */}
                <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 rounded-lg mb-6">
                  <div className="text-xs text-orange-200 mb-1 text-center">Your arrival time</div>
                  <div className="text-2xl font-bold text-white text-center">
                    {hours.toString().padStart(2, '0')}:
                    {minutes.toString().padStart(2, '0')} {period}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between gap-3">
                  {/* //! Cancel button removed */}
                  {/* <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 px-4 rounded-lg border border-orange-300/30 text-orange-200 font-medium hover:bg-red-700/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Order will be cancelled');
                      setShowArrivalModal(false);
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button> */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg flex items-center justify-center"
                    onClick={handleConfirmOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}