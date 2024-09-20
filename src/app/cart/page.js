"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, User, Home, Search, ShoppingCart, Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const [activeTab, setActiveTab] = useState('cart');
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Chicken Burger', price: 150, quantity: 2 },
        { id: 2, name: 'Fries', price: 80, quantity: 1 },
        { id: 3, name: 'Cola', price: 50, quantity: 1 },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        ).filter(item => item.quantity > 0));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-md mx-auto bg-gray-100 h-screen overflow-hidden flex flex-col">
            {/* Header */}
            <header className="bg-gradient-to-r from-orange-600 to-red-500 p-4 flex items-center justify-between shadow-md">
                <Menu className="w-6 h-6 text-white" />
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-2">
                        P
                    </div>
                    <h1 className="text-2xl font-bold text-white">PREPERLY</h1>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-4">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">Your Cart</h2>
                {cartItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-orange-600">Rs. {item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Order Summary */}
            <div className="bg-white p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-bold text-xl text-orange-600">Rs. {totalPrice}</span>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold">
                    Place Order
                </button>
            </div>

            {/* Navigation Bar */}
            <nav className="bg-white border-t border-gray-200 py-2">
                <ul className="flex justify-around">
                    <li>
                        <Link href="/" className="flex flex-col items-center text-gray-500">
                            <Home className="w-6 h-6" />
                            <span className="text-xs mt-1">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/search" className="flex flex-col items-center text-gray-500">
                            <Search className="w-6 h-6" />
                            <span className="text-xs mt-1">Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="flex flex-col items-center text-orange-600">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="text-xs mt-1">Cart</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}