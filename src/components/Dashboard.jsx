import React, { useState, useMemo, useRef } from 'react';
import { BookOpen, CheckSquare, Brain, Zap, Users, Target, Info, Calendar, Lightbulb, Check, X, Landmark } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { electionContent } from '../data/electionData';
import UpcomingElections from './UpcomingElections';

const Dashboard = ({ setMode, setModuleId }) => {
  const { points, level, streak, quizScores, lessonsCompleted, dailyChallengeCompleted, completeDailyChallenge } = useProgress();
  const progressPercent = Math.round(Math.min((points / level.max) * 100, 100));

  const challengeRef = useRef(null);
  const dailyQuestion = useMemo(() => {
    // Select a random question that remains stable for the session
    return electionContent.quizQuestions[Math.floor(Math.random() * electionContent.quizQuestions.length)];
  }, []);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChallengeSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === dailyQuestion.answer) {
      completeDailyChallenge(10);
    } else {
      completeDailyChallenge(0);
    }
  };

  const quickActions = [
    { id: 'learn', title: 'Learn Elections', subtitle: 'Understand the process step by step', icon: <BookOpen size={24} color="#883DFF" />, bg: 'rgba(136, 61, 255, 0.1)' },
    { id: 'guide', title: 'My Voting Guide', subtitle: 'Your personalized voting checklist', icon: <CheckSquare size={24} color="#138808" />, bg: 'rgba(19, 136, 8, 0.1)' },
    { id: 'quiz', title: 'Quiz Mode', subtitle: 'Test your knowledge and earn points', icon: <Brain size={24} color="#FF9933" />, bg: 'rgba(255, 153, 51, 0.1)' },
    { id: 'flashcards', title: 'Flashcards', subtitle: 'Quick revision made easy', icon: <Zap size={24} color="#3b82f6" />, bg: 'rgba(59, 130, 246, 0.1)' },
    { id: 'chat', title: 'Scenarios', subtitle: 'Real-life situations & learn', icon: <Users size={24} color="#0ea5e9" />, bg: 'rgba(14, 165, 233, 0.1)' }
  ];

  const handleSelect = (actionId) => {
    if (actionId === 'learn') {
      setModuleId('basics');
      setMode('learn');
    } else if (actionId === 'guide') {
      setMode('guide');
    } else {
      setMode(actionId);
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <h1 style={{ color: '#FF9933', fontSize: '2.5rem', marginBottom: '0.2rem' }}>Namaste! 👋</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-light)' }}>Ready to become an informed voter?</p>

      {/* Hero Card */}
      <div className="card hero-card mb-6" style={{ padding: '2rem 3rem' }}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#64748b' }}>Your Election Knowledge</h3>
            <Info size={16} color="#64748b" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>Level {level.number}</div>
            <div style={{ color: '#138808', fontWeight: 600, fontSize: '1.3rem' }}>{level.title}</div>
          </div>
          <div style={{ width: '350px', height: '10px', background: 'rgba(0,0,0,0.1)', borderRadius: '5px', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #FF9933, #138808, #2A56F6)' }}></div>
          </div>
          <p style={{ color: '#1e293b', fontWeight: 600, fontSize: '1rem' }}>You're {progressPercent}% election-ready! Keep going! 🚀</p>
        </div>
        <div className="flex items-center gap-8">
          <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ position: 'absolute', top: 8, left: 8, right: 8, bottom: 8, borderRadius: '50%', border: '8px solid #2A56F6', borderRightColor: '#e2e8f0', transform: `rotate(${45 + (progressPercent / 100) * 180}deg)` }}></div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', zIndex: 1, textAlign: 'center', lineHeight: 1 }}>{progressPercent}%<div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>Completed</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15, paddingRight: '1rem' }}>
             <Landmark size={120} color="#1e293b" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-left">
          {/* Quick Actions */}
          <div className="mb-6">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>Quick Actions</h3>
            <div className="quick-actions-grid">
              {quickActions.map(action => (
                <div key={action.id} className="action-card" onClick={() => handleSelect(action.id)}>
                  {action.badge && <span className="badge-new">{action.badge}</span>}
                  <div className="action-icon" style={{ background: action.bg }}>
                    {action.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{action.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{action.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {/* Upcoming Elections */}
            <UpcomingElections />

            {/* Your Progress */}
            <div className="card flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Target size={18} color="#FF9933" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>Your Progress</h3>
                <span onClick={() => setMode('progress')} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}>View Details</span>
              </div>
              <div className="progress-stats-grid">
                <div className="progress-stat-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={20} color="#3b82f6" />
                  </div>
                  <div className="font-bold text-white mt-2 text-lg">{lessonsCompleted}/20</div>
                  <div className="text-xs text-muted">Lessons Done</div>
                </div>
                <div className="progress-stat-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #883DFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brain size={20} color="#883DFF" />
                  </div>
                  <div className="font-bold text-white mt-2 text-lg">{quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0}%</div>
                  <div className="text-xs text-muted">Quiz Score Avg</div>
                </div>
                <div className="progress-stat-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#FF9933', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={22} color="white" />
                  </div>
                  <div className="font-bold text-white mt-2 text-lg">{streak}</div>
                  <div className="text-xs text-muted">Day Streak</div>
                </div>
                <div className="progress-stat-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#138808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={22} color="white" />
                  </div>
                  <div className="font-bold text-white mt-2 text-lg">{points}</div>
                  <div className="text-xs text-muted">Total Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-right" ref={challengeRef}>
          {/* Today's Challenge */}
          <div className="card h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Target size={18} color="#883DFF" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>Today's Challenge</h3>
            </div>
            
            {dailyChallengeCompleted ? (
              <div className="flex flex-col items-center justify-center flex-grow text-center" style={{ padding: '2rem 1rem' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(19, 136, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Check size={40} color="#138808" />
                </div>
                <h3 className="text-white text-xl mb-2">Challenge Completed!</h3>
                <p style={{ color: 'var(--text-muted)' }}>You've already tackled today's challenge. Come back tomorrow for a new one!</p>
              </div>
            ) : (
              <>
                <p className="font-bold text-white mb-6 text-lg">{dailyQuestion.question}</p>
                
                <div className="flex flex-col gap-3 mb-8 flex-grow">
                  {dailyQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === dailyQuestion.answer;
                    
                    let bgColor = 'rgba(0,0,0,0.2)';
                    let borderColor = 'rgba(255,255,255,0.1)';
                    let textColor = 'var(--text-muted)';
                    
                    if (isSubmitted) {
                      if (isCorrect) {
                        bgColor = 'rgba(19, 136, 8, 0.1)';
                        borderColor = '#138808';
                        textColor = 'white';
                      } else if (isSelected) {
                        bgColor = 'rgba(225, 29, 72, 0.1)';
                        borderColor = '#e11d48';
                        textColor = 'white';
                      }
                    } else if (isSelected) {
                      borderColor = '#883DFF';
                      bgColor = 'rgba(136, 61, 255, 0.1)';
                      textColor = 'white';
                    }

                    return (
                      <div 
                        key={idx}
                        onClick={() => !isSubmitted && setSelectedOption(idx)}
                        style={{ padding: '1rem', border: `1px solid ${borderColor}`, background: bgColor, borderRadius: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: isSubmitted ? 'default' : 'pointer', color: textColor, transition: 'all 0.2s' }}
                      >
                        <div style={{ width: 28, height: 28, borderRadius: '50%', border: isSubmitted && (isCorrect || isSelected) ? 'none' : `1px solid ${borderColor}`, background: isSubmitted && isCorrect ? '#138808' : isSubmitted && isSelected ? '#e11d48' : isSelected ? '#883DFF' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: isSelected || (isSubmitted && isCorrect) ? 'white' : 'var(--text-muted)' }}>
                          {['A', 'B', 'C', 'D'][idx]}
                        </div>
                        <span style={{ flexGrow: 1, fontWeight: isSelected || (isSubmitted && isCorrect) ? 500 : 400 }}>{opt}</span>
                        {isSubmitted && isCorrect && <Check size={20} color="#138808" />}
                        {isSubmitted && isSelected && !isCorrect && <X size={20} color="#e11d48" />}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div style={{ color: '#FF9933', fontWeight: 'bold' }}>+10 pts ⭐</div>
                  {!isSubmitted && (
                    <button 
                      className="btn" 
                      onClick={handleChallengeSubmit}
                      disabled={selectedOption === null}
                      style={{ background: selectedOption !== null ? '#883DFF' : 'rgba(136, 61, 255, 0.2)', color: '#fff', border: 'none', borderRadius: '2rem', opacity: selectedOption !== null ? 1 : 0.5 }}
                    >
                      Answer & Earn
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fun Fact Banner */}
      <div className="card mt-6" style={{ background: 'linear-gradient(90deg, rgba(42, 86, 246, 0.15) 0%, rgba(136, 61, 255, 0.15) 100%)', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 2rem', border: '1px solid rgba(136, 61, 255, 0.3)' }}>
        <div style={{ background: 'rgba(255, 153, 51, 0.2)', padding: '1rem', borderRadius: '50%' }}>
          <Lightbulb size={28} color="#FF9933" />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Did you know?</div>
          <div style={{ color: 'white', fontWeight: 500, fontSize: '1.1rem' }}>India is the world's largest democracy with over <span style={{ color: '#138808', fontWeight: 700 }}>969 million</span> registered voters!</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>👨‍👩‍👧‍👦</span>
          <span style={{ fontSize: '2.5rem' }}>🇮🇳</span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
