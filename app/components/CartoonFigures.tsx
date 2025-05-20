'use client';
import { motion } from 'framer-motion';

const CartoonFigures = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Book */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/4 left-1/4 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-12"></div>
          <div className="absolute inset-0 bg-blue-400 rounded-lg transform -rotate-12"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            📚
          </div>
        </div>
      </motion.div>

      {/* Floating Brain */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/3 right-1/4 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-purple-500 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            🧠
          </div>
        </div>
      </motion.div>

      {/* Floating Light Bulb */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-1/4 left-1/3 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-yellow-500 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            💡
          </div>
        </div>
      </motion.div>

      {/* Floating Rocket */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-1/3 right-1/3 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-red-500 rounded-lg transform rotate-45"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            🚀
          </div>
        </div>
      </motion.div>

      {/* Floating Atom */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-green-500 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            ⚛️
          </div>
        </div>
      </motion.div>

      {/* Floating Computer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-2/3 right-1/3 w-16 h-16"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-indigo-500 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            💻
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartoonFigures; 