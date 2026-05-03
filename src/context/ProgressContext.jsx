/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState([]);
  const [badges, setBadges] = useState([]);
  const [streak, setStreak] = useState(1);
  const [quizScores, setQuizScores] = useState([]);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [avatar, setAvatar] = useState('male');

  // Level Logic
  const getLevel = () => {
    if (points >= 500) return { number: 3, title: 'Informed Voter', max: 1000 };
    if (points >= 200) return { number: 2, title: 'Learner', max: 500 };
    return { number: 1, title: 'Beginner', max: 200 };
  };

  const level = getLevel();

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const logActivity = (text, amount = 0) => {
    const newActivity = {
      id: Date.now() + Math.random(),
      text: text + (amount > 0 ? ` (+${amount} pts)` : ''),
      time: 'Just now',
      icon: <CheckCircle size={16} color="#138808" />
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10)); // Keep last 10
    if (amount > 0) addPoints(amount);
  };

  const addQuizScore = (score) => {
    setQuizScores(prev => [...prev, score]);
    if (!badges.find(b => b.id === 'quiz')) {
       setBadges(prev => [...prev, { id: 'quiz', title: 'First Quiz Ace', icon: <Star size={24} color="#FF9933" />, bg: 'rgba(255, 153, 51, 0.1)', date: 'Today' }]);
    }
  };

  const incrementLesson = () => {
    setLessonsCompleted(prev => prev + 1);
  };

  const completeDailyChallenge = (pointsEarned) => {
    setDailyChallengeCompleted(true);
    if (pointsEarned > 0) {
      logActivity('Aced the Daily Challenge', pointsEarned);
    } else {
      logActivity('Attempted the Daily Challenge');
    }
  };

  const value = {
    points,
    level,
    activities,
    badges,
    streak,
    quizScores,
    lessonsCompleted,
    dailyChallengeCompleted,
    logActivity,
    addQuizScore,
    incrementLesson,
    completeDailyChallenge,
    avatar,
    setAvatar
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
