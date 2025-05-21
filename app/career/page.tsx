'use client';
import { useState, useEffect } from 'react';
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
  FaUserTie,
  FaPalette,
  FaDatabase,
  FaLock
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useLoading } from '../context/LoadingContext';

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
  const { startLoading, stopLoading } = useLoading();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);

  useEffect(() => {
    startLoading();
    // Simulate loading time for data fetching
    const timer = setTimeout(() => {
      stopLoading();
    }, 800);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  const careerPaths: CareerPath[] = [
    {
      id: 'tech',
      title: t('tech_career'),
      icon: <FaCode className="text-4xl text-blue-500" />,
      description: t('tech_career_desc'),
      skills: ['Programming', 'Problem Solving', 'System Design', 'Cloud Computing', 'DevOps', 'Security'],
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
      skills: ['Leadership', 'Strategic Planning', 'Financial Analysis', 'Marketing', 'Project Management', 'Business Development'],
      education: ['Business Administration', 'Economics', 'Marketing', 'Finance'],
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
      skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Analysis', 'Python'],
      education: ['Computer Science', 'AI/ML', 'Mathematics', 'Data Science'],
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
    },
    {
      id: 'design',
      title: 'Design & UX',
      icon: <FaPalette className="text-4xl text-pink-500" />,
      description: 'Create beautiful and functional user experiences through design thinking and creativity.',
      skills: ['UI/UX Design', 'Visual Design', 'User Research', 'Prototyping', 'Design Systems', 'Figma'],
      education: ['Design', 'Human-Computer Interaction', 'Visual Arts', 'Digital Media'],
      salary: '$65,000 - $130,000',
      growth: 'High',
      learningPath: {
        beginner: ['Design Fundamentals', 'Color Theory', 'Typography', 'Basic Tools'],
        intermediate: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
        advanced: ['Design Leadership', 'Advanced UX', 'Design Strategy', 'User Psychology']
      },
      marketTrends: {
        demand: 'High',
        remoteWork: 'Excellent',
        topCompanies: ['Adobe', 'Figma', 'Airbnb', 'Spotify']
      },
      opportunities: ['UI/UX Designer', 'Product Designer', 'Design Lead', 'Creative Director']
    },
    {
      id: 'data',
      title: 'Data Science',
      icon: <FaDatabase className="text-4xl text-orange-500" />,
      description: 'Transform raw data into valuable insights and drive data-driven decision making.',
      skills: ['Data Analysis', 'Statistics', 'Python/R', 'SQL', 'Data Visualization', 'Machine Learning'],
      education: ['Data Science', 'Statistics', 'Computer Science', 'Mathematics'],
      salary: '$85,000 - $160,000',
      growth: 'Very High',
      learningPath: {
        beginner: ['Python/R', 'SQL Basics', 'Statistics', 'Data Cleaning'],
        intermediate: ['Data Analysis', 'Data Visualization', 'Machine Learning', 'Big Data'],
        advanced: ['Advanced Analytics', 'Deep Learning', 'Data Engineering', 'MLOps']
      },
      marketTrends: {
        demand: 'Very High',
        remoteWork: 'Excellent',
        topCompanies: ['Google', 'Amazon', 'Microsoft', 'IBM']
      },
      opportunities: ['Data Scientist', 'Data Analyst', 'Data Engineer', 'ML Engineer']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: <FaLock className="text-4xl text-red-500" />,
      description: 'Protect systems and data from digital threats and ensure information security.',
      skills: ['Network Security', 'Ethical Hacking', 'Security Analysis', 'Risk Management', 'Cryptography', 'Incident Response'],
      education: ['Cybersecurity', 'Computer Science', 'Information Security', 'Network Engineering'],
      salary: '$90,000 - $170,000',
      growth: 'Very High',
      learningPath: {
        beginner: ['Network Basics', 'Security Fundamentals', 'Linux', 'Basic Scripting'],
        intermediate: ['Penetration Testing', 'Security Analysis', 'Incident Response', 'Security Tools'],
        advanced: ['Advanced Security', 'Threat Intelligence', 'Security Architecture', 'Forensics']
      },
      marketTrends: {
        demand: 'Extremely High',
        remoteWork: 'Good',
        topCompanies: ['Cisco', 'Palo Alto Networks', 'CrowdStrike', 'FireEye']
      },
      opportunities: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'CISO']
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
      {/* Hero Section with Parallax Effect */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t('career_development')}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('career_development_desc')}
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/career/assessment">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {t('take_assessment')}
                </motion.button>
              </Link>
              <Link href="/career/assessment/history">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                >
                  View History
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder={t('search_careers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all group-hover:shadow-lg"
              />
              <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Paths with Enhanced Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('explore_careers')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                onHoverStart={() => setHoveredPath(path.id)}
                onHoverEnd={() => setHoveredPath(null)}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                  selectedPath === path.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedPath(path.id);
                  setShowRoadmap(true);
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-bl-full transition-all duration-300" />
                <div className="relative z-10">
                  <motion.div 
                    className="mb-6"
                    animate={{ 
                      scale: hoveredPath === path.id ? 1.1 : 1,
                      rotate: hoveredPath === path.id ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {path.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {path.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {path.description}
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {t('key_skills')}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <motion.div 
                    className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPath === path.id ? 1 : 0 }}
                  >
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{t('salary')}: {path.salary}</span>
                      <span>{t('growth')}: {path.growth}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {showRoadmap && selectedPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRoadmap(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Career Roadmap
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowRoadmap(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes className="text-2xl" />
                </motion.button>
              </div>

              <div className="space-y-12">
                {Object.entries(careerPaths.find(p => p.id === selectedPath)?.learningPath || {}).map(([level, skills], index) => (
                  <motion.div
                    key={level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <h4 className="text-2xl font-semibold text-gray-800 dark:text-white capitalize">
                        {level}
                      </h4>
                    </div>
                    <div className="ml-16 pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              <span className="text-gray-700 dark:text-gray-200">{skill}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRoadmap(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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