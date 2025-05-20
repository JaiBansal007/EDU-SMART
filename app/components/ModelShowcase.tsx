'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCube, FaHeart, FaSun, FaBone } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import ThreeDVisualization from './3DVisualization';

type ModelType = 'heart' | 'solar' | 'skeleton';

interface ModelOption {
  type: ModelType;
  icon: JSX.Element;
  label: string;
}

export default function ModelShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('solar');
  const { t } = useLanguage();

  const models: ModelOption[] = [
    {
      type: 'heart',
      icon: <FaHeart className="text-red-500" />,
      label: t('human_heart'),
    },
    {
      type: 'solar',
      icon: <FaSun className="text-yellow-500" />,
      label: t('solar_system'),
    },
    {
      type: 'skeleton',
      icon: <FaBone className="text-gray-500" />,
      label: t('human_skeleton'),
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
      >
        <FaCube className="text-blue-500" />
        <span className="text-gray-700 dark:text-gray-300">{t('3d_models')}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {t('select_model')}
              </h3>
              <div className="space-y-2">
                {models.map((model) => (
                  <button
                    key={model.type}
                    onClick={() => {
                      setSelectedModel(model.type);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedModel === model.type
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {model.icon}
                    <span className="text-gray-700 dark:text-gray-300">{model.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 border-t border-gray-200 dark:border-gray-700">
              <ThreeDVisualization modelType={selectedModel} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 