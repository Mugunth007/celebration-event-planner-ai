import React from 'react';
import {
  LayoutDashboard,
  BotMessageSquare,
  DollarSign,
  Clock,
  Wine,
  Users,
  Sparkles,
  ClipboardCheck
} from 'lucide-react';
import { useEvent, ActiveTab } from '../../context/EventContext';

export const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab, budgetItems, timelineItems, checklistItems, guests } = useEvent();

  const totalActual = budgetItems.reduce((acc, i) => acc + (i.actualAmount || i.allocatedAmount || 0), 0);
  const pendingChecklist = checklistItems.filter(c => !c.isCompleted).length;

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'chat',
      label: 'Aura AI Copilot',
      icon: <BotMessageSquare className="w-4 h-4 text-purple-400" />,
      badge: 'Live'
    },
    {
      id: 'budget',
      label: 'Budget & ROI',
      icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
      badge: `$${(totalActual / 1000).toFixed(1)}k`
    },
    {
      id: 'timeline',
      label: 'Run of Show',
      icon: <Clock className="w-4 h-4 text-sky-400" />,
      badge: timelineItems.length
    },
    {
      id: 'hospitality',
      label: 'Bar & Hospitality',
      icon: <Wine className="w-4 h-4 text-pink-400" />
    },
    {
      id: 'seating',
      label: 'Seating Chart',
      icon: <Users className="w-4 h-4 text-amber-400" />,
      badge: guests.length
    },
    {
      id: 'invites',
      label: 'Invites & Aesthetics',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 'vendors',
      label: 'Checklist & RFPs',
      icon: <ClipboardCheck className="w-4 h-4 text-cyan-400" />,
      badge: pendingChecklist > 0 ? pendingChecklist : undefined
    }
  ];

  return (
    <nav className="w-full border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm sticky top-16 z-30 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 py-2.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 ring-1 ring-purple-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
