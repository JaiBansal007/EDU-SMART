'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth, db } from '@/app/DB/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { 
  FaUser, 
  FaEnvelope, 
  FaCog, 
  FaGraduationCap, 
  FaTrophy,
  FaBook,
  FaChartLine,
  FaEdit,
  FaSave
} from 'react-icons/fa';

interface UserData {
  name: string;
  email: string;
  photoURL?: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
  progress: {
    completedCourses: string[];
    currentCourses: string[];
    achievements: string[];
  };
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        router.push('/auth/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setUserData(data);
          setEditedName(data.name);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!auth.currentUser || !userData) return;

    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        name: editedName
      });
      setUserData({ ...userData, name: editedName });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-red-500">Error loading profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                      <FaUser />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex items-center justify-between mb-8">
              {isEditing ? (
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaSave className="text-xl" />
                  </button>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {userData.name}
                </h1>
              )}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FaEnvelope />
                <span>{userData.email}</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaBook className="text-blue-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Current Courses
                  </h3>
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userData.progress.currentCourses.length}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaGraduationCap className="text-green-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Completed Courses
                  </h3>
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userData.progress.completedCourses.length}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaTrophy className="text-yellow-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Achievements
                  </h3>
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {userData.progress.achievements.length}
                </p>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <FaCog className="text-gray-500 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Preferences
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Theme</span>
                  <span className="text-gray-800 dark:text-white font-medium">
                    {userData.preferences.theme}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Notifications</span>
                  <span className="text-gray-800 dark:text-white font-medium">
                    {userData.preferences.notifications ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage; 