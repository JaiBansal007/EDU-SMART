"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCheck, FaTimes } from 'react-icons/fa';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const financeQuestions: Question[] = [
  {
    id: 1,
    question: "What is compound interest?",
    options: [
      "Interest earned only on the principal amount",
      "Interest earned on both principal and accumulated interest",
      "A fixed interest rate that never changes",
      "Interest paid only on loans"
    ],
    correctAnswer: 1,
    explanation: "Compound interest is interest earned on both the principal amount and any previously accumulated interest."
  },
  {
    id: 2,
    question: "What is a stock?",
    options: [
      "A type of bond",
      "A share of ownership in a company",
      "A type of savings account",
      "A government security"
    ],
    correctAnswer: 1,
    explanation: "A stock represents a share of ownership in a company and entitles the holder to a portion of the company's assets and profits."
  },
  {
    id: 3,
    question: "What is diversification in investing?",
    options: [
      "Putting all your money in one investment",
      "Spreading investments across different assets to reduce risk",
      "Investing only in stocks",
      "Selling all investments at once"
    ],
    correctAnswer: 1,
    explanation: "Diversification is a risk management strategy that spreads investments across various financial instruments, industries, and other categories."
  },
  {
    id: 4,
    question: "What is a budget?",
    options: [
      "A list of things you want to buy",
      "A plan for managing income and expenses",
      "A type of bank account",
      "A government tax form"
    ],
    correctAnswer: 1,
    explanation: "A budget is a financial plan that helps you track income and expenses to ensure you're living within your means."
  },
  {
    id: 5,
    question: "What is inflation?",
    options: [
      "A decrease in prices over time",
      "An increase in the general price level of goods and services",
      "A type of investment",
      "A government tax"
    ],
    correctAnswer: 1,
    explanation: "Inflation is the rate at which the general level of prices for goods and services is rising, leading to a decrease in purchasing power."
  }
];

const FinanceGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

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
    
    if (answerIndex === financeQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < financeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
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
    setTimeLeft(30);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} out of {financeQuestions.length}
            </p>
            <button
              onClick={restartGame}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Finance Quiz</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Score: {score}</p>
              <p className="text-gray-600">Time: {timeLeft}s</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              {financeQuestions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {financeQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === index
                      ? index === financeQuestions[currentQuestion].correctAnswer
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
              <p className="text-gray-700">{financeQuestions[currentQuestion].explanation}</p>
            </motion.div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Next Question
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceGame; 