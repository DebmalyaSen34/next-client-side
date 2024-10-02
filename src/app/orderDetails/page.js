"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, User, Minus, Plus, ShoppingBag, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const foodItems = [
  { id: 1, name: 'Spicy Ramen', restaurant: 'Noodle Haven', price: 180, image: '/placeholder.svg?height=80&width=80' },
  { id: 2, name: 'Truffle Risotto', restaurant: 'Italian Delight', price: 450, image: '/placeholder.svg?height=80&width=80' },
  { id: 3, name: 'Acai Bowl', restaurant: 'Healthy Bites', price: 220, image: '/placeholder.svg?height=80&width=80' },
  { id: 4, name: 'Beef Burger', restaurant: 'Gourmet Grills', price: 280, image: '/placeholder.svg?height=80&width=80' },
  { id: 5, name: 'Sushi Platter', restaurant: 'Sakura Sushi', price: 550, image: '/placeholder.svg?height=80&width=80' },
]

export default function OrderDetails() {
  const [items, setItems] = useState(foodItems.map(item => ({ ...item, quantity: 1 })))

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryCharge = 50
  const total = subtotal + deliveryCharge

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col">
<header className="bg-red-800 p-4 flex items-center justify-between shadow-md">
        {/* <button aria-label="Open menu" className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md">
          <Menu className="w-6 h-6" />
        </button> */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-2">
            <Image src="/images/preperlyVector.svg" alt="Logo" width={32} height={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">PREPERLY</h1>
        </div>
        <Link href="/profile" aria-label="Go to profile">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-red-800" />
          </div>
        </Link>
      </header>
      <main className="flex-grow overflow-auto p-4 md:p-6">
        <h2 className="text-2xl font-semibold mb-4">Order details</h2>
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-4 mb-4 bg-white p-4 rounded-lg shadow-md"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.restaurant}</p>
                <p className="font-bold text-red-500">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, -1)}
                  className="bg-red-100 text-red-500 p-1"
                >
                  <Minus size={16} />
                </motion.button>
                <span className="font-semibold">{item.quantity}</span>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateQuantity(item.id, 1)}
                  className="bg-red-800 text-red-100 p-1"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <footer className="bg-red-800 p-4 md:p-6 text-white sticky bottom-0 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between mb-2">
            <span>Sub-Total</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-red-800 font-bold py-3 rounded-full mt-6 flex items-center justify-center space-x-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ShoppingBag size={20} />
            <span>Place My Order</span>
          </motion.button>
        </motion.div>
      </footer>
    </div>
  )
}