'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaSmile, FaMeh, FaFrown, FaAngry, FaSadTear } from 'react-icons/fa';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moods = [
  { id: 'happy', label: 'Happy', icon: <FaSmile className="text-2xl" />, color: 'text-yellow-400' },
  { id: 'calm', label: 'Calm', icon: <FaHeart className="text-2xl" />, color: 'text-green-400' },
  { id: 'neutral', label: 'Neutral', icon: <FaMeh className="text-2xl" />, color: 'text-blue-400' },
  { id: 'sad', label: 'Sad', icon: <FaSadTear className="text-2xl" />, color: 'text-gray-400' },
  { id: 'angry', label: 'Angry', icon: <FaAngry className="text-2xl" />, color: 'text-red-400' },
];

const tips = [
  "Take a moment to breathe and center yourself.",
  "Remember, it's okay not to be okay.",
  "Small steps lead to big changes.",
  "Your feelings are valid and important.",
  "Practice self-compassion today.",
  "Focus on what you can control.",
  "Celebrate your small victories.",
  "You are stronger than you think.",
];

const quotes = [
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Every day is a fresh start.",
  "You are capable of amazing things.",
  "Your potential is limitless.",
  "Make today amazing!",
  "You've got this!",
  "Small progress is still progress.",
];

const MentalHealthPage = () => {
  const [currentTip, setCurrentTip] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [showBreathing, setShowBreathing] = useState(true);
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: string }[]>([]);
  const [journalEntries, setJournalEntries] = useState<{ date: string; content: string }[]>([]);
  const [showJournal, setShowJournal] = useState(false);
  const [newJournalEntry, setNewJournalEntry] = useState('');

  useEffect(() => {
    // Set initial tip and quote
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Rotate tips and quotes every 10 seconds
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Breathing animation
    if (showBreathing) {
      const breathingInterval = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);

      return () => clearInterval(breathingInterval);
    }
  }, [showBreathing]);

  const handleMoodSelect = (mood: string) => {
    const newEntry = {
      date: new Date().toISOString(),
      mood,
    };
    setMoodHistory([...moodHistory, newEntry]);
  };

  const handleJournalSubmit = () => {
    if (newJournalEntry.trim()) {
      const newEntry = {
        date: new Date().toISOString(),
        content: newJournalEntry,
      };
      setJournalEntries([...journalEntries, newEntry]);
      setNewJournalEntry('');
    }
  };

  const moodChartData = {
    labels: moodHistory.slice(-30).map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood',
        data: moodHistory.slice(-30).map(entry => {
          const moodIndex = moods.findIndex(m => m.id === entry.mood);
          return moodIndex;
        }),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Back to Home
            </motion.button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Mental Wellness</h1>
        </div>

        <AnimatePresence>
          {showBreathing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Let's Take a Moment to Breathe</h2>
              <motion.div
                animate={{
                  scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 1,
                }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-semibold"
              >
                {breathingPhase === 'inhale' ? 'Inhale...' : breathingPhase === 'hold' ? 'Hold...' : 'Exhale...'}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBreathing(false)}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-8">
          {/* Tips and Quotes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Daily Inspiration</h2>
            <div className="space-y-4">
              <p className="text-gray-600 italic">"{currentQuote}"</p>
              <p className="text-purple-600 font-medium">{currentTip}</p>
            </div>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-6">How are you feeling today?</h2>
            <div className="grid grid-cols-5 gap-4 mb-8">
              {moods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-colors ${
                    mood.color
                  } hover:bg-opacity-10`}
                >
                  {mood.icon}
                  <span className="text-sm">{mood.label}</span>
                </motion.button>
              ))}
            </div>
            {moodHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Mood History (Last 30 Days)</h3>
                <Line data={moodChartData} />
              </div>
            )}
          </motion.div>

          {/* Journal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Journal</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJournal(!showJournal)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                {showJournal ? 'Hide Journal' : 'Show Journal'}
              </motion.button>
            </div>

            {showJournal && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <textarea
                    value={newJournalEntry}
                    onChange={(e) => setNewJournalEntry(e.target.value)}
                    placeholder="Write your thoughts here..."
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleJournalSubmit}
                    className="w-full p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Save Entry
                  </motion.button>
                </div>

                {journalEntries.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Past Entries</h3>
                    {journalEntries.map((entry, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">{entry.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage; 