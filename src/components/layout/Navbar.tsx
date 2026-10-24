import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  Download,
  Upload,
  Printer,
  Settings,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { PRESET_TEMPLATES } from '../../data/presetTemplates';
import { exportEventToJSON, parseImportedJSON, printRunOfShow } from '../../services/exportService';
import { ApiKeyModal } from '../ai/ApiKeyModal';
import { EventSetupModal } from '../overview/EventSetupModal';

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

  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
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
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white shadow-lg shadow-purple-900/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                  CelebAura AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                  Challenge 5
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                Autonomous Celebration & Event Intelligence Engine
              </p>
            </div>
          </div>

          {/* Quick Preset Selector & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Template Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/80 transition"
                title="Switch Preset Blueprint"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden md:inline truncate max-w-[140px]">{event.title}</span>
                <span className="md:hidden">Presets</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isTemplateMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 animate-in fade-in">
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
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
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-semibold">{tmpl.name}</span>
                      <span className="text-[10px] text-slate-400 truncate">{tmpl.description}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-800 mt-1 pt-1">
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
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition"
              title="Edit Event Blueprint Settings"
              aria-label="Edit Event Blueprint Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Print Run of Show */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition"
              title="Print Clean Run of Show Sheet"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Print Run-Sheet</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExport}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition"
              title="Export Full Dossier Backup (JSON)"
              aria-label="Export Full Dossier Backup"
            >
              <Download className="w-4 h-4 text-emerald-400" />
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
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition"
              title="Import Event Dossier (JSON)"
              aria-label="Import Event Dossier"
            >
              <Upload className="w-4 h-4 text-amber-400" />
            </button>

            {/* Gen AI Configuration */}
            <button
              onClick={() => setIsApiKeyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-900/30 transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Gemini AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ApiKeyModal isOpen={isApiKeyOpen} onClose={() => setIsApiKeyOpen(false)} />
      <EventSetupModal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} />
    </>
  );
};
