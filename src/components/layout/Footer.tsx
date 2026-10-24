import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-black/60 backdrop-blur-xl mt-16 py-8 text-xs text-neutral-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-neutral-900 border border-white/[0.1] text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-neutral-300">CelebAura AI</span>
            <span className="mx-2 text-neutral-700">•</span>
            <span>Virtual Prompt Wars 2026 — [Challenge 5] Celebration &amp; Event Planner</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Credential Leak Client Isolation</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Google Gemini Flash &amp; Cloud Run</span>
          </div>
          <a
            href="https://github.com/Mugunth007/celebration-event-planner-ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition"
          >
            <Code2 className="w-4 h-4 text-purple-400" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
