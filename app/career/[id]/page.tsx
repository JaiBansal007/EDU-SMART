'use client';
import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaBriefcase, FaChartLine, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import Loader from '@/app/components/Loader';
import { useLoading } from '@/app/context/LoadingContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

interface CareerData {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string[];
  salary: string;
  growth: string;
  icon: React.ReactNode;
  skillDemand: number[];
  salaryProgression: number[];
  jobRoles: string[];
  roleDistribution: number[];
  skillCategories: string[];
  skillLevels: number[];
}

const careerData: Record<string, CareerData> = {
  software: {
    id: 'software',
    title: 'Software Development',
    description: 'Design, develop, and maintain software applications and systems.',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Team Collaboration'],
    education: ['Computer Science', 'Software Engineering', 'Information Technology'],
    salary: '$80,000 - $150,000',
    growth: 'High',
    icon: <FaBriefcase className="text-2xl text-blue-500" />,
    skillDemand: [85, 90, 95, 88, 92, 96],
    salaryProgression: [80000, 95000, 115000, 135000, 150000, 180000],
    jobRoles: ['Frontend Developer', 'Backend Developer', 'Full Stack', 'DevOps', 'Mobile Developer'],
    roleDistribution: [25, 30, 20, 15, 10],
    skillCategories: ['Technical', 'Problem Solving', 'Communication', 'Teamwork', 'Business'],
    skillLevels: [90, 85, 75, 80, 70],
  },
  data: {
    id: 'data',
    title: 'Data Science',
    description: 'Analyze complex data sets to help guide business decisions.',
    skills: ['Statistics', 'Machine Learning', 'Data Analysis', 'Python/R'],
    education: ['Data Science', 'Statistics', 'Computer Science'],
    salary: '$90,000 - $160,000',
    growth: 'Very High',
    icon: <FaChartLine className="text-2xl text-purple-500" />,
    skillDemand: [88, 92, 95, 90, 94, 98],
    salaryProgression: [90000, 110000, 130000, 150000, 160000, 190000],
    jobRoles: ['Data Analyst', 'Data Scientist', 'ML Engineer', 'Data Engineer', 'Business Analyst'],
    roleDistribution: [20, 30, 25, 15, 10],
    skillCategories: ['Statistics', 'Programming', 'ML/AI', 'Data Visualization', 'Domain Knowledge'],
    skillLevels: [85, 80, 90, 75, 70],
  },
  ai: {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Develop AI systems and machine learning models.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Mathematics'],
    education: ['Computer Science', 'AI/ML', 'Mathematics'],
    salary: '$100,000 - $180,000',
    growth: 'Very High',
    icon: <FaLightbulb className="text-2xl text-yellow-500" />,
    skillDemand: [90, 94, 98, 96, 99, 100],
    salaryProgression: [100000, 120000, 140000, 160000, 180000, 200000],
    jobRoles: ['AI Engineer', 'ML Engineer', 'Research Scientist', 'AI Architect', 'NLP Engineer'],
    roleDistribution: [30, 25, 20, 15, 10],
    skillCategories: ['ML/DL', 'Mathematics', 'Programming', 'Research', 'Problem Solving'],
    skillLevels: [95, 90, 85, 80, 85],
  },
};

const CareerDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { startLoading, stopLoading } = useLoading();
  const resolvedParams = use(params);
  const career = careerData[resolvedParams.id];

  useEffect(() => {
    startLoading();
    // Simulate loading time for data fetching
    const timer = setTimeout(() => {
      stopLoading();
    }, 1000);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  if (!career) {
    return <div>Career not found</div>;
  }

  const skillDemandData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Skill Demand Trend',
        data: career.skillDemand,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  };

  const salaryProgressionData = {
    labels: ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Principal'],
    datasets: [
      {
        label: 'Salary Progression',
        data: career.salaryProgression,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const roleDistributionData = {
    labels: career.jobRoles,
    datasets: [
      {
        data: career.roleDistribution,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const skillRadarData = {
    labels: career.skillCategories,
    datasets: [
      {
        label: 'Required Skill Levels',
        data: career.skillLevels,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/career">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Back to Careers
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            {career.icon}
            <h1 className="text-2xl font-bold text-gray-800">{career.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skill Demand Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Skill Demand Trend</h2>
            <Line data={skillDemandData} />
          </motion.div>

          {/* Salary Progression */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Salary Progression</h2>
            <Bar data={salaryProgressionData} />
          </motion.div>

          {/* Role Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
            <Doughnut data={roleDistributionData} />
          </motion.div>

          {/* Skill Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <Radar data={skillRadarData} />
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Career Overview</h2>
          <p className="text-gray-600 mb-4">{career.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Education Paths</h3>
              <div className="flex flex-wrap gap-2">
                {career.education.map((edu) => (
                  <span
                    key={edu}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {edu}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerDetailPage; 