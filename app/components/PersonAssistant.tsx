'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaRobot, FaGamepad, FaChartLine, FaQuestionCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function PersonAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <FaRobot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <FaRobot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('assistant_title')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('assistant_greeting')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FaGamepad className="w-5 h-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-200">{t('find_game')}</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FaChartLine className="w-5 h-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-200">{t('track_progress')}</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FaQuestionCircle className="w-5 h-5 text-primary" />
                <span className="text-gray-700 dark:text-gray-200">{t('get_help')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 