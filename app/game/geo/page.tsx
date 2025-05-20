'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface GeoQuestion {
  id: number;
  type: 'country' | 'capital' | 'landmark';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
}

const geoQuestions: GeoQuestion[] = [
  {
    id: 1,
    type: 'country',
    question: 'Which country has the largest population in the world?',
    options: ['China', 'India', 'United States', 'Indonesia'],
    correctAnswer: 'China',
    explanation: 'China has the largest population in the world, with over 1.4 billion people.',
    imageUrl: 'https://flagcdn.com/w320/cn.png'
  },
  {
    id: 2,
    type: 'capital',
    question: 'What is the capital of Japan?',
    options: ['Tokyo', 'Kyoto', 'Osaka', 'Nagoya'],
    correctAnswer: 'Tokyo',
    explanation: 'Tokyo is the capital and largest city of Japan, known for its modern technology and traditional culture.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tokyo_Tower_night_view_2.jpg/320px-Tokyo_Tower_night_view_2.jpg'
  },
  {
    id: 3,
    type: 'landmark',
    question: 'In which country is the Great Pyramid of Giza located?',
    options: ['Egypt', 'Morocco', 'Sudan', 'Libya'],
    correctAnswer: 'Egypt',
    explanation: 'The Great Pyramid of Giza is located in Egypt and is one of the Seven Wonders of the Ancient World.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/320px-Kheops-Pyramid.jpg'
  },
  {
    id: 4,
    type: 'country',
    question: 'Which country is known as the Land of Fire and Ice?',
    options: ['Iceland', 'Norway', 'Finland', 'Sweden'],
    correctAnswer: 'Iceland',
    explanation: 'Iceland is called the Land of Fire and Ice because of its volcanoes and glaciers.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Iceland_Dettifoss_1972-4.jpg/320px-Iceland_Dettifoss_1972-4.jpg'
  },
  {
    id: 5,
    type: 'capital',
    question: 'What is the capital of Brazil?',
    options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
    correctAnswer: 'Brasília',
    explanation: 'Brasília is the capital of Brazil, known for its modernist architecture and urban planning.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Brasilia_Cathedral.jpg/320px-Brasilia_Cathedral.jpg'
  }
];

const GeoGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === geoQuestions[currentQuestion].correctAnswer) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < geoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameOver(false);
    setStreak(0);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <FaGlobe className="text-6xl text-blue-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} points
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
              <Link href="/game">
                <button className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Back to Games
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/game">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Back to Games
            </motion.button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-gray-800">
              Score: {score}
            </div>
            {streak > 1 && (
              <div className="text-lg font-medium text-green-500">
                🔥 {streak} Streak!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <FaGlobe className="text-3xl text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">
              Geography Challenge
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {geoQuestions.length}
              </span>
              <span className="text-sm font-medium text-blue-500">
                {geoQuestions[currentQuestion].type.charAt(0).toUpperCase() + 
                 geoQuestions[currentQuestion].type.slice(1)}
              </span>
            </div>

            {geoQuestions[currentQuestion].imageUrl && (
              <div className="mb-6">
                <img
                  src={geoQuestions[currentQuestion].imageUrl}
                  alt="Question illustration"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {geoQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {geoQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-blue-500'
                      : selectedAnswer === option
                      ? option === geoQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : option === geoQuestions[currentQuestion].correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedAnswer === option && (
                      <span className="text-xl">
                        {option === geoQuestions[currentQuestion].correctAnswer ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </span>
                    )}
                    <span className="text-gray-800">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-blue-50 rounded-lg"
            >
              <p className="text-gray-700">
                {geoQuestions[currentQuestion].explanation}
              </p>
            </motion.div>
          )}

          {selectedAnswer && (
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {currentQuestion < geoQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeoGame; 