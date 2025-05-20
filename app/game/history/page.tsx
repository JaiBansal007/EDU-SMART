"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaClock } from 'react-icons/fa';

interface HistoryQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  year: number;
  category: 'Ancient' | 'Medieval' | 'Modern';
}

const historyQuestions: HistoryQuestion[] = [
  {
    id: 1,
    question: "Which ancient civilization built the Great Wall of China?",
    options: [
      "Roman Empire",
      "Ming Dynasty",
      "Mongol Empire",
      "Qin Dynasty"
    ],
    correctAnswer: 3,
    explanation: "The Great Wall of China was first built during the Qin Dynasty (221-206 BCE) and later expanded by other dynasties, particularly the Ming Dynasty.",
    year: -221,
    category: 'Ancient'
  },
  {
    id: 2,
    question: "Who was the first President of the United States?",
    options: [
      "Thomas Jefferson",
      "John Adams",
      "George Washington",
      "Benjamin Franklin"
    ],
    correctAnswer: 2,
    explanation: "George Washington served as the first President of the United States from 1789 to 1797.",
    year: 1789,
    category: 'Modern'
  },
  {
    id: 3,
    question: "Which event marked the beginning of World War I?",
    options: [
      "The sinking of the Lusitania",
      "The assassination of Archduke Franz Ferdinand",
      "The invasion of Poland",
      "The bombing of Pearl Harbor"
    ],
    correctAnswer: 1,
    explanation: "The assassination of Archduke Franz Ferdinand of Austria-Hungary in 1914 triggered a series of events that led to World War I.",
    year: 1914,
    category: 'Modern'
  },
  {
    id: 4,
    question: "Who was the first female pharaoh of Egypt?",
    options: [
      "Nefertiti",
      "Cleopatra",
      "Hatshepsut",
      "Nefertari"
    ],
    correctAnswer: 2,
    explanation: "Hatshepsut was the first female pharaoh of Egypt, ruling from 1479 to 1458 BCE.",
    year: -1479,
    category: 'Ancient'
  },
  {
    id: 5,
    question: "Which medieval event led to the spread of the Black Death?",
    options: [
      "The Crusades",
      "The Mongol conquests",
      "The fall of Constantinople",
      "The Hundred Years' War"
    ],
    correctAnswer: 1,
    explanation: "The Mongol conquests and their trade routes facilitated the spread of the Black Death across Asia and Europe in the 14th century.",
    year: 1347,
    category: 'Medieval'
  }
];

const HistoryGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === historyQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < historyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(45);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setGameOver(false);
    setTimeLeft(45);
    setStreak(0);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Ancient':
        return 'text-orange-500';
      case 'Medieval':
        return 'text-purple-500';
      case 'Modern':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Time Travel Complete!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} out of {historyQuestions.length}
            </p>
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                You've journeyed through {historyQuestions.length} historical events!
              </p>
            </div>
            <button
              onClick={restartGame}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Travel Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FaHistory className="text-orange-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">History Quest</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Score: {score}</p>
              <p className="text-gray-600">Streak: {streak}</p>
              <p className="text-gray-600">Time: {timeLeft}s</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                {historyQuestions[currentQuestion].question}
              </h2>
              <span className={`text-sm font-medium ${getCategoryColor(historyQuestions[currentQuestion].category)}`}>
                {historyQuestions[currentQuestion].category} ({historyQuestions[currentQuestion].year})
              </span>
            </div>
            <div className="space-y-3">
              {historyQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === index
                      ? index === historyQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-red-100 border-2 border-red-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-blue-50 rounded-lg"
            >
              <p className="text-gray-700">{historyQuestions[currentQuestion].explanation}</p>
            </motion.div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Next Question
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HistoryGame; 