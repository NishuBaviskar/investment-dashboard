import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, className = '' }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>}
      {children}
    </motion.div>
  );
};

export default Card;