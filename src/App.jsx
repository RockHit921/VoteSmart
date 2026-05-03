import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GuidedLearning from './components/GuidedLearning';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import ChatAssistant from './components/ChatAssistant';
import MyVotingGuide from './components/MyVotingGuide';
import UserProfile from './components/UserProfile';
import Progress from './components/Progress';
import Updates from './components/Updates';
import { ProgressProvider } from './context/ProgressContext';

function App() {
  const [mode, setMode] = useState('menu'); // 'menu', 'learn', 'quiz', 'flashcards', 'chat', 'guide', 'profile', 'progress'
  const [moduleId, setModuleId] = useState(null); // 'basics', 'register', 'timeline'

  return (
    <ProgressProvider>
      <Layout setMode={setMode} activeMode={mode}>
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
      </Layout>
    </ProgressProvider>
  );
}

export default App;
