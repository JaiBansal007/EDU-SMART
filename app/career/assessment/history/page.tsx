'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/app/DB/config';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { format } from 'date-fns';
import Loader from '@/app/components/Loader';
import { useLoading } from '@/app/context/LoadingContext';

interface AssessmentResult {
  id: string;
  timestamp: any;
  result: {
    title: string;
    description: string;
    careers: Array<{
      title: string;
      description: string;
      skills: string[];
    }>;
  };
}

const AssessmentHistory = () => {
  const { user } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchAssessments = async () => {
      startLoading();
      if (!user) return;

      try {
        const assessmentsRef = collection(db, 'careerAssessments');
        const q = query(
          assessmentsRef,
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const assessmentData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AssessmentResult[];

        setAssessments(assessmentData);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        stopLoading();
      }
    };

    fetchAssessments();
  }, [startLoading, stopLoading, user]);

  if (assessments.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/career">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
            >
              <FaArrowLeft className="text-gray-600 dark:text-gray-300" />
            </motion.button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Assessment History
          </h1>
        </div>

        {assessments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FaChartLine className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No Assessments Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Take your first career assessment to see your results here.
            </p>
            <Link href="/career/assessment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Take Assessment
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {assessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {format(assessment.timestamp.toDate(), 'MMMM d, yyyy')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {assessment.result.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {assessment.result.description}
                </p>

                <div className="space-y-4">
                  {assessment.result.careers.map((career, careerIndex) => (
                    <div
                      key={careerIndex}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {career.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {career.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentHistory; 