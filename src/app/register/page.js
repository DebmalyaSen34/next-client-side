"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Utensils, Eye, EyeOff, ChevronRight, AlertCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
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
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
  });
  const router = useRouter();

  useEffect(() => {
    validateUsername(username);
    validateEmail(email);
    validateMobileNumber(mobileNumber);
    validatePassword(password);
  }, [username, email, mobileNumber, password]);

  const validateUsername = (value) => {
    if (value.length < 3) {
      setErrors(prev => ({ ...prev, username: 'Username must be at least 3 characters long' }));
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setErrors(prev => ({ ...prev, username: 'Username can only contain letters, numbers, and underscores' }));
    } else {
      setErrors(prev => ({ ...prev, username: '' }));
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateMobileNumber = (value) => {
    if (!/^\d{10}$/.test(value)) {
      setErrors(prev => ({ ...prev, mobileNumber: 'Please enter a valid 10-digit mobile number' }));
    } else {
      setErrors(prev => ({ ...prev, mobileNumber: '' }));
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?])/.test(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain uppercase, lowercase, digit, and special character' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.username || errors.email || errors.mobileNumber || errors.password) {
      return;
    }
    const userData = { email, password, username, mobileNumber, fullName };
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);

        const otpResponse = await fetch('/api/otp/sendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobileNumber }),
        });
        const otpData = await otpResponse.json();
        if (otpResponse.ok) {
          router.push(`/otpVerification?mobileNumber=${encodeURIComponent(mobileNumber)}`);
          console.log('OTP sent successfully: ', otpData);
        } else {
          console.error('Failed to send OTP:', otpData.error);
        }
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('An Error occurred:', error);
    }
  };

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
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative"
          >
            <div className="w-24 h-24 bg-white-600 rounded-full flex items-center justify-center">
              <Image
                src="/images/preperlyLogo.svg"
                alt="Preperly Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-center text-red-800 mb-6">Welcome to Preperly</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
              required
            />
            <AnimatePresence>
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  <AlertCircle className="inline mr-1 h-4 w-4" />
                  {errors.username}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
              required
            />
          </div>
          
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
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  <AlertCircle className="inline mr-1 h-4 w-4" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
              required
            />
            <AnimatePresence>
              {errors.mobileNumber && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  <AlertCircle className="inline mr-1 h-4 w-4" />
                  {errors.mobileNumber}
                </motion.p>
              )}
            </AnimatePresence>
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
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-1"
                >
                  <AlertCircle className="inline mr-1 h-4 w-4" />
                  {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="text-red-600 focus:ring-red-500" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
            disabled={errors.username || errors.email || errors.mobileNumber || errors.password}
          >
            Register
          </Button>
        </form>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 text-center"
        >
          <a href="/login" className="text-red-600 hover:text-red-800 flex items-center justify-center">
            Already signed up? Log In <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}