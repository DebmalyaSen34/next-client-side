'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, Utensils } from 'lucide-react'

export default function LoadingOrderDetails() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-orange-300 border-t-orange-500 rounded-full"
                    />
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Preparing Your Order Details
                </h1>
                <div className="space-y-6">
                    {[
                        { Icon: Utensils, text: "Gathering meal information" },
                        { Icon: MapPin, text: "Confirming delivery location" },
                        { Icon: Clock, text: "Calculating estimated time" },
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
                <p className="text-center text-gray-500 mt-8">
                    Your delicious journey is about to begin...
                </p>
            </motion.div>
        </div>
    )
}