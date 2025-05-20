'use client';
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import { VoiceProvider } from '../context/VoiceContext';
import { LanguageProvider } from '../context/LanguageContext';
import VoiceAssistant from './VoiceAssistant';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <LanguageProvider>
          <VoiceProvider>
            {children}
            <VoiceAssistant />
          </VoiceProvider>
        </LanguageProvider>
      </ToastProvider>
    </AuthProvider>
  );
} 