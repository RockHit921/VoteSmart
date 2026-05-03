import React, { useState } from 'react';
import { Home, ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';
import { electionContent } from '../data/electionData';
import { useProgress } from '../context/ProgressContext';

const Flashcards = ({ setMode }) => {
  const { logActivity } = useProgress();
  const originalCards = electionContent.flashcards;
  const [cards, setCards] = useState([...originalCards]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[currentIdx];

  const handleNext = () => {
    setFlipped(false);
    logActivity('Reviewed a Flashcard', 2);
    setTimeout(() => {
      if (currentIdx < cards.length - 1) setCurrentIdx(curr => curr + 1);
      else setCurrentIdx(0); // loop back
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx > 0) setCurrentIdx(curr => curr - 1);
    }, 150);
  };

  const handleShuffle = () => {
    setFlipped(false);
    setTimeout(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIdx(0);
    }, 150);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ textAlign: 'center' }}>
      <div className="flex justify-between items-center mb-6">
        <button className="btn" onClick={() => setMode('menu')} style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Home size={20} />
        </button>
        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
          Card {currentIdx + 1} of {cards.length}
        </span>
        <button className="btn" onClick={handleShuffle} style={{ padding: '0.5rem', borderRadius: '50%' }} title="Shuffle">
          <Shuffle size={20} />
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-400">Click card to flip</p>

      <div className="flashcard-container">
        <div 
          className={`flashcard ${flipped ? 'flipped' : ''}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="flashcard-front">
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{card.front}</h3>
          </div>
          <div className="flashcard-back">
            <p style={{ fontSize: '1.2rem', margin: 0, color: '#fff' }}>{card.back}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button 
          className="btn" 
          onClick={handlePrev} 
          disabled={currentIdx === 0}
          style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
        >
          <ArrowLeft size={18} /> Prev
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
