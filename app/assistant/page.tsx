'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRobot, FaUser, FaPaperPlane, FaCog } from 'react-icons/fa';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const learningStyles = [
  { id: 'visual', label: 'Visual Learner', description: 'Learn best through images and spatial understanding' },
  { id: 'auditory', label: 'Auditory Learner', description: 'Learn best through listening and speaking' },
  { id: 'reading', label: 'Reading/Writing Learner', description: 'Learn best through reading and writing' },
  { id: 'kinesthetic', label: 'Kinesthetic Learner', description: 'Learn best through hands-on activities' },
];

const PersonalizedAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: `I understand you're asking about "${input}". Let me help you with that.`,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
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
            <FaRobot className="text-2xl text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800">Personalized Assistant</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Chat with Your AI Assistant
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaCog className="text-xl" />
              </motion.button>
            </div>

            {showPreferences && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Learning Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningStyles.map((style) => (
                    <motion.button
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        selectedStyle === style.id
                          ? 'bg-green-50 border-2 border-green-500'
                          : 'bg-white border border-gray-200 hover:border-green-500'
                      }`}
                    >
                      <h4 className="font-medium text-gray-800 mb-1">
                        {style.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {style.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${
                    message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'assistant' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {message.role === 'assistant' ? (
                      <FaRobot className="text-green-500" />
                    ) : (
                      <FaUser className="text-blue-500" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'assistant'
                      ? 'bg-green-50 text-gray-800'
                      : 'bg-blue-50 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className={`p-4 rounded-lg text-white ${
                  input.trim()
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedAssistantPage; 