import { motion } from 'framer-motion';

export default function LoadingRestaurants() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-full border-4 border-orange-300 border-t-orange-600"
            />
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 text-lg text-orange-800 font-medium"
            >
                Discovering culinary delights...
            </motion.p>
        </div>
    );
}