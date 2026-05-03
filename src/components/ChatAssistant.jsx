import React, { useState, useRef, useEffect } from 'react';
import { Home, Send, Bot, User } from 'lucide-react';

const ChatAssistant = ({ setMode }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! I am your Election Assistant. How can I help you understand the Indian election system today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // 1. Political Opinion -> Neutral Explanation
    if (/(opinion|who to vote for|best party|bjp|congress|aap|vote for|support)/.test(lowerQuery)) {
      return "As an educational assistant, I maintain a strict neutral stance. The choice of who to vote for is entirely yours. I recommend researching the manifestos of various parties, understanding their past work, and evaluating the candidates in your constituency before making an informed decision.";
    }

    // 2. Confused -> Simplify further
    if (/(confused|don't understand|simple|what does this mean|explain like i'm 5|dumb it down)/.test(lowerQuery)) {
      return "No worries, let's keep it very simple! Think of an election like choosing a class monitor, but for the whole country. You and other citizens (18+) vote for a person to represent your area. The group with the most representatives forms the government and makes the rules. You just need to register, get a Voter ID, and press a button on a machine on election day!";
    }

    // 3. Advanced -> Deeper insights
    if (/(advanced|details|deep insight|history|constitutional|article|amendment|law|act)/.test(lowerQuery)) {
      return "Certainly. Let's delve deeper. The Election Commission of India (ECI) derives its power from Article 324 of the Constitution. Important legislations include the Representation of the People Act, 1950 (which deals with the preparation of electoral rolls) and the Representation of the People Act, 1951 (which deals with the conduct of elections, qualifications, and disqualifications). Also, the 61st Amendment Act of 1988 lowered the voting age from 21 to 18.";
    }

    // General Responses
    if (/(evm|machine|how to vote)/.test(lowerQuery)) {
      return "You vote using an Electronic Voting Machine (EVM). It has buttons next to the candidates' names and symbols. You press the button of your choice, and a slip from the VVPAT machine will briefly show your vote to confirm it was recorded correctly.";
    }

    if (/(register|voter id|form 6)/.test(lowerQuery)) {
      return "To register to vote, you need to be an Indian citizen of 18 years or above. You must fill out Form 6 online via the ECI Voter Portal or offline. You'll need proof of age, address, and a photograph.";
    }

    // Fallback
    return "That's a great question! Elections in India are a massive democratic exercise managed by the Election Commission of India. If you have specific questions about voter registration, the voting process, or EVMs, feel free to ask!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    // Simulate network delay
    setTimeout(() => {
      const botResponse = generateResponse(userMessage);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <div className="flex justify-between items-center mb-4">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Home size={20} />
        </button>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          Election Assistant
        </span>
        <div style={{ width: '36px' }}></div> {/* Spacer for centering */}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', marginBottom: '1rem' }}>
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
            }}>
              {msg.sender === 'bot' && <Bot size={18} style={{ marginTop: '2px', flexShrink: 0 }} />}
              <span style={{ lineHeight: '1.4' }}>{msg.text}</span>
              {msg.sender === 'user' && <User size={18} style={{ marginTop: '2px', flexShrink: 0 }} />}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the Indian election..."
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #4a5568',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            outline: 'none',
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatAssistant;
