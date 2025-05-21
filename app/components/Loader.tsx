'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    // Generate random particles with different colors
    const colors = ['#60A5FA', '#818CF8', '#A78BFA', '#C084FC', '#E879F9'];
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Background particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: 0.6
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative">
        {/* Main loader container */}
        <div className="relative w-40 h-40">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 opacity-20 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 border-4 border-indigo-300 dark:border-indigo-700 rounded-full"
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-8 border-4 border-purple-400 dark:border-purple-600 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white opacity-20"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginLeft: '-6px',
                marginTop: '-6px',
              }}
              animate={{
                rotate: [0, 360],
                x: [0, 60, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: index * 1,
              }}
            />
          ))}
        </div>

        {/* Loading text with gradient */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 font-medium text-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};

export default Loader; 