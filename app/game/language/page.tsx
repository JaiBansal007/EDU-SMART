"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLanguage, FaVolumeUp } from 'react-icons/fa';

interface LanguageExercise {
  id: number;
  type: 'vocabulary' | 'translation' | 'pronunciation';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  audioUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const languageExercises: LanguageExercise[] = [
  {
    id: 1,
    type: 'vocabulary',
    question: "What is the meaning of 'serendipity'?",
    options: [
      "A type of fruit",
      "The occurrence of events by chance in a happy or beneficial way",
      "A mathematical equation",
      "A type of dance"
    ],
    correctAnswer: 1,
    explanation: "Serendipity means the occurrence of events by chance in a happy or beneficial way. It's often used to describe fortunate discoveries made by accident.",
    difficulty: 'advanced'
  },
  {
    id: 2,
    type: 'translation',
    question: "Translate 'Bonjour' to English",
    options: [
      "Goodbye",
      "Hello",
      "Thank you",
      "Please"
    ],
    correctAnswer: 1,
    explanation: "'Bonjour' is the French word for 'Hello'. It's a common greeting used during the day.",
    difficulty: 'beginner'
  },
  {
    id: 3,
    type: 'pronunciation',
    question: "How do you pronounce 'quinoa'?",
    options: [
      "Kwin-oh-ah",
      "Keen-wah",
      "Kwin-oh",
      "Kee-no-ah"
    ],
    correctAnswer: 1,
    explanation: "The correct pronunciation is 'keen-wah'. It's a grain-like crop grown primarily for its edible seeds.",
    difficulty: 'intermediate'
  },
  {
    id: 4,
    type: 'vocabulary',
    question: "What is an antonym for 'ephemeral'?",
    options: [
      "Temporary",
      "Brief",
      "Permanent",
      "Momentary"
    ],
    correctAnswer: 2,
    explanation: "'Permanent' is an antonym for 'ephemeral', which means lasting for a very short time.",
    difficulty: 'advanced'
  },
  {
    id: 5,
    type: 'translation',
    question: "What does 'Ciao' mean in Italian?",
    options: [
      "Good morning",
      "Good night",
      "Hello/Goodbye",
      "Thank you"
    ],
    correctAnswer: 2,
    explanation: "'Ciao' is an informal Italian greeting that can mean both 'hello' and 'goodbye'.",
    difficulty: 'beginner'
  }
];

const LanguageGame = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
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
      handleNextExercise();
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === languageExercises[currentExercise].correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < languageExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(45);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentExercise(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setGameOver(false);
    setTimeLeft(45);
    setStreak(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary':
        return '📚';
      case 'translation':
        return '🌍';
      case 'pronunciation':
        return '🔊';
      default:
        return '📝';
    }
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Language Journey Complete!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} out of {languageExercises.length}
            </p>
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                You've mastered {languageExercises.length} language challenges!
              </p>
            </div>
            <button
              onClick={restartGame}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FaLanguage className="text-blue-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Language Challenge</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Score: {score}</p>
              <p className="text-gray-600">Streak: {streak}</p>
              <p className="text-gray-600">Time: {timeLeft}s</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getTypeIcon(languageExercises[currentExercise].type)}</span>
                <h2 className="text-xl font-medium text-gray-800">
                  {languageExercises[currentExercise].question}
                </h2>
              </div>
              <span className={`text-sm font-medium ${getDifficultyColor(languageExercises[currentExercise].difficulty)}`}>
                {languageExercises[currentExercise].difficulty}
              </span>
            </div>
            <div className="space-y-3">
              {languageExercises[currentExercise].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === index
                      ? index === languageExercises[currentExercise].correctAnswer
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
              <p className="text-gray-700">{languageExercises[currentExercise].explanation}</p>
            </motion.div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextExercise}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Next Challenge
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageGame; 