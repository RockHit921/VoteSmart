import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import React from 'react';

describe('Sidebar Component', () => {
  it('renders all menu items', () => {
    render(<Sidebar setMode={vi.fn()} activeMode="menu" />);
    
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Learn')).toBeDefined();
    expect(screen.getByText('Quiz')).toBeDefined();
    expect(screen.getByText('Flashcards')).toBeDefined();
  });

  it('calls setMode when a menu item is clicked', () => {
    const setModeMock = vi.fn();
    render(<Sidebar setMode={setModeMock} activeMode="menu" />);
    
    const learnItem = screen.getByText('Learn');
    fireEvent.click(learnItem);
    
    expect(setModeMock).toHaveBeenCalledWith('learn');
  });

  it('highlights the active mode', () => {
    render(<Sidebar setMode={vi.fn()} activeMode="quiz" />);
    
    const quizItem = screen.getByText('Quiz').closest('li');
    expect(quizItem?.className).toContain('active');
  });

  it('has correct accessibility roles', () => {
    render(<Sidebar setMode={vi.fn()} activeMode="menu" />);
    
    expect(screen.getByRole('navigation')).toBeDefined();
    expect(screen.getByRole('menubar')).toBeDefined();
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBeGreaterThan(0);
  });
});
