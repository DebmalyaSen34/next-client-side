import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function NoRestaurantsFound() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 text-center"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <Search className="w-20 h-20 text-orange-400 mb-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-orange-800 mb-3">No Culinary Adventures Found</h3>
            <p className="text-gray-600 max-w-md">
                We couldn&apos;t find any restaurants that match your current criteria.
                Try adjusting your search or check back later for new dining experiences.
            </p>
        </motion.div>
    );
}