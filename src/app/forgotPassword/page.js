"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ChevronRight, Key, Lock, Phone, Shield } from "lucide-react";
import Image from 'next/image';

const FloatingKey = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: -50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="absolute"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  >
    <Key className="text-red-300 h-8 w-8" />
  </motion.div>
);

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    // TODO: Implement API call to send OTP
    console.log('Sending OTP to', phoneNumber);
    setStep(2);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    // TODO: Implement API call to verify OTP
    console.log('Verifying OTP', otp);
    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // TODO: Implement API call to change password
    console.log('Changing password');
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4 overflow-hidden relative">
      {[...Array(5)].map((_, i) => (
        <FloatingKey key={i} delay={i * 0.2} />
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
            className="relative"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/images/preperlysvglogo.svg"
                alt="Preperly Logo"
                width={100}
                height={100}
              />
            </div>
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-center text-red-800 mb-6">Forgot Password</h2>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              onSubmit={handlePhoneSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
              >
                Send OTP
              </Button>
            </motion.form>
          )}
          {step === 2 && (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              onSubmit={handleOtpSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter the 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
              >
                Verify OTP
              </Button>
            </motion.form>
          )}
          {step === 3 && (
            <motion.form
              key="password-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-orange-500"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
              >
                Change Password
              </Button>
            </motion.form>
          )}
          {step === 4 && (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-4">Password Changed Successfully!</h3>
              <p className="text-gray-600 mb-6">Your password has been updated. You can now log in with your new password.</p>
              <Button
                onClick={() => window.location.href = '/login'}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 rounded-md hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300"
              >
                Go to Login
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-4 flex items-center"
          >
            <AlertCircle className="inline mr-1 h-4 w-4" />
            {error}
          </motion.p>
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 text-center"
        >
          <a href="/login" className="text-red-600 hover:text-red-800 flex items-center justify-center">
            Remember your password? Log In <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}