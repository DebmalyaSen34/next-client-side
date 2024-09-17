'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
      <div className="relative">
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-[50px] right-[-30px] w-24 h-24 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.5, 1.5, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            borderRadius: ["50%", "20%", "50%", "20%", "50%"],
          }}
          transition={{
            duration: 7,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Loading text and animation */}
        <motion.div
          className="text-center z-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="w-24 h-24 border-8 border-white rounded-full mb-8 mx-auto"
            animate={{
              rotate: 360,
              borderRadius: ["50%", "30%", "50%", "30%", "50%"],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <motion.div 
              className="w-full h-full bg-orange-500 rounded-full"
              animate={{
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Preparing Your Fiery Dashboard
          </motion.h2>
          <p className="text-white text-opacity-80">Igniting your personalized experience...</p>
        </motion.div>
      </div>
    </div>
  )
}