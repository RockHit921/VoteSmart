import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { upcomingElections } from '../data/upcomingElections';

const UpcomingElections = () => {
  const [elections, setElections] = useState([]);
  const [now, setNow] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Sort elections by closest date
    const sorted = [...upcomingElections].sort((a, b) => new Date(a.date) - new Date(b.date));
    setElections(sorted);

    // Update 'now' every minute
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getCountdown = (targetDate) => {
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return { days: 0, hours: 0, mins: 0, passed: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);

    return { days, hours, mins, passed: false };
  };

  if (elections.length === 0) return null;

  // Determine how many elections to show based on expanded state (max 5)
  const displayedElections = isExpanded ? elections.slice(0, 5) : [elections[0]];

  return (
    <div className="card flex-1 flex flex-col" style={{ transition: 'all 0.3s ease-in-out' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} color="#883DFF" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>Upcoming Elections</h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem' }}
        >
          {isExpanded ? 'View Less' : 'View All'}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      <div className="flex flex-col gap-4 flex-grow">
        {displayedElections.map((election, index) => {
          const countdown = getCountdown(election.date);
          const formattedDate = new Date(election.date).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div key={election.id} className="flex flex-col gap-2" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', borderLeft: index === 0 ? '3px solid #883DFF' : '3px solid rgba(255,255,255,0.1)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '1rem' }}>
                    {election.state} {election.type}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Polling Date (Tentative)
                  </div>
                </div>
                
                {countdown.passed ? (
                  <div style={{ color: '#138808', fontWeight: 'bold', fontSize: '0.9rem', padding: '0.2rem 0.5rem', background: 'rgba(19,136,8,0.1)', borderRadius: '0.25rem' }}>Active</div>
                ) : (
                  <div className="flex gap-2">
                    <div className="text-center" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.5rem', borderRadius: '0.5rem' }}>
                      <div className="font-bold text-white text-md leading-none">{countdown.days}</div>
                      <div className="text-[10px]" style={{color: 'var(--text-muted)'}}>Days</div>
                    </div>
                    <div className="text-center" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.5rem', borderRadius: '0.5rem' }}>
                      <div className="font-bold text-white text-md leading-none">{countdown.hours}</div>
                      <div className="text-[10px]" style={{color: 'var(--text-muted)'}}>Hrs</div>
                    </div>
                    <div className="text-center" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.3rem 0.5rem', borderRadius: '0.5rem' }}>
                      <div className="font-bold text-white text-md leading-none">{countdown.mins}</div>
                      <div className="text-[10px]" style={{color: 'var(--text-muted)'}}>Min</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={12} color="#883DFF" /> {formattedDate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingElections;
