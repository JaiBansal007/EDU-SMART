import type { AppProps } from 'next/app';
import { ThemeProvider } from '../app/context/ThemeContext';
import { LanguageProvider } from '../app/context/LanguageContext';
import { AuthProvider } from '../app/context/AuthContext';
import { NotificationProvider } from '../app/context/NotificationContext';
import '../app/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
} 