import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Download,
  Upload,
  Printer,
  Settings,
  ChevronDown,
  RotateCcw,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { PRESET_TEMPLATES } from '../../data/presetTemplates';
import { exportEventToJSON, parseImportedJSON, printRunOfShow } from '../../services/exportService';
import { ApiKeyModal } from '../ai/ApiKeyModal';
import { EventSetupModal } from '../overview/EventSetupModal';
import { GoogleAuthModal } from '../auth/GoogleAuthModal';

export const Navbar: React.FC = () => {
  const {
    event,
    budgetItems,
    timelineItems,
    checklistItems,
    tables,
    guests,
    loadPresetTemplate,
    importFullData,
    resetToBlank
  } = useEvent();

  const { user, isAuthenticated, openAuthModal, signOut } = useAuth();

  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportEventToJSON({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      event,
      budgetItems,
      timelineItems,
      checklistItems,
      tables,
      guests
    });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = parseImportedJSON(content);
        importFullData(parsed);
      } catch (err) {
        alert('Could not import event file. Please verify JSON format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePrint = () => {
    printRunOfShow(event, timelineItems, budgetItems);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-neutral-900 border border-white/[0.1] text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
                  CelebAura AI
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded-full bg-white/[0.05] border border-white/[0.1] text-neutral-300">
                  Challenge 5
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block truncate max-w-xs font-normal">
                Autonomous Celebration &amp; Event Orchestrator
              </p>
            </div>
          </div>

          {/* Preset Selector, Actions & Google Sign-In */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Template Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/80 border border-white/[0.08] rounded-full hover:border-white/[0.18] hover:text-white transition shadow-sm"
                title="Switch Preset Blueprint"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden md:inline truncate max-w-[130px]">{event.title}</span>
                <span className="md:hidden">Presets</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isTemplateMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 bg-neutral-950/95 border border-white/[0.1] rounded-2xl shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in">
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Instant Event Blueprints
                  </div>
                  {PRESET_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        loadPresetTemplate(tmpl.id);
                        setIsTemplateMenuOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition mb-1 flex flex-col gap-0.5 ${
                        event.id === tmpl.event.id
                          ? 'bg-purple-950/40 text-purple-200 border border-purple-500/40'
                          : 'text-neutral-300 hover:bg-neutral-900'
                      }`}
                    >
                      <span className="font-semibold">{tmpl.name}</span>
                      <span className="text-[10px] text-neutral-400 truncate">{tmpl.description}</span>
                    </button>
                  ))}
                  <div className="border-t border-neutral-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        resetToBlank();
                        setIsTemplateMenuOpen(false);
                      }}
                      className="w-full text-left p-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-xl flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Start Blank Event
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Edit Event Settings */}
            <button
              onClick={() => setIsSetupOpen(true)}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900/80 border border-white/[0.08] hover:border-white/[0.18] rounded-full transition"
              title="Edit Event Blueprint Settings"
              aria-label="Edit Event Blueprint Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* Print Run of Show */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/80 border border-white/[0.08] hover:border-white/[0.18] hover:text-white rounded-full transition"
              title="Print Clean Run of Show Sheet"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Print Run-Sheet</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExport}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900/80 border border-white/[0.08] hover:border-white/[0.18] rounded-full transition"
              title="Export Full Dossier Backup (JSON)"
              aria-label="Export Full Dossier Backup"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            {/* Import JSON */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-neutral-300 hover:text-white bg-neutral-900/80 border border-white/[0.08] hover:border-white/[0.18] rounded-full transition"
              title="Import Event Dossier (JSON)"
              aria-label="Import Event Dossier"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
            </button>

            {/* Gen AI Configuration (Aceternity Shimmer Button) */}
            <button
              onClick={() => setIsApiKeyOpen(true)}
              className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c084fc_0%,#3b82f6_50%,#c084fc_100%)] opacity-70" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-3xl gap-1.5 hover:bg-neutral-900 transition">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden md:inline">Gemini AI</span>
              </span>
            </button>

            {/* Google Sign-In / Account Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 bg-neutral-900/90 hover:bg-neutral-800 border border-white/[0.1] rounded-full transition"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-purple-500/40"
                  />
                  <span className="hidden sm:inline text-xs font-medium text-neutral-200 truncate max-w-[90px]">
                    {user.givenName || user.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-400 mr-1" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 p-3 bg-neutral-950/95 border border-white/[0.1] rounded-2xl shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in space-y-2">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-800">
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-purple-500/40"
                      />
                      <div className="truncate">
                        <div className="text-xs font-bold text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{user.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded-lg border border-emerald-500/20">
                      <UserCheck className="w-3 h-3" />
                      <span>Verified Google Account</span>
                    </div>

                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left p-2 text-xs text-rose-400 hover:bg-rose-950/30 rounded-xl flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-medium rounded-full shadow-[0_0_15px_rgba(255,255,255,0.15)] transition transform active:scale-95"
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
                <span className="hidden sm:inline">Sign in</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modals */}
      <ApiKeyModal isOpen={isApiKeyOpen} onClose={() => setIsApiKeyOpen(false)} />
      <EventSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
      <GoogleAuthModal />
    </>
  );
};
