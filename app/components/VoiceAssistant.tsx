'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VoiceAssistantProps {
  onTranscript?: (text: string) => void;
}

const VoiceAssistant = ({ onTranscript }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          if (onTranscript) {
            onTranscript(transcript);
          }
          handleResponse(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          setError(`Error: ${event.error}`);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } else {
        setError('Speech recognition is not supported in your browser.');
      }

      // Initialize speech synthesis
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [onTranscript]);

  const handleResponse = async (text: string) => {
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll use a simple response
      const response = `I heard you say: "${text}". How can I help you with that?`;
      setResponse(response);
      speakResponse(response);
    } catch (err) {
      setError('Failed to get response');
    }
  };

  const speakResponse = (text: string) => {
    if (synthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthesisRef.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setError(null);
      setTranscript('');
      setResponse('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const toggleSpeaking = () => {
    if (synthesisRef.current) {
      if (isSpeaking) {
        synthesisRef.current.cancel();
      } else if (response) {
        speakResponse(response);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleListening}
          className={`p-6 rounded-full shadow-lg transition-colors ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isListening ? (
            <FaMicrophoneSlash className="text-4xl text-white" />
          ) : (
            <FaMicrophone className="text-4xl text-white" />
          )}
        </motion.button>

        <div className="w-full space-y-4">
          {transcript && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-2">You said:</h3>
              <p className="text-gray-800">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-500">Assistant:</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSpeaking}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
                </motion.button>
              </div>
              <p className="text-gray-800">{response}</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 text-center">
          {isListening 
            ? 'Listening...' 
            : 'Click the microphone to start speaking'}
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant; 