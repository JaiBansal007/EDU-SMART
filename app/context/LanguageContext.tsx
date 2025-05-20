'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/DB/config';

// Define supported languages
export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिंदी',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية'
};

// Define translations
const translations = {
  en: {
    // Common
    'welcome': 'Welcome to EduSmart',
    'get_started': 'Get Started',
    'learn_more': 'Learn More',
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'profile': 'Profile',
    'settings': 'Settings',
    'sign_out': 'Sign Out',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'save': 'Save Changes',
    'cancel': 'Cancel',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'view': 'View',
    'edit': 'Edit',
    'delete': 'Delete',
    'confirm': 'Confirm',
    'close': 'Close',
    'open': 'Open',
    'yes': 'Yes',
    'no': 'No',

    // Navigation
    'home': 'Home',
    'dashboard': 'Dashboard',
    'courses': 'Courses',
    'games': 'Games',
    'mental_health': 'Mental Health',
    'voice_assistant': 'Voice Assistant',
    'language_support': 'Language Support',
    'career': 'Career',
    'assistant': 'Assistant',

    // Features
    'gamified_learning': 'Gamified Learning',
    'mental_health_check': 'Mental Health Check-In',
    'voice_assistant_desc': 'Voice Assistant',
    'personalized_assistant': 'Personalized Assistant',
    'career_path': 'Career Path Agent',
    'multilingual_support': 'Multilingual Support',

    // Settings
    'theme': 'Theme',
    'notifications': 'Notifications',
    'language': 'Language',
    'enable_push': 'Enable Push Notifications',
    'enable_email': 'Enable Email Notifications',
    'light_mode': 'Light',
    'dark_mode': 'Dark',
    'account_settings': 'Account Settings',
    'privacy_settings': 'Privacy Settings',
    'preferences': 'Preferences',
    'security': 'Security',
    'help': 'Help',
    'about': 'About',

    // Voice Assistant
    'voice_assistant_title': 'Voice Assistant',
    'start_listening': 'Start Listening',
    'stop_listening': 'Stop Listening',
    'speaking': 'Speaking...',
    'listening': 'Listening...',
    'ask_question': 'Ask a question',
    'voice_commands': 'Voice Commands',
    'voice_settings': 'Voice Settings',
    'voice_assistant_greeting': 'Hello! How can I help you today?',
    'voice_assistant_help': 'I can help you with your courses, mental health check-ins, and learning games. Just ask me about any of these topics.',
    'voice_assistant_courses': 'You can find your courses in the dashboard. Would you like me to take you there?',
    'voice_assistant_mental_health': 'I can help you with mental health check-ins. Would you like to start a check-in now?',
    'voice_assistant_games': 'We have several learning games available. Would you like to try one?',
    'voice_assistant_unknown': 'I\'m not sure I understand. Could you please rephrase that?',
    'you': 'You',

    // Dashboard
    'welcome_back': 'Welcome back',
    'user': 'User',
    'track_progress': 'Track your progress and continue learning',
    'current_courses': 'Current Courses',
    'completed_courses': 'Completed Courses',
    'achievements': 'Achievements',
    'learning_games': 'Learning Games',
    'learning_games_desc': 'Make learning fun with interactive games',
    'mental_health': 'Mental Health',
    'mental_health_desc': 'Track your emotional well-being',
    'ai_assistant': 'AI Assistant',
    'ai_assistant_desc': 'Get help from your AI learning companion',
    'recommendations': 'Recommendations',
    'continue_learning': 'Continue Learning',
    'view_all': 'View All',

    // Courses
    'course_details': 'Course Details',
    'course_progress': 'Course Progress',
    'course_materials': 'Course Materials',
    'course_discussion': 'Discussion',
    'course_assignments': 'Assignments',
    'course_quizzes': 'Quizzes',
    'course_certificate': 'Certificate',
    'enroll_now': 'Enroll Now',
    'start_course': 'Start Course',
    'continue_course': 'Continue Course',
    'complete_course': 'Complete Course',

    // Games
    'game_rules': 'Game Rules',
    'game_leaderboard': 'Leaderboard',
    'game_rewards': 'Rewards',
    'game_level': 'Level',
    'game_score': 'Score',
    'game_time': 'Time',
    'game_difficulty': 'Difficulty',
    'game_start': 'Start Game',
    'game_pause': 'Pause',
    'game_resume': 'Resume',
    'game_restart': 'Restart',
    'game_exit': 'Exit Game',

    // Mental Health
    'mood_tracker': 'Mood Tracker',
    'daily_check_in': 'Daily Check-in',
    'mental_health_resources': 'Resources',
    'meditation': 'Meditation',
    'breathing_exercises': 'Breathing Exercises',
    'stress_management': 'Stress Management',
    'wellness_tips': 'Wellness Tips',
    'professional_help': 'Professional Help',

    // Career
    'career_assessment': 'Career Assessment',
    'skill_analysis': 'Skill Analysis',
    'job_market': 'Job Market',
    'career_paths': 'Career Paths',
    'resume_builder': 'Resume Builder',
    'interview_prep': 'Interview Prep',
    'networking': 'Networking',
    'mentorship': 'Mentorship',

    // Footer
    'contact_us': 'Contact Us',
    'terms_of_service': 'Terms of Service',
    'privacy_policy': 'Privacy Policy',
    'cookie_policy': 'Cookie Policy',
    'accessibility': 'Accessibility',
    'sitemap': 'Sitemap',
    'follow_us': 'Follow Us',
    'newsletter': 'Newsletter',
    'subscribe': 'Subscribe',
    'footer_description': 'Empowering minds through innovative education and interactive learning experiences.',
    'quick_links': 'Quick Links',
    'resources': 'Resources',
    'blog': 'Blog',
    'tutorials': 'Tutorials',
    'faq': 'FAQ',
    'all_rights_reserved': 'All rights reserved.',

    // Puzzle Game
    'puzzle_game_title': 'Educational Term Matching Game',
    'puzzle_game_complete': 'Congratulations! You\'ve completed the game!',
    'play_again': 'Play Again',
    'score': 'Score',
    'puzzle_term_algorithm': 'Algorithm',
    'puzzle_def_algorithm': 'A step-by-step procedure for solving a problem or accomplishing a task',
    'puzzle_term_variable': 'Variable',
    'puzzle_def_variable': 'A container for storing data values in programming',
    'puzzle_term_function': 'Function',
    'puzzle_def_function': 'A reusable block of code that performs a specific task',
    'puzzle_term_loop': 'Loop',
    'puzzle_def_loop': 'A programming structure that repeats a sequence of instructions',

    // Math Quiz Game
    'math_quiz_title': 'Math Quiz Game',
    'math_quiz_correct': 'Correct! +10 points',
    'math_quiz_wrong': 'Wrong answer! Try again',
    'math_quiz_game_over': 'Game Over!',
    'final_score': 'Your final score',
    'time_left': 'Time Left',

    // Person Assistant
    'assistant_title': 'EduSmart Assistant',
    'assistant_greeting': 'Hi! I\'m your learning assistant. How can I help you today?',
    'find_game': 'Find a game',
    'get_help': 'Get help',

    // 3D Models
    '3d_models': 'Interactive 3D Models',
    'select_model': 'Select a Model',
    'dna_model': 'DNA Double Helix',
    'brain_model': 'Human Brain',
    'cell_model': 'Plant Cell',
    'interactive_3d': 'Interactive 3D Models',
    'explore_models': 'Explore our detailed 3D models to learn about biology and anatomy',
    'rotate_model': 'Click and drag to rotate',
    'zoom_model': 'Scroll to zoom in/out',
    'dna_description': 'Explore the structure of DNA with its double helix and base pairs',
    'brain_description': 'Study the human brain with its hemispheres and sulci',
    'cell_description': 'Discover the organelles and structure of a plant cell',

    // Homepage
    'welcome_description': 'Your personalized learning journey powered by AI. Learn smarter, not harder.',
    'watch_demo': 'Watch Demo',
    'discover_features': 'Discover Our Features',
    'ready_to_start': 'Ready to Start Your Learning Journey?',
    'join_thousands': 'Join thousands of students who are already learning smarter with EduSmart.',
    'active_students': 'Active Students',
    'user_rating': 'User Rating',
    'success_rate': 'Success Rate',
    'learning_paths': 'Learning Paths',
    'gamified_learning_desc': 'Make learning fun with interactive games and challenges. Earn points, badges, and compete with friends!',
    'mental_health_check_desc': 'Track your emotional well-being with daily check-ins and personalized wellness tips.',
    'voice_assistant_desc_long': 'Get help anytime with our AI-powered voice assistant. Just speak your questions!',
    'personalized_assistant_desc': 'Your AI companion that adapts to your learning style and helps you achieve your goals.',
    'career_path_desc': 'Discover your ideal career path with personalized guidance and skill recommendations.',
    'multilingual_support_desc': 'Learn in your preferred language with support for multiple languages.',
  },
  es: {
    // Common
    'welcome': 'Bienvenido a EduSmart',
    'get_started': 'Comenzar',
    'learn_more': 'Saber más',
    'sign_in': 'Iniciar sesión',
    'sign_up': 'Registrarse',
    'profile': 'Perfil',
    'settings': 'Configuración',
    'sign_out': 'Cerrar sesión',
    'loading': 'Cargando...',
    'error': 'Error',
    'success': 'Éxito',
    'save': 'Guardar cambios',
    'cancel': 'Cancelar',
    'back': 'Atrás',
    'next': 'Siguiente',
    'submit': 'Enviar',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'sort': 'Ordenar',
    'view': 'Ver',
    'edit': 'Editar',
    'delete': 'Eliminar',
    'confirm': 'Confirmar',
    'close': 'Cerrar',
    'open': 'Abrir',
    'yes': 'Sí',
    'no': 'No',

    // Navigation
    'home': 'Inicio',
    'dashboard': 'Panel',
    'courses': 'Cursos',
    'games': 'Juegos',
    'mental_health': 'Salud Mental',
    'voice_assistant': 'Asistente de Voz',
    'language_support': 'Soporte de Idiomas',
    'career': 'Carrera',
    'assistant': 'Asistente',

    // Features
    'gamified_learning': 'Aprendizaje Gamificado',
    'mental_health_check': 'Control de Salud Mental',
    'voice_assistant_desc': 'Asistente de Voz',
    'personalized_assistant': 'Asistente Personalizado',
    'career_path': 'Agente de Carrera',
    'multilingual_support': 'Soporte Multilingüe',

    // Settings
    'theme': 'Tema',
    'notifications': 'Notificaciones',
    'language': 'Idioma',
    'enable_push': 'Activar notificaciones push',
    'enable_email': 'Activar notificaciones por correo',
    'light_mode': 'Claro',
    'dark_mode': 'Oscuro',
    'account_settings': 'Configuración de cuenta',
    'privacy_settings': 'Configuración de privacidad',
    'preferences': 'Preferencias',
    'security': 'Seguridad',
    'help': 'Ayuda',
    'about': 'Acerca de',

    // Voice Assistant
    'voice_assistant_title': 'Asistente de Voz',
    'start_listening': 'Comenzar a escuchar',
    'stop_listening': 'Dejar de escuchar',
    'speaking': 'Hablando...',
    'listening': 'Escuchando...',
    'ask_question': 'Haz una pregunta',
    'voice_commands': 'Comandos de voz',
    'voice_settings': 'Configuración de voz',
    'voice_assistant_greeting': '¡Hola! ¿Cómo puedo ayudarte hoy?',
    'voice_assistant_help': 'Puedo ayudarte con tus cursos, controles de salud mental y juegos educativos. Solo pregúntame sobre cualquiera de estos temas.',
    'voice_assistant_courses': 'Puedes encontrar tus cursos en el panel. ¿Quieres que te lleve allí?',
    'voice_assistant_mental_health': 'Puedo ayudarte con los controles de salud mental. ¿Te gustaría comenzar uno ahora?',
    'voice_assistant_games': 'Tenemos varios juegos educativos disponibles. ¿Te gustaría probar uno?',
    'voice_assistant_unknown': 'No estoy seguro de entender. ¿Podrías reformular eso?',
    'you': 'Tú',

    // Dashboard
    'welcome_back': 'Bienvenido de nuevo',
    'user': 'Usuario',
    'track_progress': 'Sigue tu progreso y continúa aprendiendo',
    'current_courses': 'Cursos actuales',
    'completed_courses': 'Cursos completados',
    'achievements': 'Logros',
    'learning_games': 'Juegos educativos',
    'learning_games_desc': 'Haz que el aprendizaje sea divertido con juegos interactivos',
    'mental_health': 'Salud mental',
    'mental_health_desc': 'Sigue tu bienestar emocional',
    'ai_assistant': 'Asistente IA',
    'ai_assistant_desc': 'Obtén ayuda de tu compañero de aprendizaje IA',
    'recommendations': 'Recomendaciones',
    'continue_learning': 'Continuar aprendiendo',
    'view_all': 'Ver todo',

    // Courses
    'course_details': 'Detalles del curso',
    'course_progress': 'Progreso del curso',
    'course_materials': 'Materiales del curso',
    'course_discussion': 'Discusión',
    'course_assignments': 'Tareas',
    'course_quizzes': 'Cuestionarios',
    'course_certificate': 'Certificado',
    'enroll_now': 'Inscribirse ahora',
    'start_course': 'Comenzar curso',
    'continue_course': 'Continuar curso',
    'complete_course': 'Completar curso',

    // Games
    'game_rules': 'Reglas del juego',
    'game_leaderboard': 'Clasificación',
    'game_rewards': 'Recompensas',
    'game_level': 'Nivel',
    'game_score': 'Puntuación',
    'game_time': 'Tiempo',
    'game_difficulty': 'Dificultad',
    'game_start': 'Iniciar juego',
    'game_pause': 'Pausa',
    'game_resume': 'Reanudar',
    'game_restart': 'Reiniciar',
    'game_exit': 'Salir del juego',

    // Mental Health
    'mood_tracker': 'Seguimiento del estado de ánimo',
    'daily_check_in': 'Registro diario',
    'mental_health_resources': 'Recursos',
    'meditation': 'Meditación',
    'breathing_exercises': 'Ejercicios de respiración',
    'stress_management': 'Gestión del estrés',
    'wellness_tips': 'Consejos de bienestar',
    'professional_help': 'Ayuda profesional',

    // Career
    'career_assessment': 'Evaluación de carrera',
    'skill_analysis': 'Análisis de habilidades',
    'job_market': 'Mercado laboral',
    'career_paths': 'Trayectorias profesionales',
    'resume_builder': 'Constructor de CV',
    'interview_prep': 'Preparación para entrevistas',
    'networking': 'Networking',
    'mentorship': 'Mentoría',

    // Footer
    'contact_us': 'Contáctanos',
    'terms_of_service': 'Términos de servicio',
    'privacy_policy': 'Política de privacidad',
    'cookie_policy': 'Política de cookies',
    'accessibility': 'Accesibilidad',
    'sitemap': 'Mapa del sitio',
    'follow_us': 'Síguenos',
    'newsletter': 'Boletín',
    'subscribe': 'Suscribirse',
    'footer_description': 'Potenciando mentes a través de educación innovadora y experiencias de aprendizaje interactivas.',
    'quick_links': 'Enlaces rápidos',
    'resources': 'Recursos',
    'blog': 'Blog',
    'tutorials': 'Tutoriales',
    'faq': 'Preguntas frecuentes',
    'all_rights_reserved': 'Todos los derechos reservados.',

    // Puzzle Game
    'puzzle_game_title': 'Juego de Emparejamiento de Términos Educativos',
    'puzzle_game_complete': '¡Felicitaciones! ¡Has completado el juego!',
    'play_again': 'Jugar de nuevo',
    'score': 'Puntuación',
    'puzzle_term_algorithm': 'Algoritmo',
    'puzzle_def_algorithm': 'Un procedimiento paso a paso para resolver un problema o realizar una tarea',
    'puzzle_term_variable': 'Variable',
    'puzzle_def_variable': 'Un contenedor para almacenar valores de datos en programación',
    'puzzle_term_function': 'Función',
    'puzzle_def_function': 'Un bloque de código reutilizable que realiza una tarea específica',
    'puzzle_term_loop': 'Bucle',
    'puzzle_def_loop': 'Una estructura de programación que repite una secuencia de instrucciones',

    // Math Quiz Game
    'math_quiz_title': 'Juego de Matemáticas',
    'math_quiz_correct': '¡Correcto! +10 puntos',
    'math_quiz_wrong': '¡Respuesta incorrecta! Inténtalo de nuevo',
    'math_quiz_game_over': '¡Juego terminado!',
    'final_score': 'Tu puntuación final',
    'time_left': 'Tiempo restante',

    // Person Assistant
    'assistant_title': 'Asistente EduSmart',
    'assistant_greeting': '¡Hola! Soy tu asistente de aprendizaje. ¿Cómo puedo ayudarte hoy?',
    'find_game': 'Encontrar un juego',
    'get_help': 'Obtener ayuda',

    // 3D Models
    '3d_models': 'Modelos 3D Interactivos',
    'select_model': 'Seleccionar un Modelo',
    'dna_model': 'Doble Hélice de ADN',
    'brain_model': 'Cerebro Humano',
    'cell_model': 'Célula Vegetal',
    'interactive_3d': 'Modelos 3D Interactivos',
    'explore_models': 'Explora nuestros modelos 3D detallados para aprender sobre biología y anatomía',
    'rotate_model': 'Haz clic y arrastra para rotar',
    'zoom_model': 'Desplázate para acercar/alejar',
    'dna_description': 'Explora la estructura del ADN con su doble hélice y pares de bases',
    'brain_description': 'Estudia el cerebro humano con sus hemisferios y surcos',
    'cell_description': 'Descubre los orgánulos y la estructura de una célula vegetal',

    // Homepage
    'welcome_description': 'Tu viaje de aprendizaje personalizado impulsado por IA. Aprende más inteligentemente, no más difícil.',
    'watch_demo': 'Ver Demo',
    'discover_features': 'Descubre Nuestras Características',
    'ready_to_start': '¿Listo para Comenzar tu Viaje de Aprendizaje?',
    'join_thousands': 'Únete a miles de estudiantes que ya están aprendiendo más inteligentemente con EduSmart.',
    'active_students': 'Estudiantes Activos',
    'user_rating': 'Calificación de Usuario',
    'success_rate': 'Tasa de Éxito',
    'learning_paths': 'Rutas de Aprendizaje',
    'gamified_learning_desc': '¡Haz que el aprendizaje sea divertido con juegos y desafíos interactivos. ¡Gana puntos, insignias y compite con amigos!',
    'mental_health_check_desc': 'Sigue tu bienestar emocional con registros diarios y consejos de bienestar personalizados.',
    'voice_assistant_desc_long': '¡Obtén ayuda en cualquier momento con nuestro asistente de voz impulsado por IA. ¡Solo habla tus preguntas!',
    'personalized_assistant_desc': 'Tu compañero de IA que se adapta a tu estilo de aprendizaje y te ayuda a alcanzar tus objetivos.',
    'career_path_desc': 'Descubre tu trayectoria profesional ideal con orientación personalizada y recomendaciones de habilidades.',
    'multilingual_support_desc': 'Aprende en tu idioma preferido con soporte para múltiples idiomas.',
  },
  // Add more languages as needed...
};

type Language = keyof typeof languages;
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const fetchLanguage = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const savedLanguage = data.preferences?.language;
            if (savedLanguage && savedLanguage in languages) {
              setLanguageState(savedLanguage as Language);
            }
          }
        } catch (error) {
          console.error('Error fetching language preference:', error);
        }
      } else {
        // Try to get language from browser
        const browserLang = navigator.language.split('-')[0];
        if (browserLang in languages) {
          setLanguageState(browserLang as Language);
        }
      }
    };

    fetchLanguage();
  }, [user]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          'preferences.language': lang
        });
      } catch (error) {
        console.error('Error updating language preference:', error);
      }
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 