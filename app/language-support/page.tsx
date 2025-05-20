'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaLanguage, FaExchangeAlt, FaVolumeUp, FaVolumeMute, FaSpinner, FaHistory, FaStar, FaBookmark, FaMicrophone, FaStop } from 'react-icons/fa';
import Link from 'next/link';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

interface TranslationHistory {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: Language;
  targetLanguage: Language;
  timestamp: Date;
  isFavorite: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', difficulty: 'Easy' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', difficulty: 'Easy' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', difficulty: 'Medium' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', difficulty: 'Medium' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', difficulty: 'Medium' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', difficulty: 'Medium' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', difficulty: 'Hard' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', difficulty: 'Hard' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', difficulty: 'Hard' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', difficulty: 'Hard' },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

const MultilingualSupportPage = () => {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(languages[0]);
  const [targetLanguage, setTargetLanguage] = useState<Language>(languages[1]);
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState<{ source: boolean; target: boolean }>({
    source: false,
    target: false,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'translate' | 'practice'>('translate');

  useEffect(() => {
    // Load translation history from localStorage
    const savedHistory = localStorage.getItem('translationHistory');
    if (savedHistory) {
      setTranslationHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(translatedText);
    setTranslatedText(text);
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLanguage: sourceLanguage.code,
          targetLanguage: targetLanguage.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedText(data.translatedText);

      // Save to history
      const newHistory: TranslationHistory = {
        id: Date.now().toString(),
        sourceText: text,
        translatedText: data.translatedText,
        sourceLanguage,
        targetLanguage,
        timestamp: new Date(),
        isFavorite: false,
      };

      const updatedHistory = [newHistory, ...translationHistory].slice(0, 10);
      setTranslationHistory(updatedHistory);
      localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeak = async (text: string, language: Language, type: 'source' | 'target') => {
    if (!text.trim()) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language.code;
      utterance.onstart = () => setSpeaking(prev => ({ ...prev, [type]: true }));
      utterance.onend = () => setSpeaking(prev => ({ ...prev, [type]: false }));
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Text-to-speech error:', err);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice input is not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = sourceLanguage.code;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };
    recognition.onerror = (event: any) => {
      setError('Voice recognition error: ' + event.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  const toggleFavorite = (id: string) => {
    const updatedHistory = translationHistory.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setTranslationHistory(updatedHistory);
    localStorage.setItem('translationHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
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
            <FaLanguage className="text-2xl text-purple-500" />
            <h1 className="text-2xl font-bold text-gray-800">Multilingual Support</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaHistory />
            History
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('translate')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'translate'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Translate
                  </button>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'practice'
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Practice
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSwapLanguages}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaExchangeAlt className="text-xl" />
                </motion.button>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{sourceLanguage.flag}</span>
                    <select
                      value={sourceLanguage.code}
                      onChange={(e) => {
                        const lang = languages.find((l) => l.code === e.target.value);
                        if (lang) setSourceLanguage(lang);
                      }}
                      className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.nativeName})
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSpeak(text, sourceLanguage, 'source')}
                        disabled={!text.trim() || speaking.source}
                        className={`p-2 rounded-lg ${
                          speaking.source
                            ? 'text-purple-500'
                            : text.trim()
                            ? 'text-gray-500 hover:text-gray-700'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {speaking.source ? <FaVolumeMute /> : <FaVolumeUp />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVoiceInput}
                        disabled={isRecording}
                        className={`p-2 rounded-lg ${
                          isRecording
                            ? 'text-red-500'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {isRecording ? <FaStop /> : <FaMicrophone />}
                      </motion.button>
                    </div>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{targetLanguage.flag}</span>
                    <select
                      value={targetLanguage.code}
                      onChange={(e) => {
                        const lang = languages.find((l) => l.code === e.target.value);
                        if (lang) setTargetLanguage(lang);
                      }}
                      className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.nativeName})
                        </option>
                      ))}
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSpeak(translatedText, targetLanguage, 'target')}
                      disabled={!translatedText.trim() || speaking.target}
                      className={`p-2 rounded-lg ${
                        speaking.target
                          ? 'text-purple-500'
                          : translatedText.trim()
                          ? 'text-gray-500 hover:text-gray-700'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {speaking.target ? <FaVolumeMute /> : <FaVolumeUp />}
                    </motion.button>
                  </div>
                  <div className="w-full h-40 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <FaSpinner className="animate-spin mr-2" />
                        Translating...
                      </div>
                    ) : (
                      translatedText || 'Translation will appear here...'
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTranslate}
                  disabled={!text.trim() || isTranslating}
                  className={`px-6 py-3 rounded-lg text-white flex items-center gap-2 ${
                    text.trim() && !isTranslating
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isTranslating ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Translating...
                    </>
                  ) : (
                    'Translate'
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Available Languages
              </h2>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <h3 className="font-medium text-gray-800">{lang.name}</h3>
                          <p className="text-sm text-gray-600">{lang.nativeName}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-sm ${difficultyColors[lang.difficulty!]}`}>
                        {lang.difficulty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Translation History
                  </h2>
                  <div className="space-y-4">
                    {translationHistory.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">
                              {item.sourceLanguage.flag} → {item.targetLanguage.flag}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(item.id)}
                            className={`p-1 rounded-full ${
                              item.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                            }`}
                          >
                            <FaStar />
                          </motion.button>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{item.sourceText}</p>
                        <p className="text-sm font-medium text-gray-800">{item.translatedText}</p>
                      </motion.div>
                    ))}
                    {translationHistory.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No translation history yet
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualSupportPage; 