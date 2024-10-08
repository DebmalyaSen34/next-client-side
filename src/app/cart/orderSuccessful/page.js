"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import Layout from '@/app/components/layout'
export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString())

    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

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
            Thank you for your order. Your order number is:
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
            className="bg-orange-100 rounded-lg p-4 mb-6"
          >
            <span className="text-2xl font-bold text-orange-800">{orderNumber}</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="text-gray-600 mb-8"
          >
            We&apos;ll send you an email with the order details and tracking information.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/menu" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Menu
            </Link>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
              <Home className="w-5 h-5 mr-2" />
              Go to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}