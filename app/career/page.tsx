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
  FaUserGraduate
} from 'react-icons/fa';
import Link from 'next/link';

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
}

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'interests' | 'skills' | 'personality' | 'workstyle';
}

const careerPaths: CareerPath[] = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Design, develop, and maintain software applications and systems.',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Team Collaboration', 'Version Control', 'Testing'],
    education: ['Computer Science', 'Software Engineering', 'Information Technology'],
    salary: '$80,000 - $150,000',
    growth: 'High',
    icon: <FaBriefcase className="text-2xl text-blue-500" />,
    learningPath: {
      beginner: ['HTML/CSS', 'JavaScript Basics', 'Git Fundamentals', 'Basic Algorithms'],
      intermediate: ['React/Node.js', 'Database Design', 'API Development', 'Testing'],
      advanced: ['System Architecture', 'Cloud Services', 'DevOps', 'Security']
    },
    marketTrends: {
      demand: 'Very High',
      remoteWork: 'Excellent',
      topCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta']
    }
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'Analyze complex data sets to help guide business decisions.',
    skills: ['Statistics', 'Machine Learning', 'Data Analysis', 'Python/R', 'SQL', 'Data Visualization'],
    education: ['Data Science', 'Statistics', 'Computer Science'],
    salary: '$90,000 - $160,000',
    growth: 'Very High',
    icon: <FaChartLine className="text-2xl text-purple-500" />,
    learningPath: {
      beginner: ['Python Basics', 'Statistics Fundamentals', 'SQL', 'Data Cleaning'],
      intermediate: ['Machine Learning', 'Data Visualization', 'Big Data Tools', 'A/B Testing'],
      advanced: ['Deep Learning', 'NLP', 'Computer Vision', 'MLOps']
    },
    marketTrends: {
      demand: 'Extremely High',
      remoteWork: 'Good',
      topCompanies: ['IBM', 'Amazon', 'Microsoft', 'Google']
    }
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Develop AI systems and machine learning models.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Mathematics', 'Neural Networks', 'Research'],
    education: ['Computer Science', 'AI/ML', 'Mathematics'],
    salary: '$100,000 - $180,000',
    growth: 'Very High',
    icon: <FaLightbulb className="text-2xl text-yellow-500" />,
    learningPath: {
      beginner: ['Python', 'Linear Algebra', 'Basic ML', 'Probability'],
      intermediate: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
      advanced: ['Advanced ML', 'Research Methods', 'AI Ethics', 'Model Deployment']
    },
    marketTrends: {
      demand: 'Extremely High',
      remoteWork: 'Good',
      topCompanies: ['OpenAI', 'DeepMind', 'Google', 'Microsoft']
    }
  },
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

const CareerPathPage = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'learning' | 'market'>('overview');

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendedPaths = () => {
    // Simple scoring system based on answers
    const scores = careerPaths.map(path => ({
      id: path.id,
      score: 0
    }));

    // Add scoring logic based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = assessmentQuestions[parseInt(questionId)];
      // Add scoring logic here based on question category and answer
    });

    return scores.sort((a, b) => b.score - a.score).map(s => s.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Back to Home
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-2xl text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Career Path Agent</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Explore Career Paths
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAssessment(!showAssessment)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Take Career Assessment
              </motion.button>
            </div>

            <AnimatePresence>
              {showAssessment && !showResults && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Question {currentQuestion + 1} of {assessmentQuestions.length}
                      </h3>
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xl text-gray-800 dark:text-white mb-4">
                      {assessmentQuestions[currentQuestion].question}
                    </p>
                    <div className="space-y-3">
                      {assessmentQuestions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option)}
                          className="w-full p-4 bg-white dark:bg-gray-800 text-left rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-800 dark:text-white"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {showResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Your Career Matches
                  </h3>
                  <div className="space-y-4">
                    {getRecommendedPaths().map((pathId, index) => {
                      const path = careerPaths.find(p => p.id === pathId);
                      if (!path) return null;
                      return (
                        <motion.div
                          key={pathId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex items-center gap-4">
                            {path.icon}
                            <div>
                              <h4 className="text-lg font-medium text-gray-800 dark:text-white">{path.title}</h4>
                              <p className="text-gray-600 dark:text-gray-300">{path.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path) => (
                <motion.div
                  key={path.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPath(path.id)}
                  className={`p-6 rounded-lg cursor-pointer transition-colors ${
                    selectedPath === path.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {path.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {path.description}
                      </p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Salary: {path.salary}</span>
                          <span>Growth: {path.growth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {selectedPath && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === 'overview'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab('learning')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === 'learning'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Learning Path
                </button>
                <button
                  onClick={() => setSelectedTab('market')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedTab === 'market'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Market Insights
                </button>
              </div>

              <AnimatePresence mode="wait">
                {selectedTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Required Education</h3>
                        <ul className="space-y-2">
                          {careerPaths.find(p => p.id === selectedPath)?.education.map((edu) => (
                            <li key={edu} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <FaCheck className="text-green-500" />
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {careerPaths.find(p => p.id === selectedPath)?.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'learning' && (
                  <motion.div
                    key="learning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <FaUserGraduate className="text-blue-500" />
                          Beginner Level
                        </h3>
                        <ul className="space-y-2">
                          {careerPaths.find(p => p.id === selectedPath)?.learningPath.beginner.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <FaCheck className="text-green-500" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <FaBook className="text-blue-500" />
                          Intermediate Level
                        </h3>
                        <ul className="space-y-2">
                          {careerPaths.find(p => p.id === selectedPath)?.learningPath.intermediate.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <FaCheck className="text-green-500" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <FaRocket className="text-blue-500" />
                          Advanced Level
                        </h3>
                        <ul className="space-y-2">
                          {careerPaths.find(p => p.id === selectedPath)?.learningPath.advanced.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <FaCheck className="text-green-500" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'market' && (
                  <motion.div
                    key="market"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                          <FaChartBar className="text-blue-500" />
                          Market Trends
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-gray-600 dark:text-gray-300">Demand: <span className="font-medium text-gray-800 dark:text-white">
                              {careerPaths.find(p => p.id === selectedPath)?.marketTrends.demand}
                            </span></p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-300">Remote Work Opportunities: <span className="font-medium text-gray-800 dark:text-white">
                              {careerPaths.find(p => p.id === selectedPath)?.marketTrends.remoteWork}
                            </span></p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Companies</h3>
                        <div className="flex flex-wrap gap-2">
                          {careerPaths.find(p => p.id === selectedPath)?.marketTrends.topCompanies.map((company) => (
                            <span
                              key={company}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathPage; 