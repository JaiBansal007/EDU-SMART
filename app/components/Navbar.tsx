'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  FaUser,
  FaSignOutAlt,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg'
          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span className="text-white text-xl font-bold">E</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              EduSmart
            </motion.div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FaSun className="text-xl text-yellow-500" />
              ) : (
                <FaMoon className="text-xl text-gray-600" />
              )}
            </button>

            <NotificationDropdown />

            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <span className="font-medium hidden md:inline">{user.displayName || t('profile')}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-all"
                  aria-label="Sign out"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all"
              >
                <FaUser className="text-lg" />
                <span className="font-medium">{t('sign_in')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 