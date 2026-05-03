import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { ProgressProvider } from '../../context/ProgressContext';
import React from 'react';

// Mock ProgressProvider to avoid Firebase calls during unit tests
vi.mock('../../context/ProgressContext', async () => {
  const actual = await vi.importActual('../../context/ProgressContext');
  return {
    ...actual,
    useProgress: () => ({
      points: 100,
      level: { number: 1, title: 'Beginner', max: 200 },
      streak: 1,
      quizScores: [],
      lessonsCompleted: 0,
      dailyChallengeCompleted: false,
      completeDailyChallenge: vi.fn(),
    }),
  };
});

describe('Dashboard Component', () => {
  it('renders greeting and progress', () => {
    render(<Dashboard setMode={vi.fn()} setModuleId={vi.fn()} />);
    
    expect(screen.getByText(/Namaste/i)).toBeDefined();
    expect(screen.getByText(/Level 1/i)).toBeDefined();
    expect(screen.getByText(/Beginner/i)).toBeDefined();
  });

  it('renders quick action cards', () => {
    render(<Dashboard setMode={vi.fn()} setModuleId={vi.fn()} />);
    
    expect(screen.getByText('Learn Elections')).toBeDefined();
    expect(screen.getByText('Quiz Mode')).toBeDefined();
    expect(screen.getByText('Flashcards')).toBeDefined();
  });

  it('triggers navigation on quick action click', () => {
    const setModeMock = vi.fn();
    render(<Dashboard setMode={setModeMock} setModuleId={vi.fn()} />);
    
    const quizCard = screen.getByText('Quiz Mode').closest('.action-card');
    fireEvent.click(quizCard);
    
    expect(setModeMock).toHaveBeenCalledWith('quiz');
  });
});
