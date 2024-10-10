'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, MapPin, Phone, Truck } from 'lucide-react'
import Link from 'next/link'
import Layout from '@/app/components/layout'

export default function OrderDetailPage({ params }) {
  const { orderId } = params
  const [order, setOrder] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await fetch(`/api/user/history/${orderId}`)
        if (!orderResponse.ok) {
          throw new Error('Failed to fetch order details')
        }
        const data = await orderResponse.json()
        setOrder(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const loaderVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      borderRadius: ["20%", "50%", "20%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <motion.div
            className="w-16 h-16 bg-red-800"
            variants={loaderVariants}
            animate="animate"
          />
        </div>
      </Layout>
    )
  }

  if (!order) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <p className="text-xl font-semibold text-gray-600">Order not found</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="flex-grow p-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Link href="/orders" className="inline-flex items-center text-red-800 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-red-800 text-white p-6">
              <h1 className="text-2xl font-bold mb-2">Order #{order.orderId}</h1>
              <p className="text-red-200">{order.restaurantName}</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{order.orderDate}</span>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemAnimation}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="py-4 flex justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-red-800">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 mr-3 text-red-800 mt-1" />
                  <div>
                    <p className="font-medium">Estimated Delivery Time</p>
                    <p className="text-gray-600">{order.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-red-800 mt-1" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-gray-600">{order.deliveryAddress}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-red-800 mt-1" />
                  <div>
                    <p className="font-medium">Restaurant Phone</p>
                    <p className="text-gray-600">{order.restaurantPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}