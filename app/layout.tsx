import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/Navbar';
import GlobalChat from './components/GlobalChat';
import PageLayout from './components/PageLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDU-SMART",
  description: "Your AI-Powered Learning Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <Navbar />
          <PageLayout>
            <ClientLayout>{children}</ClientLayout>
          </PageLayout>
          <GlobalChat />
        </LoadingProvider>
      </body>
    </html>
  );
}
