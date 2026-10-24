import React, { useState } from 'react';
import { Key, Shield, Sparkles, Check, ExternalLink, X, Cpu } from 'lucide-react';
import { getStoredApiKey, saveStoredApiKey, getStoredModel, saveStoredModel, SUPPORTED_MODELS } from '../../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState(getStoredApiKey());
  const [model, setModel] = useState(getStoredModel());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredApiKey(key);
    saveStoredModel(model);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    saveStoredApiKey('');
    setKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Gen AI Engine Settings</h3>
            <p className="text-xs text-slate-400">Configure Google Gemini API or utilize built-in offline smart heuristics</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Gemini Model
            </label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                {SUPPORTED_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <Cpu className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Google Gemini API Key (Optional)
              </label>
              {key && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Clear Key
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <Key className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
            </div>
            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>Key is stored only in your browser localStorage</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 underline"
              >
                Get Free Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Zero-Config Offline Fallback Engine Ready</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              If no API key is provided, CelebAura automatically activates the built-in deterministic event intelligence engine to provide immediate, context-aware answers, budget math, and run-of-show cues without any external connection.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-900/30 transition transform active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                'Save Preferences'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
