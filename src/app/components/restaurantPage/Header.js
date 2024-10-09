import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header =({ name }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onBack = () => {
      router.back();
    };
  
    return (
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-10 transition-colors duration-300 ${
          isScrolled ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-transparent'
        }`}
        animate={{ 
          backgroundColor: isScrolled ? ['rgba(255, 255, 255, 0)', 'rgba(239, 68, 68, 1)'] : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="p-2">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          {isScrolled && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold text-white"
            >
              {name}
            </motion.h1>
          )}
          <User className="w-6 h-6 text-white" />
        </div>
      </motion.header>
    );
  };

export default Header;