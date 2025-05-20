'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguage, languages } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as keyof typeof languages);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
      >
        <FaGlobe className="text-blue-500" />
        <span className="text-gray-700 dark:text-gray-300">{languages[language]}</span>
        <FaChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language === code ? 'text-blue-500 font-medium' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 