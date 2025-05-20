'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaArrowLeft, FaCheck, FaTimes, FaAtom, FaDna, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

interface ScienceQuestion {
  id: number;
  type: 'physics' | 'chemistry' | 'biology' | 'astronomy';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const scienceQuestions: ScienceQuestion[] = [
  {
    id: 1,
    type: 'physics',
    question: 'What is the SI unit of electric current?',
    options: ['Ampere', 'Volt', 'Watt', 'Ohm'],
    correctAnswer: 'Ampere',
    explanation: 'The ampere (A) is the SI unit of electric current. It is defined as the constant current that, if maintained in two straight parallel conductors of infinite length, would produce a force of 2 × 10⁻⁷ newtons per meter of length.',
    difficulty: 'easy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ampere_definition.svg/320px-Ampere_definition.svg.png'
  },
  {
    id: 2,
    type: 'chemistry',
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Fe', 'Cu'],
    correctAnswer: 'Au',
    explanation: 'The chemical symbol for gold is Au, from the Latin word "aurum" meaning "shining dawn". Gold is a precious metal that has been used for coinage, jewelry, and other arts throughout recorded history.',
    difficulty: 'easy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Gold-crystals.jpg/320px-Gold-crystals.jpg'
  },
  {
    id: 3,
    type: 'biology',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Mitochondria', 'Nucleus', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
    correctAnswer: 'Mitochondria',
    explanation: 'Mitochondria are known as the powerhouse of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.',
    difficulty: 'medium',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mitochondria%2C_mammalian_lung_cell.jpg/320px-Mitochondria%2C_mammalian_lung_cell.jpg'
  },
  {
    id: 4,
    type: 'astronomy',
    question: 'What is the name of the largest planet in our solar system?',
    options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
    correctAnswer: 'Jupiter',
    explanation: 'Jupiter is the largest planet in our solar system. It is a gas giant with a mass more than 2.5 times that of all the other planets in our solar system combined.',
    difficulty: 'easy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/320px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
  },
  {
    id: 5,
    type: 'physics',
    question: 'What is the principle behind the working of a laser?',
    options: ['Stimulated Emission', 'Spontaneous Emission', 'Absorption', 'Reflection'],
    correctAnswer: 'Stimulated Emission',
    explanation: 'A laser works on the principle of stimulated emission of electromagnetic radiation. When atoms in an excited state are stimulated by photons, they emit more photons of the same frequency, phase, and direction.',
    difficulty: 'hard',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Laser_pointer_beam.jpg/320px-Laser_pointer_beam.jpg'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'physics':
      return <FaAtom className="text-purple-500" />;
    case 'chemistry':
      return <FaFlask className="text-blue-500" />;
    case 'biology':
      return <FaDna className="text-green-500" />;
    case 'astronomy':
      return <FaRocket className="text-red-500" />;
    default:
      return <FaFlask className="text-blue-500" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const ScienceGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(30);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleAnswerSelect(''); // Time's up
    }
  }, [timeLeft, selectedAnswer]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === scienceQuestions[currentQuestion].correctAnswer) {
      const timeBonus = Math.floor(timeLeft / 2);
      setScore(score + 10 + timeBonus);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < scienceQuestions.length - 1) {
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
    setTimeLeft(30);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <FaFlask className="text-6xl text-purple-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} points
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
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
            {getTypeIcon(scienceQuestions[currentQuestion].type)}
            <h1 className="text-2xl font-bold text-gray-800">
              Science Challenge
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1} of {scienceQuestions.length}
                </span>
                <span className={`text-sm font-medium ${getDifficultyColor(scienceQuestions[currentQuestion].difficulty)}`}>
                  {scienceQuestions[currentQuestion].difficulty.toUpperCase()}
                </span>
              </div>
              <div className="text-sm font-medium text-blue-500">
                Time Left: {timeLeft}s
              </div>
            </div>

            {scienceQuestions[currentQuestion].imageUrl && (
              <div className="mb-6">
                <img
                  src={scienceQuestions[currentQuestion].imageUrl}
                  alt="Question illustration"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {scienceQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {scienceQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-purple-500'
                      : selectedAnswer === option
                      ? option === scienceQuestions[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : option === scienceQuestions[currentQuestion].correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedAnswer === option && (
                      <span className="text-xl">
                        {option === scienceQuestions[currentQuestion].correctAnswer ? (
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
              className="mb-6 p-4 bg-purple-50 rounded-lg"
            >
              <p className="text-gray-700">
                {scienceQuestions[currentQuestion].explanation}
              </p>
            </motion.div>
          )}

          {selectedAnswer && (
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                {currentQuestion < scienceQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScienceGame; 