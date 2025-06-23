import { motion } from 'framer-motion';

export default function TestMotion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 bg-blue-500 text-white rounded-lg"
    >
      Framer Motion is working!
    </motion.div>
  );
}