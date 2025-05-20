"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaCheck, FaTimes } from 'react-icons/fa';

interface GrammarExercise {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const grammarExercises: GrammarExercise[] = [
  {
    id: 1,
    sentence: "She don't like to go to the movies.",
    options: [
      "She don't like to go to the movies.",
      "She doesn't like to go to the movies.",
      "She not like to go to the movies.",
      "She do not like to go to the movies."
    ],
    correctAnswer: 1,
    explanation: "The third person singular (she) requires 'doesn't' instead of 'don't'."
  },
  {
    id: 2,
    sentence: "Their going to the store tomorrow.",
    options: [
      "Their going to the store tomorrow.",
      "They're going to the store tomorrow.",
      "There going to the store tomorrow.",
      "They going to the store tomorrow."
    ],
    correctAnswer: 1,
    explanation: "'They're' is the contraction of 'they are', which is needed here."
  },
  {
    id: 3,
    sentence: "The book is laying on the table.",
    options: [
      "The book is laying on the table.",
      "The book is lying on the table.",
      "The book is laid on the table.",
      "The book is lay on the table."
    ],
    correctAnswer: 1,
    explanation: "'Lying' is the correct form for an inanimate object at rest."
  },
  {
    id: 4,
    sentence: "Me and him went to the store.",
    options: [
      "Me and him went to the store.",
      "Him and I went to the store.",
      "He and I went to the store.",
      "I and he went to the store."
    ],
    correctAnswer: 2,
    explanation: "When using multiple subjects, use subject pronouns (I, he) instead of object pronouns (me, him)."
  },
  {
    id: 5,
    sentence: "The data shows that the experiment was successful.",
    options: [
      "The data shows that the experiment was successful.",
      "The data show that the experiment was successful.",
      "The datas show that the experiment was successful.",
      "The datas shows that the experiment was successful."
    ],
    correctAnswer: 1,
    explanation: "'Data' is a plural noun, so it takes a plural verb 'show'."
  }
];

const GrammarGame = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);

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
    
    if (answerIndex === grammarExercises[currentExercise].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < grammarExercises.length - 1) {
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
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your final score: {score} out of {grammarExercises.length}
            </p>
            <button
              onClick={restartGame}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FaBook className="text-purple-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Grammar Challenge</h1>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Score: {score}</p>
              <p className="text-gray-600">Time: {timeLeft}s</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Correct the following sentence:
            </h2>
            <p className="text-lg text-gray-700 mb-6 italic">
              "{grammarExercises[currentExercise].sentence}"
            </p>
            <div className="space-y-3">
              {grammarExercises[currentExercise].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedAnswer === index
                      ? index === grammarExercises[currentExercise].correctAnswer
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
              <p className="text-gray-700">{grammarExercises[currentExercise].explanation}</p>
            </motion.div>
          )}

          {showExplanation && (
            <button
              onClick={handleNextExercise}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Next Exercise
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GrammarGame; 