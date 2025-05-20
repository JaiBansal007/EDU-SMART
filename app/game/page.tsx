'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGamepad, 
  FaCalculator, 
  FaPuzzlePiece, 
  FaBook, 
  FaCode, 
  FaLandmark, 
  FaGlobeAmericas, 
  FaFlask, 
  FaLanguage, 
  FaChartLine 
} from 'react-icons/fa';

const games = [
  {
    title: 'Word Snake',
    description: 'Navigate through a snake game while learning new vocabulary words',
    icon: FaGamepad,
    path: '/game/snake',
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    category: 'Language'
  },
  {
    title: 'Math Quiz',
    description: 'Test your mathematical skills with challenging problems',
    icon: FaCalculator,
    path: '/game/math',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    category: 'Mathematics'
  },
  {
    title: 'Term Matching',
    description: 'Match terms with their definitions in this memory game',
    icon: FaPuzzlePiece,
    path: '/game/matching',
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    category: 'General'
  },
  {
    title: 'Grammar Challenge',
    description: 'Improve your grammar skills with interactive exercises',
    icon: FaBook,
    path: '/game/grammar',
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600',
    category: 'Language'
  },
  {
    title: 'Code Puzzle',
    description: 'Learn programming concepts through fun coding challenges',
    icon: FaCode,
    path: '/game/code',
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
    category: 'Computer Science'
  },
  {
    title: 'History Quest',
    description: 'Travel through time and learn about historical events',
    icon: FaLandmark,
    path: '/game/history',
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500 to-indigo-600',
    category: 'History'
  },
  {
    title: 'Geography Explorer',
    description: 'Discover countries, capitals, and geographical features',
    icon: FaGlobeAmericas,
    path: '/game/geo',
    color: 'bg-teal-500',
    gradient: 'from-teal-500 to-teal-600',
    category: 'Geography'
  },
  {
    title: 'Science Lab',
    description: 'Conduct virtual experiments and learn scientific concepts',
    icon: FaFlask,
    path: '/game/science',
    color: 'bg-pink-500',
    gradient: 'from-pink-500 to-pink-600',
    category: 'Science'
  },
  {
    title: 'Language Learning',
    description: 'Master new languages through interactive lessons',
    icon: FaLanguage,
    path: '/game/language',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    category: 'Language'
  },
  {
    title: 'Financial Literacy',
    description: 'Learn about money management and financial concepts',
    icon: FaChartLine,
    path: '/game/finance',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-600',
    category: 'Finance'
  }
];

const categories = [...new Set(games.map(game => game.category))];

const GamesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            Educational Games
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of interactive games designed to make learning fun and engaging
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-6 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={game.path}>
                <div className={`bg-gradient-to-br ${game.gradient} rounded-2xl p-8 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  <div className="text-white">
                    <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                      <game.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                    <p className="text-white/90 mb-4">{game.description}</p>
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm">
                      {game.category}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage; 