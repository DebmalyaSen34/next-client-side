"use client"

import { motion } from "framer-motion"

export default function LoadingScreen({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-red-600">
            <motion.div
                className="w-16 h-16 border-4 border-white rounded-full"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.p
                className="mt-4 text-xl font-semibold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {message}
            </motion.p>
        </div>
    )
}