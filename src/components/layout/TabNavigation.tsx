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
      icon: <LayoutDashboard className="w-3.5 h-3.5" />
    },
    {
      id: 'chat',
      label: 'Aura AI',
      icon: <BotMessageSquare className="w-3.5 h-3.5 text-purple-400" />,
      badge: 'Live'
    },
    {
      id: 'budget',
      label: 'Budget',
      icon: <DollarSign className="w-3.5 h-3.5 text-emerald-400" />,
      badge: `$${(totalActual / 1000).toFixed(0)}k`
    },
    {
      id: 'timeline',
      label: 'Run of Show',
      icon: <Clock className="w-3.5 h-3.5 text-sky-400" />,
      badge: timelineItems.length
    },
    {
      id: 'hospitality',
      label: 'Bar Math',
      icon: <Wine className="w-3.5 h-3.5 text-pink-400" />
    },
    {
      id: 'seating',
      label: 'Seating',
      icon: <Users className="w-3.5 h-3.5 text-amber-400" />,
      badge: guests.length
    },
    {
      id: 'invites',
      label: 'Invites & Theme',
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
    },
    {
      id: 'vendors',
      label: 'RFPs & Tasks',
      icon: <ClipboardCheck className="w-3.5 h-3.5 text-cyan-400" />,
      badge: pendingChecklist > 0 ? pendingChecklist : undefined
    }
  ];

  return (
    <nav className="w-full sticky top-16 z-30 pt-3 pb-1 overflow-x-auto no-scrollbar pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-900/80 border border-white/[0.08] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-semibold tracking-wide ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-neutral-800 text-neutral-400 border border-neutral-700/60'
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
