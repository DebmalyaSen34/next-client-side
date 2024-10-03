import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Description = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    const descriptionRef = useRef(null);
    const [showMore, setShowMore] = useState(false);
  
    useEffect(() => {
      if (descriptionRef.current) {
        setShowMore(descriptionRef.current.scrollHeight > 80);
      }
    }, [text]);
  
    return (
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2 text-black">About {'Restaurant'}</h3>
        <motion.div
          ref={descriptionRef}
          initial={{ height: 80 }}
          animate={{ height: expanded ? 'auto' : 80 }}
          className="overflow-hidden"
        >
          <p className="text-black text-sm">{text}</p>
        </motion.div>
        {showMore && (
          <button
            className="text-red-500 text-sm font-medium mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    );
  };

export default Description;