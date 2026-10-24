import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleUser } from '../types';

const AUTH_STORAGE_KEY = 'celebraite_google_user';
const GOOGLE_CLIENT_ID_KEY = 'celebraite_google_client_id';

interface AuthContextType {
  user: GoogleUser | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  googleClientId: string;
  setGoogleClientId: (id: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInWithGoogle: (customUser?: Partial<GoogleUser>) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [googleClientId, setGoogleClientIdState] = useState<string>(() => {
    try {
      return localStorage.getItem(GOOGLE_CLIENT_ID_KEY) || (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
    } catch {
      return '';
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const setGoogleClientId = (id: string) => {
    setGoogleClientIdState(id);
    if (id) {
      localStorage.setItem(GOOGLE_CLIENT_ID_KEY, id);
    } else {
      localStorage.removeItem(GOOGLE_CLIENT_ID_KEY);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signInWithGoogle = (customUser?: Partial<GoogleUser>) => {
    const newUser: GoogleUser = {
      id: customUser?.id || 'usr-' + Date.now(),
      name: customUser?.name || 'Mugunth',
      email: customUser?.email || 'mugunthking491@gmail.com',
      picture:
        customUser?.picture ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      givenName: customUser?.givenName || 'Mugunth',
      signedInAt: new Date().toISOString()
    };
    setUser(newUser);
    closeAuthModal();
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        googleClientId,
        setGoogleClientId,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
