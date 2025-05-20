'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Question {
  question: string;
  answer: number;
  options: number[];
}

const MathQuizGame = () => {
  const { t } = useLanguage();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const generateQuestion = (): Question => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;

    // Ensure positive results for subtraction
    if (operation === '-' && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    let answer: number;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      default:
        answer = 0;
    }

    const options = [answer];
    while (options.length < 4) {
      const option = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
      if (!options.includes(option)) {
        options.push(option);
      }
    }

    return {
      question: `${num1} ${operation} ${num2} = ?`,
      answer,
      options: options.sort(() => Math.random() - 0.5),
    };
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion?.answer) {
      setScore(prev => prev + 10);
      setMessage(t('math_quiz_correct'));
    } else {
      setMessage(t('math_quiz_wrong'));
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setMessage('');
      setCurrentQuestion(generateQuestion());
    }, 1500);
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setCurrentQuestion(generateQuestion());
    setMessage('');
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 text-blue-600"
        >
          {t('math_quiz_title')}
        </motion.h1>

        <div className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-purple-600"
          >
            {t('score')}: {score}
          </motion.div>
          <div className="text-xl font-semibold text-blue-600">
            {t('time_left')}: {timeLeft}s
          </div>
        </div>

        {!gameOver ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              {currentQuestion?.question}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion?.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(option)}
                  className={`p-4 rounded-lg text-xl font-semibold ${
                    selectedAnswer === option
                      ? option === currentQuestion.answer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-lg font-medium"
                style={{
                  color: message.includes(t('math_quiz_correct')) ? '#059669' : '#DC2626',
                }}
              >
                {message}
              </motion.div>
            )}
          </motion.div>
        ) :
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {t('math_quiz_game_over')} {t('final_score')}: {score}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={restartGame}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              {t('play_again')}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MathQuizGame; 