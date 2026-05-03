import React, { useState, useRef, useEffect } from 'react';
import { Home, Send, Bot, User, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatAssistant = ({ setMode }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! I am your AI Election Assistant powered by Google Gemini. How can I help you understand the Indian election system today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize Gemini API
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!genAI) {
        throw new Error("Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are a neutral, helpful Indian Election Assistant. Your goal is to educate users about the Indian electoral process, voter registration, and democratic rights. Maintain a strict non-partisan stance. Do not endorse any political party or candidate. If asked for an opinion on a party, explain that your role is educational and suggest they research manifestos. Use simple, clear language. Use bullet points for complex explanations."
      });

      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const botResponse = response.text();
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError(err.message);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I apologize, but I encountered an error while processing your request. Please ensure your API key is valid and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '80vh' }} role="main" aria-label="Election AI Assistant">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="btn" 
          onClick={() => setMode('menu')} 
          style={{ padding: '0.5rem', borderRadius: '50%' }}
          aria-label="Back to Main Menu"
        >
          <Home size={20} />
        </button>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>
          Election Assistant
        </h2>
        <div style={{ width: '36px' }}></div>
      </div>

      <div 
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1rem', 
          background: 'rgba(0,0,0,0.2)', 
          borderRadius: '1rem', 
          marginBottom: '1rem' 
        }}
        aria-live="polite"
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '1rem'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '0.8rem 1.2rem',
              borderRadius: '1rem',
              backgroundColor: msg.sender === 'user' ? 'var(--primary-color)' : '#2d3748',
              color: 'white',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
              borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              {msg.sender === 'bot' && <Bot size={18} style={{ marginTop: '2px', flexShrink: 0 }} />}
              <div style={{ lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              {msg.sender === 'user' && <User size={18} style={{ marginTop: '2px', flexShrink: 0 }} />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
            <div className="pulse" style={{ padding: '0.8rem 1.2rem', borderRadius: '1rem', background: '#2d3748', color: 'white', display: 'flex', gap: '8px' }}>
              <Bot size={18} />
              <span>Thinking...</span>
            </div>
          </div>
        )}
        {error && (
          <div style={{ color: '#fc8181', fontSize: '0.85rem', textAlign: 'center', margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about voter registration, EVMs, or rights..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            outline: 'none',
          }}
          aria-label="Chat input"
        />
        <button 
          type="submit" 
          className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`} 
          style={{ padding: '0 1.5rem' }}
          disabled={isLoading}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;
