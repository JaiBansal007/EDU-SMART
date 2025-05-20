'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRobot, FaArrowLeft, FaPlay, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeChallenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  testCases: {
    input: string;
    output: string;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hints: string[];
}

const codeChallenges: CodeChallenge[] = [
  {
    id: 1,
    title: "Reverse a String",
    description: "Write a function that takes a string as input and returns the string reversed.",
    initialCode: `function reverseString(str) {
  // Write your code here
  
}`,
    solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    testCases: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"world"', output: '"dlrow"' }
    ],
    difficulty: 'beginner',
    hints: [
      "Try using the split() method to convert the string to an array",
      "The reverse() method can help you reverse the array",
      "Finally, use join() to convert the array back to a string"
    ]
  },
  {
    id: 2,
    title: "Find the Missing Number",
    description: "Given an array of numbers from 1 to n with one number missing, find the missing number.",
    initialCode: `function findMissingNumber(arr) {
  // Write your code here
  
}`,
    solution: `function findMissingNumber(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`,
    testCases: [
      { input: '[1, 2, 4, 5]', output: '3' },
      { input: '[1, 3, 4, 5]', output: '2' }
    ],
    difficulty: 'intermediate',
    hints: [
      "The sum of numbers from 1 to n is n*(n+1)/2",
      "Calculate the sum of the given array",
      "The difference between the expected sum and actual sum is the missing number"
    ]
  }
];

const CodeGame = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [code, setCode] = useState(codeChallenges[0].initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(codeChallenges[currentChallenge].initialCode);
    setOutput([]);
    setShowHint(false);
    setCurrentHint(0);
  }, [currentChallenge]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    
    try {
      // Create a safe evaluation environment
      const safeEval = new Function('return ' + code)();
      
      // Run test cases
      const results = codeChallenges[currentChallenge].testCases.map(testCase => {
        try {
          const result = safeEval(eval(testCase.input));
          const expected = eval(testCase.output);
          const passed = result === expected;
          
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: JSON.stringify(result),
            passed
          };
        } catch (error) {
          return {
            input: testCase.input,
            expected: testCase.output,
            actual: 'Error: ' + error.message,
            passed: false
          };
        }
      });

      setOutput(results.map(result => 
        `Input: ${result.input}\nExpected: ${result.expected}\nActual: ${result.actual}\n${result.passed ? '✅ Passed' : '❌ Failed'}`
      ));

      // Check if all tests passed
      if (results.every(result => result.passed)) {
        setScore(score + 10);
        addChatMessage('assistant', 'Great job! All tests passed. Would you like to try the next challenge?');
      } else {
        addChatMessage('assistant', 'Some tests failed. Would you like a hint?');
      }
    } catch (error) {
      setOutput([`Error: ${error.message}`]);
      addChatMessage('assistant', 'There seems to be an error in your code. Would you like me to help you debug it?');
    }
    
    setIsRunning(false);
  };

  const showNextHint = () => {
    if (currentHint < codeChallenges[currentChallenge].hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHint(true);
  };

  const addChatMessage = (role: 'user' | 'assistant', content: string) => {
    setChatMessages(prev => [...prev, { role, content }]);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    setIsLoading(true);
    setError(null);
    addChatMessage('user', userMessage);
    setUserInput('');

    try {
      console.log('Sending chat request...');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatMessages, { role: 'user', content: userMessage }],
          currentChallenge: codeChallenges[currentChallenge],
          code,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json();
      console.log('Received chat response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      addChatMessage('assistant', data.response);
    } catch (error) {
      console.error('Chat Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect to AI assistant');
      addChatMessage('assistant', 'Sorry, I encountered an error. Please try again or check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/game">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              Back to Games
            </motion.button>
          </Link>
          <div className="text-xl font-bold text-gray-800">
            Score: {score}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaCode className="text-blue-500 text-2xl" />
                <h1 className="text-2xl font-bold text-gray-800">
                  {codeChallenges[currentChallenge].title}
                </h1>
              </div>
              <span className={`text-sm font-medium ${
                codeChallenges[currentChallenge].difficulty === 'beginner' ? 'text-green-500' :
                codeChallenges[currentChallenge].difficulty === 'intermediate' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {codeChallenges[currentChallenge].difficulty}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              {codeChallenges[currentChallenge].description}
            </p>

            <div className="mb-4">
              <textarea
                ref={editorRef}
                value={code}
                onChange={handleCodeChange}
                className="w-full h-48 p-4 font-mono text-sm bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <FaPlay />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={showNextHint}
                className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaCheck />
                Show Hint
              </button>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-gray-700">
                  {codeChallenges[currentChallenge].hints[currentHint]}
                </p>
              </motion.div>
            )}

            {output.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Output:</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  {output.map((line, index) => (
                    <pre key={index} className="text-sm text-gray-700 whitespace-pre-wrap">
                      {line}
                    </pre>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat Assistant Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <FaRobot className="text-blue-500 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">Edusmart Assistant</h2>
            </div>

            <div className="h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <FaRobot className="text-4xl mx-auto mb-4 text-blue-500" />
                    <p>Hello! I'm your Edusmart Assistant.</p>
                    <p className="text-sm mt-2">Ask me anything about the current challenge or coding concepts!</p>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask for help or hints..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaRobot />
                      Send
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGame; 