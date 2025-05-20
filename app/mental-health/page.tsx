'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaSmile, FaMeh, FaFrown } from 'react-icons/fa';
import Link from 'next/link';

const moods = [
  { icon: <FaSmile className="text-4xl text-green-500" />, label: 'Great', value: 'great' },
  { icon: <FaMeh className="text-4xl text-yellow-500" />, label: 'Okay', value: 'okay' },
  { icon: <FaFrown className="text-4xl text-red-500" />, label: 'Not Good', value: 'not-good' },
];

const wellnessTips = [
  "Take a 5-minute break to practice deep breathing",
  "Stay hydrated throughout the day",
  "Take a short walk outside",
  "Practice gratitude by listing three things you're thankful for",
  "Connect with a friend or family member",
];

const MentalHealthPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowTips(true);
  };

  const handleSubmit = () => {
    // Here you would typically save the mood and journal entry
    console.log({ mood: selectedMood, journalEntry });
    // Reset form
    setSelectedMood(null);
    setJournalEntry('');
    setShowTips(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
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
          <div className="flex items-center gap-2">
            <FaHeart className="text-2xl text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800">Mental Health Check-In</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              How are you feeling today?
            </h2>
            <div className="flex justify-center gap-8 mb-8">
              {moods.map((mood) => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                    selectedMood === mood.value
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {mood.icon}
                  <span className="text-gray-600">{mood.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Journal Entry (Optional)
              </label>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="How are you feeling? What's on your mind?"
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!selectedMood}
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                selectedMood
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Submit Check-In
            </motion.button>
          </div>

          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Wellness Tips
              </h2>
              <ul className="space-y-3">
                {wellnessTips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <span className="w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage; 