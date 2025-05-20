'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaBriefcase, FaChartLine, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
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
}

const careerPaths: CareerPath[] = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Design, develop, and maintain software applications and systems.',
    skills: ['Programming', 'Problem Solving', 'System Design', 'Team Collaboration'],
    education: ['Computer Science', 'Software Engineering', 'Information Technology'],
    salary: '$80,000 - $150,000',
    growth: 'High',
    icon: <FaBriefcase className="text-2xl text-blue-500" />,
  },
  {
    id: 'data',
    title: 'Data Science',
    description: 'Analyze complex data sets to help guide business decisions.',
    skills: ['Statistics', 'Machine Learning', 'Data Analysis', 'Python/R'],
    education: ['Data Science', 'Statistics', 'Computer Science'],
    salary: '$90,000 - $160,000',
    growth: 'Very High',
    icon: <FaChartLine className="text-2xl text-purple-500" />,
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Develop AI systems and machine learning models.',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Mathematics'],
    education: ['Computer Science', 'AI/ML', 'Mathematics'],
    salary: '$100,000 - $180,000',
    growth: 'Very High',
    icon: <FaLightbulb className="text-2xl text-yellow-500" />,
  },
];

const CareerPathPage = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Back to Home
            </motion.button>
          </Link>
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-2xl text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Career Path Agent</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
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

            {showAssessment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Career Assessment
                </h3>
                <p className="text-gray-600 mb-4">
                  Answer a few questions to get personalized career recommendations.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Assessment
                </motion.button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerPaths.map((path) => (
                <motion.div
                  key={path.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPath(path.id)}
                  className={`p-6 rounded-lg cursor-pointer transition-colors ${
                    selectedPath === path.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {path.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {path.description}
                      </p>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {path.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Education:</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {path.education.map((edu) => (
                              <span
                                key={edu}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                              >
                                {edu}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
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
        </div>
      </div>
    </div>
  );
};

export default CareerPathPage; 