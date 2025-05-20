'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <FaGamepad className="w-6 h-6" />
            <span className="text-xl font-bold">EduSmart</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/game">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Games
              </motion.button>
            </Link>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Dashboard
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 