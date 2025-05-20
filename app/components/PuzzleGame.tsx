'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Card {
  id: number;
  content: string;
  type: 'term' | 'definition';
  matched: boolean;
}

const PuzzleGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const educationalPairs = [
    {
      term: 'Algorithm',
      definition: 'A step-by-step procedure for solving a problem or accomplishing a task',
    },
    {
      term: 'Variable',
      definition: 'A container for storing data values in programming',
    },
    {
      term: 'Function',
      definition: 'A reusable block of code that performs a specific task',
    },
    {
      term: 'Loop',
      definition: 'A programming structure that repeats a sequence of instructions',
    },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newCards: Card[] = [];
    educationalPairs.forEach((pair, index) => {
      newCards.push(
        { id: index * 2, content: pair.term, type: 'term', matched: false },
        { id: index * 2 + 1, content: pair.definition, type: 'definition', matched: false }
      );
    });
    setCards(newCards.sort(() => Math.random() - 0.5));
  };

  const handleCardClick = (card: Card) => {
    if (selectedCards.length === 2 || card.matched) return;

    const newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      const isMatch = educationalPairs.some(
        (pair) =>
          (pair.term === first.content && pair.definition === second.content) ||
          (pair.term === second.content && pair.definition === first.content)
      );

      if (isMatch) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === first.id || c.id === second.id ? { ...c, matched: true } : c
          )
        );
        setScore((prev) => prev + 10);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameComplete(true);
    }
  }, [cards]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 text-blue-600"
        >
          Educational Term Matching Game
        </motion.h1>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-purple-600"
          >
            Score: {score}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card)}
              className={`p-4 rounded-lg cursor-pointer ${
                selectedCards.includes(card)
                  ? 'bg-blue-500 text-white'
                  : card.matched
                  ? 'bg-green-500 text-white'
                  : 'bg-white shadow-lg'
              }`}
            >
              <p className="text-center">{card.content}</p>
            </motion.div>
          ))}
        </div>

        {gameComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 text-center"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Congratulations! You've completed the game!
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={initializeGame}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame; 