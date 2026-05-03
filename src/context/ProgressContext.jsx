/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

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
  const [userId, setUserId] = useState('anonymous_user'); // Simplified for demo

  // Load data from Firebase on mount
  useEffect(() => {
    if (!db) return;
    
    const userDocRef = doc(db, "users", userId);
    
    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPoints(data.points || 0);
        setBadges(data.badges || []);
        setLessonsCompleted(data.lessonsCompleted || 0);
        setStreak(data.streak || 1);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  // Sync data to Firebase whenever points change
  const syncToCloud = async (newData) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, newData, { merge: true });
    } catch (error) {
      console.error("Firebase Sync Error:", error);
    }
  };

  // Level Logic
  const getLevel = () => {
    if (points >= 500) return { number: 3, title: 'Informed Voter', max: 1000 };
    if (points >= 200) return { number: 2, title: 'Learner', max: 500 };
    return { number: 1, title: 'Beginner', max: 200 };
  };

  const level = getLevel();

  const addPoints = (amount) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    syncToCloud({ points: newPoints });
  };

  const logActivity = (text, amount = 0) => {
    const newActivity = {
      id: Date.now() + Math.random(),
      text: text + (amount > 0 ? ` (+${amount} pts)` : ''),
      time: 'Just now',
      icon: <CheckCircle size={16} color="#138808" />
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10)); // Keep last 10 locally
    if (amount > 0) addPoints(amount);
  };

  const addQuizScore = (score) => {
    const newScores = [...quizScores, score];
    setQuizScores(newScores);
    
    let newBadges = [...badges];
    if (!badges.find(b => b.id === 'quiz')) {
       const newBadge = { id: 'quiz', title: 'First Quiz Ace', icon: 'Star', bg: 'rgba(255, 153, 51, 0.1)', date: 'Today' };
       newBadges.push(newBadge);
       setBadges(newBadges);
    }
    syncToCloud({ quizScores: newScores, badges: newBadges });
  };

  const incrementLesson = () => {
    const newVal = lessonsCompleted + 1;
    setLessonsCompleted(newVal);
    syncToCloud({ lessonsCompleted: newVal });
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
