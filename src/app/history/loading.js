'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Package } from 'lucide-react'

export default function LoadingOrderHistory() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-16 h-16 border-4 border-orange-300 border-t-orange-500 rounded-full"
                    />
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Retrieving Your Culinary Journey
                </h1>
                <div className="space-y-6">
                    {[
                        { Icon: Calendar, text: "Fetching order dates" },
                        { Icon: Package, text: "Compiling order details" },
                        { Icon: Clock, text: "Calculating total orders" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex items-center space-x-4"
                        >
                            <div className="bg-orange-100 p-3 rounded-full">
                                <item.Icon className="w-6 h-6 text-orange-500" />
                            </div>
                            <div className="flex-1">
                                <div className="h-2 bg-gray-200 rounded">
                                    <motion.div
                                        className="h-2 bg-orange-500 rounded"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: index * 0.2, duration: 2, ease: "easeInOut" }}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 space-y-4">
                    {[1, 2, 3].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                            className="bg-gray-100 rounded-lg p-4 animate-pulse"
                        >
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </motion.div>
                    ))}
                </div>
                <p className="text-center text-gray-500 mt-8">
                    Preparing to showcase your gastronomic adventures...
                </p>
            </motion.div>
        </div>
    )
}