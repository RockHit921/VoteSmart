import React, { useState, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import { ProgressProvider } from './context/ProgressContext';

// Lazy load components for better efficiency
const Dashboard = lazy(() => import('./components/Dashboard'));
const GuidedLearning = lazy(() => import('./components/GuidedLearning'));
const Quiz = lazy(() => import('./components/Quiz'));
const Flashcards = lazy(() => import('./components/Flashcards'));
const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const MyVotingGuide = lazy(() => import('./components/MyVotingGuide'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const Progress = lazy(() => import('./components/Progress'));
const Updates = lazy(() => import('./components/Updates'));

// Loading fallback component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <div className="pulse" style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>
      Loading Module...
    </div>
  </div>
);

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'learn', 'quiz', 'flashcards', 'chat', 'guide', 'profile', 'progress'
  const [moduleId, setModuleId] = useState(null); // 'basics', 'register', 'timeline'

  return (
    <ProgressProvider>
      <Layout setMode={setMode} activeMode={mode}>
        <Suspense fallback={<LoadingSpinner />}>
          {mode === 'menu' && (
            <Dashboard setMode={setMode} setModuleId={setModuleId} />
          )}
          
          {mode === 'learn' && (
            <GuidedLearning setMode={setMode} moduleId={moduleId || 'basics'} />
          )}

          {mode === 'quiz' && (
            <Quiz setMode={setMode} />
          )}

          {mode === 'flashcards' && (
            <Flashcards setMode={setMode} />
          )}

          {mode === 'chat' && (
            <ChatAssistant setMode={setMode} />
          )}

          {mode === 'guide' && (
            <MyVotingGuide setMode={setMode} />
          )}

          {mode === 'profile' && (
            <UserProfile />
          )}

          {mode === 'progress' && (
            <Progress setMode={setMode} />
          )}

          {mode === 'updates' && (
            <Updates setMode={setMode} />
          )}
        </Suspense>
      </Layout>
    </ProgressProvider>
  );
}

export default App;
