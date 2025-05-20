'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import VoiceAssistant from '../components/VoiceAssistant';

const VoiceAssistantPage = () => {
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleTranscript = (text: string) => {
    setChatHistory(prev => [...prev, { role: 'user', content: text }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
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
            <FaRobot className="text-2xl text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Voice Assistant</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How to Use
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Click the microphone button to start speaking</li>
              <li>Speak clearly and wait for the assistant to respond</li>
              <li>Click the microphone again to stop listening</li>
              <li>Use the speaker button to replay the assistant's response</li>
            </ul>
          </div>

          <VoiceAssistant onTranscript={handleTranscript} />

          {chatHistory.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Chat History
              </h2>
              <div className="space-y-4">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-50 ml-4'
                        : 'bg-purple-50 mr-4'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </p>
                    <p className="text-gray-800">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPage; 