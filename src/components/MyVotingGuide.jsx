import React, { useState } from 'react';
import { Home, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Circle, MapPin, User, Calendar, FileText } from 'lucide-react';

const MyVotingGuide = ({ setMode }) => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [answers, setAnswers] = useState({
    age: '',
    state: 'Maharashtra',
    registered: null,
    voterId: null
  });

  const [checklist, setChecklist] = useState([]);
  const [expandedStep, setExpandedStep] = useState(null);

  const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"];

  const handleGenerate = (e) => {
    e.preventDefault();
    const age = parseInt(answers.age);
    if (isNaN(age)) return;

    let steps = [];
    
    if (age < 18) {
      steps = [
        {
          id: 'underage',
          title: 'Wait Until 18',
          explanation: 'You must be 18 years old to vote in India. Keep learning about the democratic process so you are ready when the time comes!',
          status: 'In Progress'
        }
      ];
    } else if (answers.registered === false) {
      steps = [
        { id: 'eligibility', title: 'Check Eligibility', explanation: 'Ensure you are an Indian citizen, 18+ years old, and a resident of your polling area.', status: 'Not Started' },
        { id: 'register', title: 'Register via Form 6 (NVSP)', explanation: 'Go to the National Voters Service Portal (voters.eci.gov.in) and fill out Form 6 to get on the electoral roll.', status: 'Not Started' },
        { id: 'upload', title: 'Upload Documents', explanation: 'You will need a passport-sized photo, proof of age (e.g., birth certificate), and proof of address (e.g., Aadhaar).', status: 'Not Started' },
        { id: 'track', title: 'Track Voter ID (EPIC)', explanation: 'Once registered, track your application status to know when your Voter ID card will be delivered.', status: 'Not Started' },
        { id: 'booth', title: 'Find Polling Booth', explanation: 'Use the ECI portal or Voter Helpline App to locate your designated polling booth.', status: 'Not Started' },
        { id: 'voting_day', title: 'Voting Day Instructions', explanation: 'Bring your Voter ID (or approved alternate ID), stand in line, verify your identity, and cast your vote on the EVM.', status: 'Not Started' }
      ];
    } else if (answers.registered === true && answers.voterId === false) {
      steps = [
        { id: 'track', title: 'Track Voter ID (EPIC)', explanation: 'Your name is on the list, but you need your EPIC card. Track its status or use an alternate ID (like Aadhaar) to vote.', status: 'Not Started' },
        { id: 'booth', title: 'Find Polling Booth', explanation: 'Use the ECI portal or Voter Helpline App to locate your designated polling booth.', status: 'Not Started' },
        { id: 'voting_day', title: 'Voting Day Instructions', explanation: 'Bring an approved alternate photo ID if your EPIC has not arrived, verify your identity, and cast your vote on the EVM.', status: 'Not Started' }
      ];
    } else if (answers.registered === true && answers.voterId === true) {
      steps = [
        { id: 'booth', title: 'Find Polling Booth', explanation: 'Use the ECI portal or Voter Helpline App to locate your designated polling booth in ' + answers.state + '.', status: 'Not Started' },
        { id: 'voting_day', title: 'Voting Day Instructions', explanation: 'Bring your Voter ID, verify your identity with the polling officer, and press the button on the EVM to cast your vote!', status: 'Not Started' }
      ];
    }

    setChecklist(steps);
    setOnboardingComplete(true);
  };

  const toggleStepStatus = (id) => {
    setChecklist(prev => prev.map(step => {
      if (step.id === id) {
        const nextStatus = step.status === 'Not Started' ? 'In Progress' : step.status === 'In Progress' ? 'Completed' : 'Not Started';
        return { ...step, status: nextStatus };
      }
      return step;
    }));
  };

  const completedCount = checklist.filter(s => s.status === 'Completed').length;
  const progressPercent = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0;

  if (!onboardingComplete) {
    return (
      <div className="card max-w-2xl mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="flex items-center gap-2 mb-6">
          <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
            <Home size={20} />
          </button>
          <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>My Voting Guide</h2>
        </div>
        
        <p className="mb-6 text-muted">Let's personalize your voting checklist. Please answer a few quick questions.</p>

        <form onSubmit={handleGenerate} className="flex flex-col gap-6">
          <div className="form-group">
            <label className="block mb-2 font-bold text-white"><User size={16} className="inline mr-2"/>What is your age?</label>
            <input 
              type="number" 
              required 
              min="1" max="120"
              value={answers.age} 
              onChange={e => setAnswers({...answers, age: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
            />
          </div>

          <div className="form-group">
            <label className="block mb-2 font-bold text-white"><MapPin size={16} className="inline mr-2"/>Which state do you live in?</label>
            <select 
              value={answers.state} 
              onChange={e => setAnswers({...answers, state: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
            >
              {states.map(state => <option key={state} value={state} style={{color: 'black'}}>{state}</option>)}
            </select>
          </div>

          {answers.age >= 18 && (
            <>
              <div className="form-group">
                <label className="block mb-2 font-bold text-white"><FileText size={16} className="inline mr-2"/>Are you registered to vote?</label>
                <div className="flex gap-4">
                  <button type="button" className={`btn ${answers.registered === true ? 'btn-primary' : ''}`} onClick={() => setAnswers({...answers, registered: true})}>Yes</button>
                  <button type="button" className={`btn ${answers.registered === false ? 'btn-primary' : ''}`} onClick={() => setAnswers({...answers, registered: false, voterId: false})}>No</button>
                </div>
              </div>

              {answers.registered === true && (
                <div className="form-group animate-fade-in">
                  <label className="block mb-2 font-bold text-white"><CheckCircle size={16} className="inline mr-2"/>Do you have a physical Voter ID card (EPIC)?</label>
                  <div className="flex gap-4">
                    <button type="button" className={`btn ${answers.voterId === true ? 'btn-primary' : ''}`} onClick={() => setAnswers({...answers, voterId: true})}>Yes</button>
                    <button type="button" className={`btn ${answers.voterId === false ? 'btn-primary' : ''}`} onClick={() => setAnswers({...answers, voterId: false})}>No</button>
                  </div>
                </div>
              )}
            </>
          )}

          <button 
            type="submit" 
            className="btn btn-primary mt-4" 
            disabled={!answers.age || (answers.age >= 18 && answers.registered === null) || (answers.registered === true && answers.voterId === null)}
          >
            Generate My Guide <ArrowRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="flex items-center gap-2 mb-6">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Home size={20} />
        </button>
        <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Your Personalized Checklist</h2>
      </div>

      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.1) 0%, rgba(42, 86, 246, 0.1) 100%)' }}>
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold text-white text-lg">Progress</div>
          <div className="font-bold" style={{ color: 'var(--secondary-color)' }}>{completedCount} / {checklist.length} Completed</div>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--secondary-color)', transition: 'width 0.3s' }}></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {checklist.map((step, index) => {
          const isExpanded = expandedStep === step.id;
          return (
            <div key={step.id} className="card" style={{ padding: '1rem' }}>
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => setExpandedStep(isExpanded ? null : step.id)}>
                <div onClick={(e) => { e.stopPropagation(); toggleStepStatus(step.id); }} style={{ cursor: 'pointer' }}>
                  {step.status === 'Completed' ? (
                    <CheckCircle size={28} color="var(--secondary-color)" />
                  ) : step.status === 'In Progress' ? (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid var(--primary-color)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                  ) : (
                    <Circle size={28} color="var(--text-muted)" />
                  )}
                </div>
                
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 'bold', color: step.status === 'Completed' ? 'var(--text-muted)' : 'white', textDecoration: step.status === 'Completed' ? 'line-through' : 'none', fontSize: '1.1rem' }}>
                    {index + 1}. {step.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: step.status === 'Completed' ? 'var(--secondary-color)' : step.status === 'In Progress' ? 'var(--primary-color)' : 'var(--text-muted)' }}>
                    Status: {step.status}
                  </div>
                </div>

                <div>
                  {isExpanded ? <ChevronUp size={24} color="var(--text-muted)" /> : <ChevronDown size={24} color="var(--text-muted)" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-700 animate-fade-in" style={{ borderTop: '1px solid var(--glass-border)', color: '#cbd5e1', lineHeight: '1.6' }}>
                  {step.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {progressPercent === 100 && (
        <div className="card mt-6 text-center animate-fade-in" style={{ background: 'rgba(19, 136, 8, 0.2)', border: '1px solid var(--secondary-color)' }}>
          <h3 className="text-white mb-2">🎉 You're Election Ready!</h3>
          <p className="text-sm text-gray-300">You've completed all the necessary steps. Make sure to cast your vote on election day and make your voice heard!</p>
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MyVotingGuide;
