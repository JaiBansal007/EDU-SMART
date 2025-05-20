'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '@/app/context/VoiceContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { FaMicrophone, FaMicrophoneSlash, FaRobot, FaTimes } from 'react-icons/fa';

const VoiceAssistant = () => {
  const { isListening, transcript, startListening, stopListening, speak, isSpeaking } = useVoice();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState('');

  const handleCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simple command handling
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      speak(t('voice_assistant_greeting'));
      setResponse(t('voice_assistant_greeting'));
    } else if (lowerCommand.includes('help')) {
      speak(t('voice_assistant_help'));
      setResponse(t('voice_assistant_help'));
    } else if (lowerCommand.includes('courses')) {
      speak(t('voice_assistant_courses'));
      setResponse(t('voice_assistant_courses'));
    } else if (lowerCommand.includes('mental health')) {
      speak(t('voice_assistant_mental_health'));
      setResponse(t('voice_assistant_mental_health'));
    } else if (lowerCommand.includes('games')) {
      speak(t('voice_assistant_games'));
      setResponse(t('voice_assistant_games'));
    } else {
      speak(t('voice_assistant_unknown'));
      setResponse(t('voice_assistant_unknown'));
    }
  };

  useEffect(() => {
    if (transcript && !isSpeaking) {
      handleCommand(transcript);
    }
  }, [transcript, isSpeaking]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-600 transition-colors"
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* Assistant Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {t('voice_assistant_title')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              {/* Transcript Display */}
              {transcript && (
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{t('you')}:</span> {transcript}
                  </p>
                </div>
              )}

              {/* Response Display */}
              {response && (
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{t('assistant')}:</span> {response}
                  </p>
                </div>
              )}

              {/* Voice Control Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors`}
              >
                {isListening ? (
                  <>
                    <FaMicrophoneSlash />
                    {t('stop_listening')}
                  </>
                ) : (
                  <>
                    <FaMicrophone />
                    {t('start_listening')}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant; 