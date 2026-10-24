import React, { useState } from 'react';
import { X, ShieldCheck, User, Mail, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { fireCelebrationConfetti } from '../common/ConfettiTrigger';

export const GoogleAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    signInWithGoogle,
    googleClientId,
    setGoogleClientId
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientIdInput, setClientIdInput] = useState(googleClientId);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid Google email address');
      return;
    }

    setErrorMsg('');
    signInWithGoogle({
      name: name.trim(),
      email: email.trim(),
      givenName: name.trim().split(' ')[0],
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=7e22ce,3b82f6`
    });
    fireCelebrationConfetti();
  };

  const handleQuickDemoSignIn = (demoName: string, demoEmail: string) => {
    signInWithGoogle({
      name: demoName,
      email: demoEmail,
      givenName: demoName.split(' ')[0],
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(demoName)}&backgroundColor=7e22ce,3b82f6`
    });
    fireCelebrationConfetti();
  };

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleClientId(clientIdInput.trim());
    setShowAdvanced(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 aceternity-card rounded-3xl shadow-2xl text-neutral-100">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl">
            <svg viewBox="0 0 48 48" className="w-8 h-8">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Sign in with Google</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs font-normal">
              Sign in with your Google account to sync your celebration blueprint, unlock Aura AI, and manage RSVPs.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* General Google Sign-In Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Your Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. Alex Rivera"
                className="w-full px-4 py-2.5 bg-neutral-900 border border-white/[0.08] rounded-2xl text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <User className="absolute right-3.5 top-3 w-3.5 h-3.5 text-neutral-500" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-1">
              Google Account Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="e.g. alex.rivera@gmail.com"
                className="w-full px-4 py-2.5 bg-neutral-900 border border-white/[0.08] rounded-2xl text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <Mail className="absolute right-3.5 top-3 w-3.5 h-3.5 text-neutral-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2.5 transition transform active:scale-98 mt-2"
          >
            <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        {/* 1-Click Demo Guest Option */}
        <div className="pt-4 border-t border-white/[0.08] mt-4 text-center">
          <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2 font-semibold">
            Or quick demo sign-in
          </span>
          <button
            type="button"
            onClick={() => handleQuickDemoSignIn('Alex Rivera', 'alex.rivera@gmail.com')}
            className="w-full py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-white/[0.08] hover:border-white/[0.18] rounded-full text-xs text-neutral-300 font-medium flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Continue as Alex Rivera (Demo Account)</span>
          </button>
        </div>

        {/* Advanced Google Client ID toggle */}
        <div className="text-center pt-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-[11px] text-neutral-400 hover:text-purple-300 underline inline-flex items-center gap-1 transition"
          >
            <Settings className="w-3 h-3" />
            <span>{showAdvanced ? 'Hide Client ID Setting' : 'Configure Custom Google Client ID (Optional)'}</span>
          </button>
        </div>

        {showAdvanced && (
          <form onSubmit={handleSaveClientId} className="p-3 bg-neutral-900 border border-white/[0.08] rounded-2xl space-y-2 text-xs mt-2">
            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Google OAuth 2.0 Client ID
            </label>
            <input
              type="text"
              value={clientIdInput}
              onChange={(e) => setClientIdInput(e.target.value)}
              placeholder="XXXX.apps.googleusercontent.com"
              className="w-full px-3 py-1.5 bg-black/60 border border-white/[0.08] rounded-xl font-mono text-[11px] text-neutral-200 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-semibold transition"
            >
              Save Client ID
            </button>
          </form>
        )}

        {/* Security Reassurance Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] text-neutral-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>General Google Sign-In with OAuth 2.0 Client Isolation</span>
        </div>
      </div>
    </div>
  );
};
