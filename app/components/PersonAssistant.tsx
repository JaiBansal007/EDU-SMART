'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';

const PersonAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Assistant Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <FaRobot className="w-6 h-6" />
      </motion.button>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">EduSmart Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                Hi! I'm your learning assistant. How can I help you today?
              </p>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Find a game
                </button>
                <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Track progress
                </button>
                <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  Get help
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PersonAssistant; 