'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaGamepad, 
  FaHeart, 
  FaMicrophone, 
  FaRobot, 
  FaGraduationCap, 
  FaLanguage,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const features = [
    {
      icon: <FaGamepad className="text-4xl text-purple-500" />,
      title: "Gamified Learning",
      description: "Make learning fun with interactive games and challenges. Earn points, badges, and compete with friends!",
      link: "/game",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: "Mental Health Check-In",
      description: "Track your emotional well-being with daily check-ins and personalized wellness tips.",
      link: "/mental-health",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <FaMicrophone className="text-4xl text-blue-500" />,
      title: "Voice Assistant",
      description: "Get help anytime with our AI-powered voice assistant. Just speak your questions!",
      link: "/voice-assistant",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaRobot className="text-4xl text-green-500" />,
      title: "Personalized Assistant",
      description: "Your AI companion that adapts to your learning style and helps you achieve your goals.",
      link: "/assistant",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-yellow-500" />,
      title: "Career Path Agent",
      description: "Discover your ideal career path with personalized guidance and skill recommendations.",
      link: "/career",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaLanguage className="text-4xl text-indigo-500" />,
      title: "Multilingual Support",
      description: "Learn in your preferred language with support for multiple languages.",
      link: "/language-support",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10" />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Welcome to EduSmart
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your personalized learning journey powered by AI. Learn smarter, not harder.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Get Started
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white text-blue-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Discover Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={feature.link}>
                  <div className={`bg-gradient-to-br ${feature.color} p-1 rounded-2xl h-full`}>
                    <div className="bg-white rounded-xl p-6 h-full hover:shadow-xl transition-shadow">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-blue-500 font-medium">
                        Learn More
                        <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Assistant Demo */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Try Our Voice Assistant
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Experience the future of learning with our AI-powered voice assistant. Ask questions, get instant answers, and learn at your own pace.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white text-blue-500 p-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            {isMuted ? <FaVolumeMute className="text-4xl" /> : <FaVolumeUp className="text-4xl" />}
          </motion.button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Join thousands of students who are already learning smarter with EduSmart.
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Get Started Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
