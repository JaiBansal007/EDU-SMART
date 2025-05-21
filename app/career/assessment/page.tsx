'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '../../../context/LoadingContext';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
    category: string;
  }[];
}

interface AssessmentResult {
  software: number;
  data: number;
  ai: number;
  recommendations: {
    career: string;
    match: number;
    path: string[];
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you feel about solving complex problems?",
    options: [
      { text: "I enjoy breaking down complex problems into smaller parts", value: 5, category: "software" },
      { text: "I prefer analyzing patterns and trends", value: 5, category: "data" },
      { text: "I like exploring new solutions and innovations", value: 5, category: "ai" },
      { text: "I prefer straightforward tasks", value: 2, category: "software" },
    ],
  },
  {
    id: 2,
    text: "What type of work environment do you prefer?",
    options: [
      { text: "Collaborative team environment", value: 4, category: "software" },
      { text: "Research-focused environment", value: 5, category: "ai" },
      { text: "Data-driven decision making", value: 5, category: "data" },
      { text: "Independent work", value: 3, category: "software" },
    ],
  },
  {
    id: 3,
    text: "How do you feel about mathematics and statistics?",
    options: [
      { text: "I enjoy mathematical concepts and problem-solving", value: 5, category: "ai" },
      { text: "I'm comfortable with basic statistics", value: 4, category: "data" },
      { text: "I prefer practical applications", value: 3, category: "software" },
      { text: "I find it challenging", value: 2, category: "software" },
    ],
  },
  {
    id: 4,
    text: "What interests you most about technology?",
    options: [
      { text: "Building and creating applications", value: 5, category: "software" },
      { text: "Understanding and predicting patterns", value: 5, category: "data" },
      { text: "Developing intelligent systems", value: 5, category: "ai" },
      { text: "Using technology to solve problems", value: 4, category: "software" },
    ],
  },
  {
    id: 5,
    text: "How do you approach learning new things?",
    options: [
      { text: "I enjoy hands-on practice and experimentation", value: 5, category: "software" },
      { text: "I prefer structured learning and research", value: 4, category: "ai" },
      { text: "I like analyzing and understanding concepts", value: 5, category: "data" },
      { text: "I learn best through examples", value: 3, category: "software" },
    ],
  },
];

const careerPaths = {
  software: [
    "Start with basic programming concepts",
    "Learn a programming language (Python/JavaScript)",
    "Study data structures and algorithms",
    "Learn about software development methodologies",
    "Build personal projects",
    "Learn version control (Git)",
    "Study system design",
    "Practice problem-solving",
  ],
  data: [
    "Learn statistics and mathematics",
    "Master data analysis tools (Python/R)",
    "Study machine learning basics",
    "Learn data visualization",
    "Practice with real datasets",
    "Learn SQL and databases",
    "Study big data technologies",
    "Build data projects",
  ],
  ai: [
    "Master mathematics and statistics",
    "Learn Python programming",
    "Study machine learning fundamentals",
    "Learn deep learning concepts",
    "Practice with AI frameworks",
    "Study natural language processing",
    "Learn computer vision",
    "Build AI projects",
  ],
};

const AssessmentPage = () => {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    startLoading();
    // Simulate loading time for data fetching
    const timer = setTimeout(() => {
      stopLoading();
    }, 800);

    return () => clearTimeout(timer);
  }, [startLoading, stopLoading]);

  const calculateResults = () => {
    const scores = {
      software: 0,
      data: 0,
      ai: 0,
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = questions[parseInt(questionId) - 1];
      const selectedOption = question.options[optionIndex];
      scores[selectedOption.category as keyof typeof scores] += selectedOption.value;
    });

    const recommendations = Object.entries(scores)
      .map(([career, score]) => ({
        career,
        match: Math.round((score / (questions.length * 5)) * 100),
        path: careerPaths[career as keyof typeof careerPaths],
      }))
      .sort((a, b) => b.match - a.match);

    return {
      ...scores,
      recommendations,
    };
  };

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion + 1]: optionIndex });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const assessmentResults = calculateResults();
      setResults(assessmentResults);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-2xl font-bold text-gray-800">Career Assessment</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {!showResults ? (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-800">
                      {questions[currentQuestion].text}
                    </h2>
                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(index)}
                          className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {option.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Career Matches</h2>
                {results?.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={recommendation.career}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold capitalize">
                        {recommendation.career} Development
                      </h3>
                      <span className="text-lg font-medium text-blue-600">
                        {recommendation.match}% Match
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Recommended Learning Path:</h4>
                      <ol className="space-y-2">
                        {recommendation.path.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push(`/career/${recommendation.career}`)}
                      className="mt-4 w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      Explore {recommendation.career} Career Path
                      <FaChevronRight />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage; 