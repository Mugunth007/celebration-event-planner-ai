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
        className="group cursor-pointer p-6 rounded-3xl aceternity-card hover:scale-[1.01] transition-all duration-300 shadow-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Budget Health</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              ${budgetReport.totalActual.toLocaleString()}
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              / ${event.totalBudget.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-neutral-800/80 rounded-full h-1.5 mt-2.5 overflow-hidden">
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
            <span className="text-rose-400 flex items-center gap-1 font-semibold text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" /> Over by ${(budgetReport.totalActual - event.totalBudget).toLocaleString()}
            </span>
          ) : (
            <span className="text-emerald-400 font-medium text-[11px]">
              ${budgetReport.remainingBudget.toLocaleString()} buffer available
            </span>
          )}
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 2. Guests & RSVPs Card */}
      <div
        onClick={() => setActiveTab('seating')}
        className="group cursor-pointer p-6 rounded-3xl aceternity-card hover:scale-[1.01] transition-all duration-300 shadow-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Guest RSVPs</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {confirmedGuests}
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              / {event.targetGuestCount} capacity
            </span>
          </div>

          <div className="w-full bg-neutral-800/80 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${guestPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-neutral-400 text-[11px]">
            {dietarySummary.allergiesList.length > 0 ? (
              <span className="text-amber-400 font-medium">{dietarySummary.allergiesList.length} dietary flags</span>
            ) : (
              `${guests.length} on roster`
            )}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 3. Run-of-Show Milestones Card */}
      <div
        onClick={() => setActiveTab('timeline')}
        className="group cursor-pointer p-6 rounded-3xl aceternity-card hover:scale-[1.01] transition-all duration-300 shadow-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Run of Show</span>
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {timelineItems.length}
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              production cues
            </span>
          </div>

          <p className="text-[11px] text-neutral-400 mt-2 truncate font-mono">
            {timelineItems[0] ? `First: ${timelineItems[0].time} • ${timelineItems[0].title}` : 'No cues defined'}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-sky-400 font-medium text-[11px]">
            {event.startTime} – {event.endTime} window
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* 4. Checklist Progress Card */}
      <div
        onClick={() => setActiveTab('vendors')}
        className="group cursor-pointer p-6 rounded-3xl aceternity-card hover:scale-[1.01] transition-all duration-300 shadow-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Milestone Tasks</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {checklistPercent}%
            </span>
            <span className="text-xs text-neutral-400 font-normal">
              ({completedChecklist}/{checklistItems.length} tasks)
            </span>
          </div>

          <div className="w-full bg-neutral-800/80 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-purple-300 font-medium text-[11px]">
            {checklistItems.length - completedChecklist} remaining
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
};
