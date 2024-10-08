"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Layout from '../components/layout';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation';
export default function CartPage() {
  const { cart, addCart, removeCart, getTotalPrice } = useCart();
  const [activeTab] = useState('cart');
  const [isDineIn, setIsDineIn] = useState(true);
  const router = useRouter();

  const totalPrice = getTotalPrice();
  const isCartEmpty = Object.keys(cart).length === 0;

  const handlePlaceOrder = async () => {
    const response = await fetch('/api/order/sendOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart, orderType: isDineIn ? 'Dine-in' : 'Take away' }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.removeItem('cart');
      router.push('/cart/orderSuccessful');
    } else {
      console.error('Failed to place order');
    }
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Order Type Switch */}
        
        <div className="flex justify-end p-4">
          <div className="flex items-center space-x-2 bg-orange-100 rounded-full p-1">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isDineIn ? 'bg-red-600 text-white' : 'text-red-600'
              }`}
              onClick={() => setIsDineIn(true)}
            >
              Dine-in
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                !isDineIn ? 'bg-red-600 text-white' : 'text-red-600'
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
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-red-800">{item.dishName}</h3>
                  <p className="text-red-600">Rs. {item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removeCart(item.dishName)}
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
      </div>
    </Layout>
  )
}