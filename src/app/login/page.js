"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils, Eye, EyeOff, ChevronRight, AlertCircle } from "lucide-react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../components/LoadingScreen';
import Image from 'next/image';

const FloatingPlate = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="absolute"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  >
    <Utensils className="text-red-300 h-8 w-8" />
  </motion.div>
);

export default function PreperlyLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    try {
      const response = await axios.post('/api/user/login', { email, password}, {withCredentials: true});
      console.log(response.data);
      router.push('/home');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password. Please try again.');
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return <LoadingScreen message = "Preparing login..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4 overflow-hidden relative">
      {[...Array(5)].map((_, i) => (
        <FloatingPlate key={i} delay={i * 0.2} />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative w-24 h-24 bg-white-600 rounded-full flex items-center justify-center"
          >
              <Image
                src="/images/preperlysvglogo.svg"
                alt="Preperly Logo"
                layout="fill"
                objectFit="contain"
              />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-center text-red-800 mb-6">Welcome to Preperly</h2>
        <AnimatePresence>
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{loginError}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10 text-orange-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="text-red-600 focus:ring-red-500" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            <a href="/forgotPassword" className="text-sm text-red-600 hover:text-red-800">Forgot password?</a>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
          >
            Log In
          </Button>
        </form>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 text-center"
        >
          <a href="/register" className="text-red-600 hover:text-red-800 flex items-center justify-center">
            Don&apos;t have an account? Register! <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}