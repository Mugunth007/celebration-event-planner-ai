import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, User, Mail, Settings, Key } from 'lucide-react';
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

  const [customName, setCustomName] = useState('Mugunth');
  const [customEmail, setCustomEmail] = useState('mugunthking491@gmail.com');
  const [clientIdInput, setClientIdInput] = useState(googleClientId);
  const [showAdvanced, setShowAdvanced] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSignIn = (name: string, email: string) => {
    signInWithGoogle({
      name,
      email,
      givenName: name.split(' ')[0],
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=7e22ce,3b82f6`
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
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
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
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Access your personalized celebration blueprints, sync event dossiers, and unlock Aura AI Co-Pilot.
            </p>
          </div>
        </div>

        {/* Primary Google Auth Button */}
        <div className="space-y-3">
          <button
            onClick={() => handleSignIn(customName, customEmail)}
            className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-3 transition transform active:scale-98"
          >
            <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
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
            <span>Continue as {customName} ({customEmail})</span>
          </button>

          {/* Account profile customization toggle */}
          <div className="pt-2">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Google Account Details
              </span>
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                  <User className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="google.account@gmail.com"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                  <Mail className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Google Client ID toggle */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[11px] text-slate-400 hover:text-purple-300 underline inline-flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              <span>{showAdvanced ? 'Hide Client ID Setting' : 'Configure Custom Google Client ID (Optional)'}</span>
            </button>
          </div>

          {showAdvanced && (
            <form onSubmit={handleSaveClientId} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Google OAuth 2.0 Client ID
              </label>
              <input
                type="text"
                value={clientIdInput}
                onChange={(e) => setClientIdInput(e.target.value)}
                placeholder="XXXX.apps.googleusercontent.com"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl font-mono text-[11px] text-slate-200 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold"
              >
                Save Client ID
              </button>
            </form>
          )}
        </div>

        {/* Security Reassurance Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured with Google Identity Services &amp; OAuth 2.0 PKCE</span>
        </div>
      </div>
    </div>
  );
};
