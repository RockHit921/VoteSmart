import React from 'react';
import { Home, BookOpen, CheckSquare, Brain, Zap, Users, BarChart2, Bell, User } from 'lucide-react';

const Sidebar = ({ setMode, activeMode }) => {
  const menuItems = [
    { id: 'menu', label: 'Home', icon: <Home size={20} /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen size={20} /> },
    { id: 'guide', label: 'My Voting Guide', icon: <CheckSquare size={20} /> },
    { id: 'quiz', label: 'Quiz', icon: <Brain size={20} /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Zap size={20} /> },
    { id: 'chat', label: 'Scenarios', icon: <Users size={20} /> },
    { id: 'progress', label: 'Progress', icon: <BarChart2 size={20} /> },
    { id: 'updates', label: 'Updates', icon: <Bell size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-logo">
        <div style={{background: 'linear-gradient(135deg, var(--primary-color), var(--purple-color))', padding: '0.3rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CheckSquare size={16} color="white" aria-hidden="true" />
        </div>
        VoteSmart <span style={{color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'normal'}}>India</span>
      </div>

      <ul className="sidebar-menu" role="menubar">
        {menuItems.map(item => (
          <li 
            key={item.id} 
            className={`sidebar-item ${activeMode === item.id ? 'active' : ''}`}
            onClick={() => setMode(item.id)}
            onKeyDown={(e) => e.key === 'Enter' && setMode(item.id)}
            role="menuitem"
            tabIndex={0}
            aria-current={activeMode === item.id ? 'page' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>

      <div className="sidebar-bottom-card" role="complementary">
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }} aria-hidden="true">👆</div>
        <h4 className="font-bold text-white mb-2">Every Vote Shapes Tomorrow 🇮🇳</h4>
        <p className="text-xs">Be informed. Be ready. Be the change.</p>
      </div>
    </nav>
  );
};

export default Sidebar;
