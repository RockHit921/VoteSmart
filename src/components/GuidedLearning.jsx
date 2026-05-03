import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { electionContent } from '../data/electionData';
import { useProgress } from '../context/ProgressContext';

const GuidedLearning = ({ setMode, moduleId }) => {
  const { logActivity, incrementLesson } = useProgress();
  const moduleData = electionContent.learningModules.find(m => m.id === moduleId);
  const [currentStep, setCurrentStep] = useState(0);

  if (!moduleData) return <div>Module not found.</div>;

  const step = moduleData.steps[currentStep];
  const isLast = currentStep === moduleData.steps.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStep(curr => curr + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleFinish = () => {
    logActivity(`Completed Learning Module: ${moduleData.title}`, 20);
    incrementLesson();
    setMode('menu');
  };

  const progress = ((currentStep + 1) / moduleData.steps.length) * 100;

  return (
    <div className="glass-panel animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Home size={20} />
        </button>
        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
          Step {currentStep + 1} of {moduleData.steps.length}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <h2 style={{ color: 'var(--primary-color)' }}>{moduleData.title}</h2>
      
      <div className="mt-8 mb-8" style={{ minHeight: '150px' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{step.title}</h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>{step.content}</p>
      </div>

      <div className="flex justify-between mt-8">
        <button 
          className="btn" 
          onClick={handlePrev} 
          disabled={currentStep === 0}
          style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        
        {!isLast ? (
          <button className="btn btn-primary" onClick={handleNext}>
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleFinish}>
            Finish & Return Home
          </button>
        )}
      </div>
    </div>
  );
};

export default GuidedLearning;
