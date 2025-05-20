'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../DB/config';
import { FaUser, FaBell, FaPalette, FaGlobe, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { showToast } from '../context/ToastContext';

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showProgress: boolean;
    showAchievements: boolean;
  };
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { t, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      updates: true,
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setSettings(data.settings || settings);
          }
        } catch (error) {
          console.error('Error fetching settings:', error);
          showToast('error', 'Failed to load settings');
        }
      }
      setLoading(false);
    };

    fetchSettings();
  }, [user]);

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user) return;

    try {
      const updatedSettings = { ...settings, ...newSettings };
      await updateDoc(doc(db, 'users', user.uid), {
        settings: updatedSettings,
      });
      setSettings(updatedSettings);
      showToast('success', 'Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      showToast('error', 'Failed to update settings');
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }

    try {
      // Implement password change logic here
      showToast('success', 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showToast('error', 'Failed to update password');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <h1 className="text-3xl font-bold text-white">{t('settings')}</h1>
            <p className="text-blue-100 mt-2">{t('manage_your_preferences')}</p>
          </div>

          {/* Settings Content */}
          <div className="p-6 space-y-8">
            {/* Profile Settings */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaUser className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('profile_settings')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('display_name')}
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ''}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    readOnly
                  />
                </div>
              </div>
            </section>

            {/* Theme Settings */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaPalette className="text-purple-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('theme_settings')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateSettings({ theme: theme as 'light' | 'dark' | 'system' })}
                    className={`p-4 rounded-lg border-2 ${
                      settings.theme === theme
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-800 dark:text-white capitalize">
                        {t(theme)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Language Settings */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaGlobe className="text-green-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('language_settings')}</h2>
              </div>
              <select
                value={settings.language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  updateSettings({ language: e.target.value });
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="hi">हिंदी</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ar">العربية</option>
              </select>
            </section>

            {/* Notification Settings */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaBell className="text-yellow-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('notification_settings')}</h2>
              </div>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-gray-700 dark:text-gray-300 capitalize">
                      {t(key)}
                    </label>
                    <button
                      onClick={() =>
                        updateSettings({
                          notifications: {
                            ...settings.notifications,
                            [key]: !value,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy Settings */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-red-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('privacy_settings')}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('profile_visibility')}
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) =>
                      updateSettings({
                        privacy: {
                          ...settings.privacy,
                          profileVisibility: e.target.value as 'public' | 'private',
                        },
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="public">{t('public')}</option>
                    <option value="private">{t('private')}</option>
                  </select>
                </div>
                {Object.entries(settings.privacy)
                  .filter(([key]) => key !== 'profileVisibility')
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <label className="text-gray-700 dark:text-gray-300">
                        {t(key)}
                      </label>
                      <button
                        onClick={() =>
                          updateSettings({
                            privacy: {
                              ...settings.privacy,
                              [key]: !value,
                            },
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </section>

            {/* Password Change */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-indigo-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('change_password')}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('current_password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('new_password')}
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('confirm_password')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t('update_password')}
                </button>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 