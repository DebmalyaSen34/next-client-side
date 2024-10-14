'use client'

import { motion } from 'framer-motion'
import { Check, Package, Truck, Clock } from 'lucide-react'

export default function LoadingOrderSuccessful() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: 360,
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                    >
                        <Check className="w-12 h-12 text-green-500" />
                    </motion.div>
                </div>
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Finalizing Your Order
                </h1>
                <div className="space-y-6">
                    {[
                        { Icon: Package, text: "Confirming order details" },
                        { Icon: Truck, text: "Preparing for dispatch" },
                        { Icon: Clock, text: "Estimating delivery time" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex items-center space-x-4"
                        >
                            <div className="bg-blue-100 p-3 rounded-full">
                                <item.Icon className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <div className="h-2 bg-gray-200 rounded">
                                    <motion.div
                                        className="h-2 bg-blue-500 rounded"
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200"
                >
                    <p className="text-center text-green-700 font-medium">
                        Your order has been successfully placed!
                    </p>
                    <p className="text-center text-green-600 text-sm mt-2">
                        We&apos;re just putting the finishing touches on your confirmation.
                    </p>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="text-center text-gray-500 mt-6"
                >
                    Get ready for a delightful culinary experience!
                </motion.p>
            </motion.div>
        </div>
    )
}