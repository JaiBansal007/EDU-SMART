'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com' },
    { icon: FaTwitter, url: 'https://twitter.com' },
    { icon: FaLinkedin, url: 'https://linkedin.com' },
    { icon: FaEnvelope, url: 'mailto:contact@edusmart.com' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold"
            >
              EduSmart
            </motion.h3>
            <p className="text-sm">
              Empowering minds through innovative education and interactive learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {['Courses', 'Puzzle Game', 'About', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-sm"
                >
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Tutorials', 'FAQ', 'Support'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="text-sm"
                >
                  <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-white/20 text-center text-sm"
        >
          <p>© {currentYear} EduSmart. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 