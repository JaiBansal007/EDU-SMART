'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPause, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

// Educational words with their definitions and images
const words = [
  { 
    word: 'LEARN', 
    definition: 'To gain knowledge or understanding',
    image: '/images/learn.png'
  },
  { 
    word: 'STUDY', 
    definition: 'To examine or investigate something',
    image: '/images/study.png'
  },
  { 
    word: 'READ', 
    definition: 'To look at and understand written words',
    image: '/images/read.png'
  },
  { 
    word: 'WRITE', 
    definition: 'To form letters or words on a surface',
    image: '/images/write.png'
  },
  { 
    word: 'THINK', 
    definition: 'To use your mind to consider something',
    image: '/images/think.png'
  },
  { 
    word: 'KNOW', 
    definition: 'To have information in your mind',
    image: '/images/know.png'
  },
  { 
    word: 'TEACH', 
    definition: 'To help someone learn something',
    image: '/images/teach.png'
  },
  { 
    word: 'GROW', 
    definition: 'To become larger or develop',
    image: '/images/grow.png'
  },
];

const GRID_SIZE = 20;
const CELL_SIZE = 25; // Increased cell size for better visibility
const INITIAL_SPEED = 150;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15, letter: 'L', image: '/images/learn.png' });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [showDefinition, setShowDefinition] = useState(false);
  const [currentDefinition, setCurrentDefinition] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomLetter = randomWord.word[Math.floor(Math.random() * randomWord.word.length)];
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      letter: randomLetter,
      word: randomWord.word,
      definition: randomWord.definition,
      image: randomWord.image
    };
  }, []);

  const checkCollision = (head) => {
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('snakeHighScore', score.toString());
      }
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      setCurrentWord(currentWord + food.letter);
      setFood(generateFood());
      setCurrentDefinition(food.definition);
      setShowDefinition(true);
      setTimeout(() => setShowDefinition(false), 2000);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isPaused, score, currentWord, generateFood, highScore]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(!isPaused);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameInterval);
    };
  }, [moveSnake, direction, isPaused]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setCurrentWord('');
    setFood(generateFood());
    setIsPaused(false);
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
            <div className="text-xl font-bold text-gray-800">
              Score: {score}
            </div>
            <div className="text-lg text-gray-600">
              High Score: {highScore}
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              {isPaused ? <FaPlay className="text-blue-600" /> : <FaPause className="text-blue-600" />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Word Snake</h1>
            <p className="text-gray-600 text-center mb-4">
              Collect letters to form educational words. Use arrow keys to move and space to pause.
            </p>
            <div className="text-xl font-semibold text-blue-600 mb-2">
              Current Word: {currentWord}
            </div>
            {showDefinition && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={food.image}
                    alt={food.word}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{food.word}</p>
                  <p className="text-gray-600 italic">{currentDefinition}</p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative mx-auto" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
            <div className="absolute inset-0 bg-gray-100 rounded-lg shadow-inner">
              {/* Snake */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className={`absolute rounded-sm transition-all duration-150 ${
                    index === 0 
                      ? 'bg-blue-700' // Head
                      : 'bg-blue-500' // Body
                  }`}
                  style={{
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,
                    transform: index === 0 ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ))}
              {/* Food */}
              <div
                className="absolute bg-white rounded-lg shadow-md flex items-center justify-center"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  left: food.x * CELL_SIZE,
                  top: food.y * CELL_SIZE,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={food.image}
                    alt={food.letter}
                    fill
                    className="object-contain p-1"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">{food.letter}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Over!</h2>
                <p className="text-gray-600 mb-2">Your score: {score}</p>
                <p className="text-gray-600 mb-6">High score: {highScore}</p>
                <button
                  onClick={resetGame}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}

          {isPaused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-800">Game Paused</h2>
                <p className="text-gray-600 mt-2">Press space to continue</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame; 