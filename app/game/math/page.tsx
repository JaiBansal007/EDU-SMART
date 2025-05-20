'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

const OPERATORS = ['+', '-', '×', '÷'];
const DIFFICULTY_LEVELS = {
  easy: { maxNumber: 10, operators: ['+', '-'] },
  medium: { maxNumber: 20, operators: ['+', '-', '×'] },
  hard: { maxNumber: 50, operators: ['+', '-', '×', '÷'] },
};

const MathQuiz = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const generateProblem = () => {
    const { maxNumber, operators } = DIFFICULTY_LEVELS[difficulty];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * maxNumber) + 1;
    let num2 = Math.floor(Math.random() * maxNumber) + 1;

    // Ensure division problems result in whole numbers
    if (operator === '÷') {
      num1 = num1 * num2;
    }

    let answer;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '×':
        answer = num1 * num2;
        break;
      case '÷':
        answer = num1 / num2;
        break;
    }

    return {
      num1,
      num2,
      operator,
      answer,
      question: `${num1} ${operator} ${num2} = ?`,
    };
  };

  useEffect(() => {
    if (!gameOver) {
      setCurrentProblem(generateProblem());
    }
  }, [difficulty, gameOver]);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === currentProblem.answer;

    if (isCorrect) {
      setScore(score + 10 + streak);
      setStreak(streak + 1);
      setFeedback({ type: 'correct', message: 'Correct!' });
    } else {
      setStreak(0);
      setFeedback({ type: 'incorrect', message: `Incorrect. The answer was ${currentProblem.answer}` });
    }

    setUserAnswer('');
    setCurrentProblem(generateProblem());

    setTimeout(() => {
      setFeedback(null);
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setGameOver(false);
    setFeedback(null);
    setCurrentProblem(generateProblem());
  };

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
            <div className="text-xl font-bold text-gray-800">Score: {score}</div>
            <div className="text-xl font-bold text-gray-800">Time: {timeLeft}s</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Math Quiz</h1>
            <p className="text-gray-600 text-center mb-4">
              Solve math problems as quickly as you can. Each correct answer increases your streak bonus!
            </p>
            <div className="flex gap-4 mb-4">
              {Object.keys(DIFFICULTY_LEVELS).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-full ${
                    difficulty === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            {streak > 0 && (
              <div className="text-green-600 font-bold">
                Streak: {streak}x multiplier!
              </div>
            )}
          </div>

          {!gameOver ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-8">
                {currentProblem?.question}
              </div>
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-full px-4 py-2 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your answer"
                  autoFocus
                />
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
              <p className="text-gray-600 mb-6">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg text-center ${
                feedback.type === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {feedback.type === 'correct' ? <FaCheck /> : <FaTimes />}
                {feedback.message}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MathQuiz; 