import React from 'react';
import { BookOpen, Brain, Zap, Target, Home, Trophy, TrendingUp, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const Progress = ({ setMode }) => {
  const { points, streak, quizScores, lessonsCompleted, level, badges } = useProgress();
  
  const avgQuizScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
  const progressPercent = Math.round(Math.min((points / level.max) * 100, 100));

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '2rem' }}>
      <div className="flex items-center gap-4 mb-8">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
          <Home size={24} />
        </button>
        <div>
          <h2 style={{ margin: 0, color: 'white', fontSize: '2rem' }}>Your Progress Hub</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Track your journey to becoming an Informed Voter.</p>
        </div>
      </div>

      {/* Top Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card hover-glow" style={{ padding: '1.5rem', borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,0.2) 100%)' }}>
          <div className="flex justify-between items-center mb-4">
            <div style={{ color: 'var(--text-muted)' }}>Lessons Done</div>
            <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '0.5rem' }}>
              <BookOpen size={20} color="#3b82f6" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{lessonsCompleted}<span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>/20</span></div>
        </div>

        <div className="card hover-glow" style={{ padding: '1.5rem', borderLeft: '4px solid #883DFF', background: 'linear-gradient(135deg, rgba(136, 61, 255, 0.1) 0%, rgba(0,0,0,0.2) 100%)' }}>
          <div className="flex justify-between items-center mb-4">
            <div style={{ color: 'var(--text-muted)' }}>Quiz Avg</div>
            <div style={{ padding: '0.5rem', background: 'rgba(136, 61, 255, 0.2)', borderRadius: '0.5rem' }}>
              <Brain size={20} color="#883DFF" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{avgQuizScore}<span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>%</span></div>
        </div>

        <div className="card hover-glow" style={{ padding: '1.5rem', borderLeft: '4px solid #FF9933', background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(0,0,0,0.2) 100%)' }}>
          <div className="flex justify-between items-center mb-4">
            <div style={{ color: 'var(--text-muted)' }}>Day Streak</div>
            <div style={{ padding: '0.5rem', background: 'rgba(255, 153, 51, 0.2)', borderRadius: '0.5rem' }}>
              <Zap size={20} color="#FF9933" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{streak}</div>
        </div>

        <div className="card hover-glow" style={{ padding: '1.5rem', borderLeft: '4px solid #138808', background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.1) 0%, rgba(0,0,0,0.2) 100%)' }}>
          <div className="flex justify-between items-center mb-4">
            <div style={{ color: 'var(--text-muted)' }}>Total Points</div>
            <div style={{ padding: '0.5rem', background: 'rgba(19, 136, 8, 0.2)', borderRadius: '0.5rem' }}>
              <Target size={20} color="#138808" />
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{points}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {/* Main Content Area */}
        <div className="flex flex-col gap-6" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={24} color="#3b82f6" />
                <h3 className="text-white text-xl m-0">Level Progression</h3>
              </div>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div style={{ color: '#138808', fontWeight: 600, fontSize: '1.2rem', background: 'rgba(19, 136, 8, 0.1)', padding: '0.4rem 1rem', borderRadius: '2rem', display: 'inline-block', marginBottom: '0.5rem' }}>{level.title}</div>
                  <div style={{ color: 'var(--text-muted)' }}>Level {level.number}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{color: 'white', fontWeight: 'bold', fontSize: '1.5rem'}}>{progressPercent}%</span>
                </div>
              </div>

              <div style={{ width: '100%', height: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #FF9933, #138808, #2A56F6)', transition: 'width 1s ease-in-out' }}></div>
              </div>
              
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Earn <strong style={{color:'white'}}>{Math.max(level.max - points, 0)}</strong> more points to unlock the next rank!</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div className="flex items-center gap-3 mb-6">
                <Trophy size={24} color="#FF9933" />
                <h3 className="text-white text-xl m-0">Unlocked Badges</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                {badges.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)' }}>No badges unlocked yet. Start learning!</div>
                ) : badges.map(badge => (
                  <div key={badge.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: badge.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                      {badge.icon}
                    </div>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', lineHeight: 1.2 }}>{badge.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="card" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
           <div className="flex items-center gap-3 mb-6">
             <Award size={24} color="#883DFF" />
             <h3 className="text-white text-xl m-0">Recent Quizzes</h3>
           </div>
           
           {quizScores.length === 0 ? (
             <div style={{ padding: '2rem 1rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
               <Brain size={32} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
               <p className="text-sm m-0" style={{ color: 'var(--text-muted)' }}>You haven't taken any quizzes yet. Test your knowledge to earn points!</p>
             </div>
           ) : (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
               {quizScores.slice(-4).reverse().map((score, i) => (
                 <div key={i} className="flex justify-between items-center" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderLeft: `3px solid ${score >= 80 ? '#138808' : score >= 50 ? '#FF9933' : '#e11d48'}`, borderRadius: '0 0.5rem 0.5rem 0' }}>
                   <div>
                     <div style={{color: 'white', fontWeight: 'bold', fontSize: '0.95rem'}}>Quiz Attempt</div>
                     <div style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>Completed</div>
                   </div>
                   <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '1rem', color: 'white', fontWeight: 'bold' }}>{score}%</div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
