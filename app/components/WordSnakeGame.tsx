'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Letter {
  char: string;
  position: Position;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 150;

const WordSnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [letters, setLetters] = useState<Letter[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [message, setMessage] = useState('');

  const validWords = ['MATH', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'SUM', 'PRODUCT'];

  const generateLetter = useCallback(() => {
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return { char: randomChar, position };
  }, []);

  useEffect(() => {
    if (letters.length < 5) {
      setLetters(prev => [...prev, generateLetter()]);
    }
  }, [letters.length, generateLetter]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }

      const newSnake = [head, ...prevSnake];
      const letterIndex = letters.findIndex(
        letter => letter.position.x === head.x && letter.position.y === head.y
      );

      if (letterIndex !== -1) {
        const letter = letters[letterIndex];
        setCurrentWord(prev => prev + letter.char);
        setLetters(prev => prev.filter((_, i) => i !== letterIndex));
        setScore(prev => prev + 10);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, letters, gameOver]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const checkWord = () => {
      if (currentWord.length >= 3) {
        if (validWords.includes(currentWord)) {
          setMessage('Correct word! +50 points');
          setScore(prev => prev + 50);
        } else {
          setMessage('Invalid word! Try again');
        }
        setCurrentWord('');
      }
    };

    const timeout = setTimeout(checkWord, 1000);
    return () => clearTimeout(timeout);
  }, [currentWord]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
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
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 text-blue-600"
        >
          Word Snake Game
        </motion.h1>

        <div className="text-center mb-8 space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-purple-600"
          >
            Score: {score}
          </motion.div>
          <div className="text-xl font-semibold text-blue-600">
            Current Word: {currentWord}
          </div>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-medium text-green-600"
            >
              {message}
            </motion.div>
          )}
        </div>

        <div className="relative bg-white rounded-lg shadow-lg p-4">
          <div
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              position: 'relative',
              margin: '0 auto',
            }}
          >
            {letters.map((letter, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute text-xl font-bold text-blue-600"
                style={{
                  left: letter.position.x * CELL_SIZE,
                  top: letter.position.y * CELL_SIZE,
                }}
              >
                {letter.char}
              </motion.div>
            ))}
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                className="absolute bg-green-500 rounded-full"
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Use arrow keys to move the snake. Collect letters to form words!
          </p>
          <p className="text-sm text-gray-500">
            Valid words: {validWords.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordSnakeGame; 