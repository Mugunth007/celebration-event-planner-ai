import React from 'react';
import {
  Sparkles,
  BotMessageSquare,
  Wine,
  Mail,
  ArrowRight,
  Lightbulb,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { EventHero } from './EventHero';
import { QuickStats } from './QuickStats';
import { analyzeBudgetHealth } from '../../services/hospitalityMath';

export const OverviewTab: React.FC = () => {
  const { event, budgetItems, timelineItems, setActiveTab } = useEvent();
  const budgetReport = analyzeBudgetHealth(event.totalBudget, budgetItems);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Hero Banner with Countdown */}
      <EventHero />

      {/* 4 Metric Cards */}
      <QuickStats />

      {/* Autonomous Planner Intelligence Recommendations */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Aura AI Autonomous Directives</h3>
              <p className="text-xs text-slate-400">Contextual optimizations tailored for {event.vertical} &amp; {event.vibe}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('chat')}
            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            <span>Ask Aura Copilot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {budgetReport.recommendations.slice(0, 2).map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-3"
            >
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}

          {event.isOutdoor && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">
                <strong>Outdoor Alert:</strong> Monitor the 72-hour forecast trigger for clear-span marquee tenting and confirm outdoor-rated GFCI electrical distribution.
              </p>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
            <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
              <Wine className="w-3.5 h-3.5" />
            </div>
            <p className="leading-relaxed">
              <strong>Beverage Pairing:</strong> Based on {event.targetGuestCount} guests, your bar program recommends {Math.ceil((event.targetGuestCount * 4) / 5)} bottles of wine &amp; {Math.ceil((event.targetGuestCount * 1.5))} lbs of ice.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Launchers & Next Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launchpad */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Action Suite</h3>
          <p className="text-xs text-slate-400">Instant access to specialized event orchestration tools</p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setActiveTab('hospitality')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left transition flex flex-col gap-1 group"
            >
              <Wine className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-200">Bar Calculator</span>
              <span className="text-[10px] text-slate-500">Alcohol &amp; ice ratios</span>
            </button>

            <button
              onClick={() => setActiveTab('invites')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left transition flex flex-col gap-1 group"
            >
              <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-200">Invitation Card</span>
              <span className="text-[10px] text-slate-500">Copy &amp; theme preview</span>
            </button>

            <button
              onClick={() => setActiveTab('seating')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left transition flex flex-col gap-1 group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-200">Seating Mapper</span>
              <span className="text-[10px] text-slate-500">Table placement</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left transition flex flex-col gap-1 group"
            >
              <BotMessageSquare className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-200">Aura Copilot</span>
              <span className="text-[10px] text-slate-500">Toasts &amp; advice</span>
            </button>
          </div>
        </div>

        {/* Master Run-of-Show Preview */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Day-Of Cue Preview</h3>
            </div>
            <button
              onClick={() => setActiveTab('timeline')}
              className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {timelineItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sky-400 bg-sky-950/50 px-2 py-1 rounded-lg border border-sky-500/20">
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {item.leadPersonnel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
