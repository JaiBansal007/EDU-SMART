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
  FaPuzzlePiece
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

const stats = [
  {
    title: 'Total Games Played',
    value: '24',
    icon: FaGamepad,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'High Score',
    value: '850',
    icon: FaTrophy,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'Learning Streak',
    value: '7 days',
    icon: FaChartLine,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Time Spent',
    value: '12.5 hrs',
    icon: FaClock,
    color: 'from-purple-500 to-purple-600',
  },
];

const recentGames = [
  {
    title: 'Word Snake',
    score: 85,
    date: '2 hours ago',
    icon: FaGamepad,
  },
  {
    title: 'Math Quiz',
    score: 92,
    date: 'Yesterday',
    icon: FaCalculator,
  },
  {
    title: 'Term Matching',
    score: 78,
    date: '2 days ago',
    icon: FaPuzzlePiece,
  },
];

interface Game {
  title: string;
  score: number;
  date: string;
  icon: IconType;
}

interface DashboardData {
  stats: {
    totalGames: number;
    highScore: number;
    learningStreak: number;
    timeSpent: number;
  };
  recentGames: Game[];
  progressData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  };
  subjectData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  achievementData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      totalGames: 24,
      highScore: 850,
      learningStreak: 7,
      timeSpent: 12.5
    },
    recentGames: [],
    progressData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Learning Progress',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      }]
    },
    subjectData: {
      labels: ['Math', 'Language', 'Science', 'History', 'Geography'],
      datasets: [{
        label: 'Performance by Subject',
        data: [85, 72, 90, 65, 78],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      }]
    },
    achievementData: {
      labels: ['Completed', 'In Progress', 'Not Started'],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
      }]
    }
  });

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        // setDashboardData(data);
        
        // For now, using mock data
        setDashboardData(prevData => ({
          ...prevData,
          recentGames: recentGames
        }));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleGameClick = (game: Game) => {
    // Handle game click - could navigate to game details or replay
    console.log('Game clicked:', game);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-4">
            Your Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your progress and achievements
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300`}
              onClick={() => console.log(`Clicked ${stat.title}`)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{stat.title}</h3>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Weekly Progress</h3>
            <div className="h-80">
              <Line data={dashboardData.progressData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Subject Performance</h3>
            <div className="h-80">
              <Bar data={dashboardData.subjectData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Games</h3>
            <div className="space-y-4">
              {dashboardData.recentGames.map((game, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => handleGameClick(game)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <game.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{game.title}</h4>
                      <p className="text-sm text-gray-500">{game.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{game.score}%</p>
                    <p className="text-sm text-gray-500">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Achievement Progress</h3>
            <div className="h-64">
              <Doughnut data={dashboardData.achievementData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-500">65%</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-500">25%</p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-400">10%</p>
                <p className="text-sm text-gray-500">Not Started</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 