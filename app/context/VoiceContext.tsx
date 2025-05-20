'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

interface VoiceContextType {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
}

const VoiceContext = createContext<VoiceContextType>({
  isListening: false,
  transcript: '',
  startListening: () => {},
  stopListening: () => {},
  speak: () => {},
  isSpeaking: false,
});

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { showToast } = useToast();
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          showToast('error', 'Error with speech recognition');
          setIsListening(false);
        };

        setRecognition(recognition);
      }

      // Initialize speech synthesis
      if ('speechSynthesis' in window) {
        setSpeechSynthesis(window.speechSynthesis);
      }
    }
  }, [showToast]);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        showToast('success', 'Voice assistant is listening');
      } catch (error) {
        console.error('Error starting recognition:', error);
        showToast('error', 'Failed to start voice recognition');
      }
    } else {
      showToast('error', 'Speech recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      showToast('info', 'Voice assistant stopped listening');
    }
  };

  const speak = (text: string) => {
    if (speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        showToast('error', 'Error with speech synthesis');
      };

      speechSynthesis.speak(utterance);
    } else {
      showToast('error', 'Speech synthesis is not supported in your browser');
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        transcript,
        startListening,
        stopListening,
        speak,
        isSpeaking,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}; 