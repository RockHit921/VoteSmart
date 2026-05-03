import React from 'react';
import { Flame, Star } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const TopBar = ({ setMode }) => {
  const { streak, points, avatar } = useProgress();

  return (
    <div className="topbar">
      <div className="topbar-left">
      </div>
      <div className="topbar-right">
        <div className="topbar-stats">
          <div className="stat-item" style={{color: '#FF9933'}}>
            <Flame size={18} fill="#FF9933" />
            <div style={{lineHeight: 1.1}}>
              <div style={{fontWeight: 800, fontSize: '1rem', color: 'white'}}>{streak}</div>
              <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Day Streak</div>
            </div>
          </div>
          <div style={{width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem'}}></div>
          <div className="stat-item" style={{color: '#3b82f6'}}>
            <Star size={18} fill="#3b82f6" />
            <div style={{lineHeight: 1.1}}>
              <div style={{fontWeight: 800, fontSize: '1rem', color: 'white'}}>{points}</div>
              <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Points</div>
            </div>
          </div>
          <div style={{width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem'}}></div>
          <img 
            src={avatar === 'male' ? "/avatar_male.png" : "/avatar_female.png"} 
            alt="Profile" 
            onClick={() => setMode('profile')}
            style={{width: 36, height: 36, borderRadius: '50%', background: '#ffedd5', cursor: 'pointer', border: '2px solid transparent', transition: 'border 0.2s', objectFit: 'cover'}} 
            onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
