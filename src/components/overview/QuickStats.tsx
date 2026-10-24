import React from 'react';
import { DollarSign, Users, Clock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { analyzeBudgetHealth, calculateDietaryBreakdown } from '../../services/hospitalityMath';

export const QuickStats: React.FC = () => {
  const { event, budgetItems, timelineItems, checklistItems, guests, setActiveTab } = useEvent();

  const budgetReport = analyzeBudgetHealth(event.totalBudget, budgetItems);
  const dietarySummary = calculateDietaryBreakdown(guests);

  const completedChecklist = checklistItems.filter(c => c.isCompleted).length;
  const checklistPercent = checklistItems.length > 0 ? Math.round((completedChecklist / checklistItems.length) * 100) : 0;

  const confirmedGuests = guests.filter(g => g.rsvpStatus === 'confirmed').length;
  const guestPercent = Math.min(100, Math.round((confirmedGuests / Math.max(1, event.targetGuestCount)) * 100));

  const budgetPercent = event.totalBudget > 0 ? Math.min(150, Math.round((budgetReport.totalActual / event.totalBudget) * 100)) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {/* 1. Budget Card */}
      <div
        onClick={() => setActiveTab('budget')}
        className="group cursor-pointer p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition shadow-lg flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Health</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              ${budgetReport.totalActual.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">
              of ${event.totalBudget.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                budgetReport.isOverBudget
                  ? 'bg-rose-500'
                  : budgetPercent > 85
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, budgetPercent)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          {budgetReport.isOverBudget ? (
            <span className="text-rose-400 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" /> Over by ${(budgetReport.totalActual - event.totalBudget).toLocaleString()}
            </span>
          ) : (
            <span className="text-emerald-400 font-medium">
              ${budgetReport.remainingBudget.toLocaleString()} remaining
            </span>
          )}
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 2. Guests & RSVPs Card */}
      <div
        onClick={() => setActiveTab('seating')}
        className="group cursor-pointer p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition shadow-lg flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Guest RSVPs</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {confirmedGuests}
            </span>
            <span className="text-xs text-slate-400">
              / {event.targetGuestCount} target capacity
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${guestPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-400">
            {dietarySummary.allergiesList.length > 0 ? (
              <span className="text-amber-400 font-medium">{dietarySummary.allergiesList.length} dietary flags</span>
            ) : (
              `${guests.length} on roster`
            )}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 3. Run-of-Show Milestones Card */}
      <div
        onClick={() => setActiveTab('timeline')}
        className="group cursor-pointer p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition shadow-lg flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Run of Show</span>
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {timelineItems.length}
            </span>
            <span className="text-xs text-slate-400">
              production cues logged
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2 truncate">
            {timelineItems[0] ? `First: ${timelineItems[0].time} • ${timelineItems[0].title}` : 'No cues defined yet'}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-sky-400 font-medium">
            {event.startTime} - {event.endTime} window
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 4. Checklist Progress Card */}
      <div
        onClick={() => setActiveTab('vendors')}
        className="group cursor-pointer p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition shadow-lg flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Milestone Checklist</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {checklistPercent}%
            </span>
            <span className="text-xs text-slate-400">
              ({completedChecklist}/{checklistItems.length} tasks)
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-purple-300 font-medium">
            {checklistItems.length - completedChecklist} tasks remaining
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
};
