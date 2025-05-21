'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiMessageSquare, FiPlus, FiTrash2, FiMenu } from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const formatText = (text: string) => {
  // Handle bold text with ** or __
  const boldRegex = /(\*\*|__)(.*?)\1/g;
  return text.split(boldRegex).map((part, index) => {
    if (index % 3 === 1) { // This is the bold marker
      return null;
    }
    if (index % 3 === 2) { // This is the text to be bold
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};

export default function AssistantPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chats.length === 0) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
      };
      setChats([newChat]);
      setCurrentChat(newChat);
    }
  }, []);

  const simulateStreaming = (text: string) => {
    const words = text.split(/(\s+)/); // Split by whitespace but keep the spaces
    let index = 0;
    setStreamingText('');
    setIsGenerating(true);
    
    const stream = setInterval(() => {
      if (index < words.length) {
        setStreamingText(prev => prev + words[index]);
        index++;
      } else {
        clearInterval(stream);
        setStreamingText('');
        setIsGenerating(false);
      }
    }, 100); // Slower speed for word-by-word
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(chats[1] || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    const streamingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isStreaming: true,
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage, streamingMessage],
      title: currentChat.messages.length === 0 ? input.slice(0, 30) + '...' : currentChat.title,
    };

    setChats(prev => prev.map(chat => 
      chat.id === currentChat.id ? updatedChat : chat
    ));
    setCurrentChat(updatedChat);
    setInput('');
    setIsLoading(true);
    setError(null);
    setIsWaitingForResponse(true);

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC2b35I2Y_Rpw-AZDBIShvnGgrzmTKpoxI',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: input
              }]
            }]
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from Gemini');
      }

      const data = await response.json();
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      setIsWaitingForResponse(false);
      simulateStreaming(responseText);

      const finalChat = {
        ...updatedChat,
        messages: updatedChat.messages.map(msg => 
          msg.isStreaming 
            ? {
                ...msg,
                content: responseText,
                isStreaming: false,
              }
            : msg
        ),
      };

      setChats(prev => prev.map(chat => 
        chat.id === currentChat.id ? finalChat : chat
      ));
      setCurrentChat(finalChat);
    } catch (error) {
      console.error('Error fetching response from Gemini API:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching the response');
      const errorChat = {
        ...updatedChat,
        messages: updatedChat.messages.filter(msg => !msg.isStreaming),
      };
      setChats(prev => prev.map(chat => 
        chat.id === currentChat.id ? errorChat : chat
      ));
      setCurrentChat(errorChat);
    } finally {
      setIsLoading(false);
      setIsWaitingForResponse(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <motion.div
        initial={{ width: isSidebarOpen ? 300 : 0 }}
        animate={{ width: isSidebarOpen ? 300 : 0 }}
        className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-4">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
          >
            <FiPlus />
            <span>New Chat</span>
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                currentChat?.id === chat.id ? 'bg-blue-50 dark:bg-gray-700' : ''
              }`}
              onClick={() => setCurrentChat(chat)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Personal Assistant</h1>
          <div className="w-10" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <AnimatePresence>
            {currentChat?.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === 'user' ? (
                      <FiUser className="text-white" />
                    ) : (
                      <FiMessageSquare className="text-blue-500" />
                    )}
                    <span className="text-sm font-medium">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">
                    {message.isStreaming ? (
                      isWaitingForResponse ? (
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
                        </div>
                      ) : (
                        <>
                          {formatText(streamingText)}
                          <span className="inline-block w-2 h-4 ml-1 bg-gray-400 dark:bg-gray-500 animate-pulse" />
                        </>
                      )
                    ) : (
                      formatText(message.content)
                    )}
                  </div>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-700 dark:text-white shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                       hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-all duration-200 
                       flex items-center gap-2 shadow-md"
            >
              <FiSend />
              <span>{isLoading ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 