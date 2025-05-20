import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PersonAssistant from "./components/PersonAssistant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduSmart - Interactive Learning Platform",
  description: "Learn through interactive games and challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <PersonAssistant />
        </div>
      </body>
    </html>
  );
}
