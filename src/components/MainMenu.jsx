import React from 'react';
import { BookOpen, CheckSquare, Calendar, Brain, Zap, MessageCircle } from 'lucide-react';

const MainMenu = ({ setMode, setModuleId }) => {
  const options = [
    {
      id: 'basics',
      mode: 'learn',
      title: 'How elections work in India',
      description: 'A beginner-friendly overview',
      icon: <BookOpen size={24} color="white" />
    },
    {
      id: 'register',
      mode: 'learn',
      title: 'How to register and vote',
      description: 'Your step-by-step voting checklist',
      icon: <CheckSquare size={24} color="white" />
    },
    {
      id: 'timeline',
      mode: 'learn',
      title: 'Election timeline and process',
      description: 'From announcement to counting day',
      icon: <Calendar size={24} color="white" />
    },
    {
      id: 'quiz',
      mode: 'quiz',
      title: 'Test my knowledge',
      description: 'Quiz mode! 🧠',
      icon: <Brain size={24} color="white" />
    },
    {
      id: 'flashcards',
      mode: 'flashcards',
      title: 'Quick revision',
      description: 'Flashcards ⚡',
      icon: <Zap size={24} color="white" />
    },
    {
      id: 'chat',
      mode: 'chat',
      title: 'Chat Assistant',
      description: 'Ask me anything! 🤖',
      icon: <MessageCircle size={24} color="white" />
    }
  ];

  const handleSelect = (option) => {
    if (option.mode === 'learn') {
      setModuleId(option.id);
    }
    setMode(option.mode);
  };

  return (
    <div className="glass-panel text-center">
      <h1 style={{ color: 'var(--primary-color)' }}>Namaste! 🙏</h1>
      <p className="mb-8">
        Welcome to your personal guide to the Indian election system. 
        What would you like to explore today?
      </p>

      <div className="flex flex-col gap-4">
        {options.map((opt, index) => (
          <div 
            key={index} 
            className="menu-item"
            onClick={() => handleSelect(opt)}
          >
            <div className="menu-icon">
              {opt.icon}
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{opt.title}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
                {opt.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
