import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProgressProvider, useProgress } from '../ProgressContext';
import React from 'react';

const wrapper = ({ children }) => (
  <ProgressProvider>{children}</ProgressProvider>
);

describe('ProgressContext', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    
    expect(result.current.points).toBe(0);
    expect(result.current.level.number).toBe(1);
    expect(result.current.streak).toBe(1);
  });

  it('should add points correctly', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    
    act(() => {
      result.current.logActivity('Test Activity', 50);
    });

    expect(result.current.points).toBe(50);
  });

  it('should level up when points reach threshold', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    
    act(() => {
      result.current.logActivity('Big Activity', 250);
    });

    expect(result.current.level.number).toBe(2);
    expect(result.current.level.title).toBe('Learner');
  });

  it('should complete daily challenge', () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    
    act(() => {
      result.current.completeDailyChallenge(10);
    });

    expect(result.current.dailyChallengeCompleted).toBe(true);
    expect(result.current.points).toBe(10);
  });
});
