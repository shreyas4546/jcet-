import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, BrainCircuit, Loader2, Settings2 } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

// Initialize Gemini API
const getAIHandle = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'undefined') {
    console.error('Gemini API Key is missing. AI Assistant will be disabled.');
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
    return null;
  }
};

const ai = getAIHandle();

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3.1-pro-preview');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the chat session with the selected model if API is available
    if (ai) {
      try {
        chatRef.current = ai.chats.create({
          model: selectedModel,
          config: {
            systemInstruction: 'You are an advanced AI assistant for Jain College of Engineering and Technology (JCET), Hubballi. You help prospective students with complex queries about admissions, courses, placements, and campus life. Be helpful, professional, and concise.',
            thinkingConfig: selectedModel === 'gemini-3.1-pro-preview' ? { thinkingLevel: ThinkingLevel.HIGH } : undefined
          }
        });
        
        // Reset messages when model changes
        setMessages([
          { role: 'model', text: `Hello! I am the JCET AI Assistant. I'm currently using the **${selectedModel === 'gemini-3-flash-preview' ? 'Fast (Flash)' : 'Complex (Pro)'}** model. How can I help you today?` }
        ]);
      } catch (err) {
        console.error('Failed to create chat session:', err);
        setMessages([
          { role: 'model', text: 'Sorry, the AI Assistant is currently unavailable. Please check the API configuration.' }
        ]);
      }
    } else {
      setMessages([
        { role: 'model', text: 'The AI Assistant is currently disabled because the GEMINI_API_KEY is missing or invalid. Please configure it in your environment variables.' }
      ]);
    }
  }, [selectedModel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error while processing your request. Please ensure the API key is configured.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)] z-50 hover:scale-105 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="text-sky-400" size={24} />
                  <h3 className="font-bold text-white">JCET AI Assistant</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              {/* Model Selection */}
              <div className="flex items-center gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                <Settings2 size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-medium">Model:</span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-cyan-400 font-medium focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="gemini-3-flash-preview" className="bg-[#0B0F1A] text-white">Fast Response (Flash)</option>
                  <option value="gemini-3.1-pro-preview" className="bg-[#0B0F1A] text-white">Complex Reasoning (Pro)</option>
                </select>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-tr-sm' : 'bg-white/10 text-gray-200 rounded-tl-sm'}`}>
                    {msg.role === 'model' ? (
                      <div className="markdown-body text-sm prose prose-invert max-w-none">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="animate-spin text-sky-400" size={16} />
                    <span className="text-sm">Thinking deeply...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a complex question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || !ai}
                  className="p-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
