"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowLeft, RefreshCcw, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    onChange(combinedOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4">
      {otp.map((digit, index) => (
        <motion.input
          key={index}
          type="text"
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          className="w-12 h-14 sm:w-14 sm:h-16 text-2xl sm:text-3xl text-center border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white text-orange-500"
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      ))}
    </div>
  );
};

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const { searchParams} = new URL(window.location.href);
      const mobileNumber = searchParams.get('mobileNumber');
      console.log(mobileNumber);
      if (!mobileNumber) {
        console.error('Mobile number is required');
        return;
      }
      const verificationReponse = await fetch(`/api/otp/verifyOtp?mobileNumber=${encodeURIComponent(mobileNumber)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      if (verificationReponse.ok){
        // Redirect to dashboard or success page
        console.log('Verification successful');
        router.push('/');
      }else{
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('An error occurred while verifying OTP: ', error);
    }finally{
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    // Implement resend OTP logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-3xl lg:max-w-5xl flex flex-col sm:flex-row items-center"
      >
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0 sm:pr-8 lg:pr-16">
          <div className="flex items-center mb-6">
            <ArrowLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
            <div className="flex-grow text-center">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Utensils className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Preperly</h1>
            </div>
          </div>
          
          <p className="text-center text-gray-600 mb-6 lg:text-lg">
            Verify your phone to start enjoying delicious pre-ordered meals!
          </p>

          <div className="bg-orange-100 rounded-lg p-4 mb-6 lg:p-6">
            <div className="flex items-center justify-center mb-2">
              <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500 mr-2" />
              <span className="text-orange-700 font-semibold lg:text-lg">Secure Verification</span>
            </div>
            <p className="text-sm lg:text-base text-center text-orange-600">
              We prioritize your security. Your OTP is encrypted and will expire after use.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 sm:pl-8 lg:pl-16 sm:border-l border-orange-200">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 lg:mb-8 text-center">Enter Verification Code</h2>
          
          <OTPInput length={6} onChange={setOtp} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold text-lg lg:text-xl shadow-md mt-8 lg:mt-10 ${isVerifying ? 'opacity-75 cursor-not-allowed' : ''}`}
            onClick={handleVerify}
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 lg:w-7 lg:h-7 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              "Verify & Continue"
            )}
          </motion.button>

          <div className="mt-6 lg:mt-8 text-center">
            {timer > 0 ? (
              <p className="text-gray-600 lg:text-lg">Resend code in {timer}s</p>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResend}
                className="text-orange-500 font-medium flex items-center justify-center mx-auto lg:text-lg"
              >
                <RefreshCcw className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                Resend Code
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}