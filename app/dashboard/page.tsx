"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { 
  FaGamepad, 
  FaTrophy, 
  FaChartLine, 
  FaClock, 
  FaStar,
  FaBrain,
  FaGraduationCap,
  FaBook,
  FaCalculator,
  FaPuzzlePiece,
  FaHeart,
  FaRobot
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/DB/config';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface UserProgress {
  completedCourses: string[];
  currentCourses: string[];
  achievements: string[];
}

const DashboardPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<UserProgress>({
    completedCourses: [],
    currentCourses: [],
    achievements: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProgress(data.progress || {
            completedCourses: [],
            currentCourses: [],
            achievements: []
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: <FaBook className="text-4xl text-blue-500" />,
      title: t('current_courses'),
      value: progress.currentCourses.length,
      link: "/courses"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-green-500" />,
      title: t('completed_courses'),
      value: progress.completedCourses.length,
      link: "/courses/completed"
    },
    {
      icon: <FaTrophy className="text-4xl text-yellow-500" />,
      title: t('achievements'),
      value: progress.achievements.length,
      link: "/achievements"
    }
  ];

  const features = [
    {
      icon: <FaGamepad className="text-4xl text-purple-500" />,
      title: t('learning_games'),
      description: t('learning_games_desc'),
      link: "/game"
    },
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: t('mental_health'),
      description: t('mental_health_desc'),
      link: "/mental-health"
    },
    {
      icon: <FaRobot className="text-4xl text-blue-500" />,
      title: t('ai_assistant'),
      description: t('ai_assistant_desc'),
      link: "/assistant"
    }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('welcome_back')}, {user?.displayName || t('user')}!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('track_progress')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(feature.link)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {t('get_started')} →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 