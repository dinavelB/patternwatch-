
import React, { useState, useEffect } from 'react';
import { AuthState, User, Partner } from './types';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TermsModal from './components/TermsModal';
import BindingSetup from './components/BindingSetup';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SIGN_UP);
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);

  // Persistence simulation
  useEffect(() => {
    const savedUser = localStorage.getItem('pw_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignUpComplete = (userData: User) => {
    setUser(userData);
    localStorage.setItem('pw_user', JSON.stringify(userData));
    setAuthState(AuthState.LOGIN);
  };

  const handleLoginComplete = () => {
    setAuthState(AuthState.TERMS);
  };

  const handleTermsAgree = () => {
    setAuthState(AuthState.SETUP);
  };

  const handleSetupComplete = (partnerData: Partner, pin: string) => {
    setPartner(partnerData);
    if (user) {
      const updatedUser = { ...user, pin };
      setUser(updatedUser);
      localStorage.setItem('pw_user', JSON.stringify(updatedUser));
    }
    setAuthState(AuthState.DASHBOARD);
  };

  const handleLogout = () => {
    setAuthState(AuthState.LOGIN);
    setPartner(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[#050505]">
      <div className="scanline"></div>
      
      <div className="w-full max-w-4xl z-10">
        {authState === AuthState.SIGN_UP && (
          <SignUp onComplete={handleSignUpComplete} />
        )}
        
        {authState === AuthState.LOGIN && (
          <Login onComplete={handleLoginComplete} />
        )}
        
        {authState === AuthState.TERMS && (
          <TermsModal onAgree={handleTermsAgree} onCancel={handleLogout} />
        )}
        
        {authState === AuthState.SETUP && user && (
          <BindingSetup user={user} onComplete={handleSetupComplete} />
        )}
        
        {authState === AuthState.DASHBOARD && user && partner && (
          <Dashboard 
            user={user} 
            partner={partner} 
            onLogout={handleLogout}
          />
        )}
      </div>

      <footer className="mt-8 text-[10px] text-zinc-600 font-mono text-center uppercase tracking-widest pointer-events-none">
        PatterWatch &copy; 2024 // Mutual Transparency Protocol // Encrypted Interface
      </footer>
    </div>
  );
};

export default App;
