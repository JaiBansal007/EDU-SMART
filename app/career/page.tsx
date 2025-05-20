'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaBriefcase, 
  FaChartLine, 
  FaGraduationCap, 
  FaLightbulb,
  FaCheck,
  FaTimes,
  FaChartBar,
  FaBook,
  FaRocket,
  FaUserGraduate,
  FaCode,
  FaRobot,
  FaLaptopCode,
  FaBrain,
  FaSearch,
  FaFilter,
  FaStar,
  FaUserTie
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string[];
  salary: string;
  growth: string;
  icon: React.ReactNode;
  learningPath: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  marketTrends: {
    demand: string;
    remoteWork: string;
    topCompanies: string[];
  };
  opportunities: string[];
}

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'interests' | 'skills' | 'personality' | 'workstyle';
}

const CareerPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const careerPaths: CareerPath[] = [
    {
      id: 'tech',
      title: t('tech_career'),
      icon: <FaCode className="text-4xl text-blue-500" />,
      description: t('tech_career_desc'),
      skills: ['Programming', 'Problem Solving', 'System Design', 'Cloud Computing'],
      education: ['Computer Science', 'Software Engineering', 'Information Technology'],
      salary: '$80,000 - $150,000',
      growth: 'High',
      learningPath: {
        beginner: ['HTML/CSS', 'JavaScript Basics', 'Git Fundamentals', 'Basic Algorithms'],
        intermediate: ['React/Node.js', 'Database Design', 'API Development', 'Testing'],
        advanced: ['System Architecture', 'Cloud Services', 'DevOps', 'Security']
      },
      marketTrends: {
        demand: 'Very High',
        remoteWork: 'Excellent',
        topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta']
      },
      opportunities: ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'AI Engineer']
    },
    {
      id: 'business',
      title: t('business_career'),
      icon: <FaChartLine className="text-4xl text-green-500" />,
      description: t('business_career_desc'),
      skills: ['Leadership', 'Strategic Planning', 'Financial Analysis', 'Marketing'],
      education: ['Business Administration', 'Economics', 'Marketing'],
      salary: '$70,000 - $120,000',
      growth: 'Moderate',
      learningPath: {
        beginner: ['Marketing Fundamentals', 'Financial Accounting', 'Business Law', 'Entrepreneurship'],
        intermediate: ['Strategic Management', 'International Business', 'Digital Marketing', 'Financial Modeling'],
        advanced: ['Leadership Development', 'Business Strategy', 'Corporate Finance', 'Global Business']
      },
      marketTrends: {
        demand: 'Moderate',
        remoteWork: 'Good',
        topCompanies: ['Apple', 'IBM', 'Microsoft', 'Walmart']
      },
      opportunities: ['Business Analyst', 'Project Manager', 'Marketing Manager', 'Entrepreneur']
    },
    {
      id: 'ai',
      title: t('ai_career'),
      icon: <FaRobot className="text-4xl text-purple-500" />,
      description: t('ai_career_desc'),
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
      education: ['Computer Science', 'AI/ML', 'Mathematics'],
      salary: '$100,000 - $180,000',
      growth: 'Very High',
      learningPath: {
        beginner: ['Python', 'Linear Algebra', 'Basic ML', 'Probability'],
        intermediate: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
        advanced: ['Advanced ML', 'Research Methods', 'AI Ethics', 'Model Deployment']
      },
      marketTrends: {
        demand: 'Extremely High',
        remoteWork: 'Good',
        topCompanies: ['OpenAI', 'DeepMind', 'Google', 'Microsoft']
      },
      opportunities: ['AI Researcher', 'ML Engineer', 'Data Scientist', 'AI Product Manager']
    }
  ];

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 1,
      question: "What type of work environment do you prefer?",
      options: ["Team-based collaboration", "Independent work", "Mix of both", "Leadership role"],
      category: "workstyle"
    },
    {
      id: 2,
      question: "Which of these activities interests you the most?",
      options: ["Building applications", "Analyzing data", "Solving complex problems", "Research and innovation"],
      category: "interests"
    },
    {
      id: 3,
      question: "How do you feel about learning new technologies?",
      options: ["Very excited", "Interested", "Neutral", "Prefer stability"],
      category: "personality"
    },
    {
      id: 4,
      question: "What's your preferred way of solving problems?",
      options: ["Logical analysis", "Creative thinking", "Data-driven approach", "Collaborative brainstorming"],
      category: "skills"
    }
  ];

  const skillAssessments = [
    {
      title: t('coding_assessment'),
      icon: <FaLaptopCode className="text-3xl text-blue-500" />,
      description: t('coding_assessment_desc'),
      duration: '45 min'
    },
    {
      title: t('problem_solving'),
      icon: <FaBrain className="text-3xl text-purple-500" />,
      description: t('problem_solving_desc'),
      duration: '30 min'
    },
    {
      title: t('leadership'),
      icon: <FaUserTie className="text-3xl text-green-500" />,
      description: t('leadership_desc'),
      duration: '60 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              {t('career_development')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('career_development_desc')}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t('search_careers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('explore_careers')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                  selectedPath === path.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <div className="mb-4">{path.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {path.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {path.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 dark:text-gray-200">
                    {t('key_skills')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Assessments */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('skill_assessments')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillAssessments.map((assessment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-4">{assessment.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {assessment.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {assessment.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('duration')}: {assessment.duration}
                  </span>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    {t('start_assessment')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Tips */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            {t('career_tips')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <FaLightbulb className="text-3xl text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {t('continuous_learning')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t('continuous_learning_desc')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <FaBriefcase className="text-3xl text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {t('networking')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t('networking_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage; 