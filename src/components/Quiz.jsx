import React, { useState } from 'react';
import { Home, RefreshCw } from 'lucide-react';
import { electionContent } from '../data/electionData';
import { useProgress } from '../context/ProgressContext';

const Quiz = ({ setMode }) => {
  const { logActivity, addQuizScore } = useProgress();
  const { quizQuestions } = electionContent;
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = quizQuestions[currentQ];

  const handleSelect = (index) => {
    if (showExplanation) return; // Prevent multiple clicks
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === question.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(curr => curr + 1);
    } else {
      setQuizFinished(true);
      const finalScorePercentage = Math.round((score / quizQuestions.length) * 100);
      addQuizScore(finalScorePercentage);
      logActivity(`Completed an Election Quiz`, 50);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="glass-panel text-center animate-fade-in">
        <h2 style={{ color: 'var(--primary-color)', fontSize: '2rem' }}>Quiz Completed!</h2>
        <div style={{ fontSize: '4rem', margin: '2rem 0' }}>
          {score} / {quizQuestions.length}
        </div>
        <p className="mb-8" style={{ fontSize: '1.2rem' }}>
          {score === quizQuestions.length ? "Excellent! You know your stuff." : "Good job! Keep learning to improve."}
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn" onClick={handleRestart}>
            <RefreshCw size={18} /> Retry Quiz
          </button>
          <button className="btn btn-primary" onClick={() => setMode('menu')}>
            <Home size={18} /> Main Menu
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQ + 1) / quizQuestions.length) * 100;

  return (
    <div className="glass-panel animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Home size={20} />
        </button>
        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
          Question {currentQ + 1} of {quizQuestions.length}
        </span>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
          Score: {score}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: '1.5' }}>
        {question.question}
      </h3>

      <div className="flex flex-col gap-4 mb-8">
        {question.options.map((opt, idx) => {
          let className = "quiz-option";
          if (showExplanation) {
            if (idx === question.answer) className += " correct";
            else if (idx === selectedOption) className += " incorrect";
          }
          
          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleSelect(idx)}
              disabled={showExplanation}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="animate-fade-in p-4 rounded-xl bg-gray-800/50 border border-gray-700 mb-6" style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1rem' }}>
          <p style={{ margin: 0 }}>
            <strong>{selectedOption === question.answer ? "✅ Correct!" : "❌ Incorrect."}</strong><br/>
            {question.explanation}
          </p>
        </div>
      )}

      {showExplanation && (
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleNext}>
            {currentQ === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
