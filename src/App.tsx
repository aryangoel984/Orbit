import { useState } from 'react';
import { OrbitDashboard } from './components/orbit/OrbitDashboard';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';

type ViewState = 'landing' | 'login' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  // Optional: Store search query - handled via flow transition for now
  // const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (_query: string) => {
    // setSearchQuery(query);
    setCurrentView('login');
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="font-sans antialiased text-text-primary bg-orbit-950 min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <LandingPage onSearch={handleSearch} />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
            <LoginPage onLogin={handleLogin} />
          </motion.div>
        )}

        {currentView === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <OrbitDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
