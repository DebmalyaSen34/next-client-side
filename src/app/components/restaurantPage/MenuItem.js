import React from 'react';
import { motion } from 'framer-motion';
import {Plus, Minus } from 'lucide-react';
import Image from 'next/image';

const MenuItem = ({ item, quantity, onAdd, onRemove }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between p-4 border-b border-gray-200"
    >
      <div className="flex items-center">
      <div className='w-16 h-16 relative mr-4'>
        <Image src={item.imageUrl} alt={item.dishName} className="rounded-md" layout='fill' objectFit='cover' />
        </div>
        <div>
          <h4 className="font-medium text-black w-32">{item.dishName}</h4>
          <p className="text-sm text-black">₹{item.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        {quantity > 0 && (
          <>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white p-2 rounded-full"
              onClick={() => onRemove(item.dishName)}
              aria-label={`Remove ${item.dishName} from order`}
            >
              <Minus className="w-5 h-5" />
            </motion.button>
            <span className="mx-2 font-semibold text-black">{quantity}</span>
          </>
        )}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white p-2 rounded-full"
          onClick={() => onAdd(item)}
          aria-label={`Add ${item.dishName} to order`}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );

export default MenuItem;