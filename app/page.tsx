'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGamepad, 
  FaHeart, 
  FaMicrophone, 
  FaRobot, 
  FaGraduationCap, 
  FaLanguage,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStar,
  FaUsers,
  FaChartLine,
  FaLightbulb,
  FaBrain,
  FaDna,
  FaLeaf
} from 'react-icons/fa';
import { useLanguage } from './context/LanguageContext';
import ThreeDVisualization from './components/3DVisualization';
import CartoonFigures from './components/CartoonFigures';

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const { t } = useLanguage();

  const features = [
    {
      icon: <FaGamepad className="text-4xl text-purple-500" />,
      title: t('gamified_learning'),
      description: t('gamified_learning_desc'),
      link: "/game",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: t('mental_health_check'),
      description: t('mental_health_check_desc'),
      link: "/mental-health",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FaMicrophone className="text-4xl text-blue-500" />,
      title: t('voice_assistant_desc'),
      description: t('voice_assistant_desc_long'),
      link: "/voice-assistant",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaRobot className="text-4xl text-green-500" />,
      title: t('personalized_assistant'),
      description: t('personalized_assistant_desc'),
      link: "/assistant",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-yellow-500" />,
      title: t('career_path'),
      description: t('career_path_desc'),
      link: "/career",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaLanguage className="text-4xl text-indigo-500" />,
      title: t('multilingual_support'),
      description: t('multilingual_support_desc'),
      link: "/language-support",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { icon: <FaUsers className="text-3xl text-blue-500" />, value: "10K+", label: t('active_students') },
    { icon: <FaStar className="text-3xl text-yellow-500" />, value: "4.8/5", label: t('user_rating') },
    { icon: <FaChartLine className="text-3xl text-green-500" />, value: "95%", label: t('success_rate') },
    { icon: <FaLightbulb className="text-3xl text-purple-500" />, value: "50+", label: t('learning_paths') }
  ];

  const models = [
    {
      type: 'dna',
      icon: <FaDna className="text-3xl text-blue-500" />,
      title: t('dna_model'),
      description: t('dna_description')
    },
    {
      type: 'brain',
      icon: <FaBrain className="text-3xl text-purple-500" />,
      title: t('brain_model'),
      description: t('brain_description')
    },
    {
      type: 'cell',
      icon: <FaLeaf className="text-3xl text-green-500" />,
      title: t('cell_model'),
      description: t('cell_description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 dark:opacity-20" />
        <div className="container mx-auto px-4 z-10">
          <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
            <CartoonFigures />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t('welcome')}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {t('welcome_description')}
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/dashboard">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all"
                    >
                      {t('get_started')}
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-full sm:w-auto bg-white dark:bg-gray-800 text-blue-500 px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    {t('watch_demo')}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('discover_features')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveFeature(index)}
                onHoverEnd={() => setActiveFeature(null)}
              >
                <Link href={feature.link}>
                  <div className={`bg-gradient-to-br ${feature.color} p-1 rounded-2xl h-full`}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full hover:shadow-xl transition-all">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-blue-500 font-medium">
                        {t('learn_more')}
                        <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Models Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {t('interactive_3d')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('explore_models')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="h-64">
                  <ThreeDVisualization modelType={model.type as any} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {model.icon}
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {model.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {model.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('ready_to_start')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('join_thousands')}
          </motion.p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transition-all"
            >
              {t('get_started')}
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
