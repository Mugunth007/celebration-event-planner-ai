import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Printer,
  Copy,
  Check,
  MapPin,
  User,
  Trash2,
  Edit2,
  CheckCircle2,
  Circle,
  ShieldAlert
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { TimelineItem } from '../../types';
import { AddTimelineItemModal } from './AddTimelineItemModal';
import { printRunOfShow, generateRunOfShowMarkdown } from '../../services/exportService';
import { fireCelebrationConfetti } from '../common/ConfettiTrigger';

export const TimelineView: React.FC = () => {
  const {
    event,
    timelineItems,
    budgetItems,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    toggleTimelineComplete
  } = useEvent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedMd, setCopiedMd] = useState(false);

  const sortedItems = [...timelineItems].sort((a, b) => a.time.localeCompare(b.time));
  const filteredItems = selectedCategory === 'all'
    ? sortedItems
    : sortedItems.filter(i => i.category === selectedCategory);

  const completedCount = sortedItems.filter(i => i.isCompleted).length;

  const handleEdit = (item: TimelineItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Omit<TimelineItem, 'id' | 'isCompleted'>) => {
    if (editingItem) {
      updateTimelineItem(editingItem.id, itemData);
    } else {
      addTimelineItem(itemData);
      fireCelebrationConfetti();
    }
  };

  const handleCopyMarkdown = () => {
    const md = generateRunOfShowMarkdown(event, timelineItems, budgetItems);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleAddGhostBuffer = () => {
    addTimelineItem({
      time: '18:45',
      endTime: '19:00',
      title: 'Operational Ghost Buffer & Mic Handoff',
      description: '15-minute emergency schedule slack to absorb catering delays or guest transitions before speeches.',
      category: 'logistics',
      leadPersonnel: 'Stage Manager',
      location: 'Main Ballroom'
    });
    fireCelebrationConfetti();
  };

  const categoryColor: Record<TimelineItem['category'], string> = {
    prep: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    ceremony: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    reception: 'bg-pink-500/10 text-pink-300 border-pink-500/25',
    dining: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    entertainment: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
    logistics: 'bg-neutral-800 text-neutral-300 border-neutral-700/60'
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner & Quick Actions */}
      <div className="p-6 sm:p-8 rounded-3xl aceternity-card shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 mb-1">
            <Clock className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">Master Day-Of Run of Show</h2>
          </div>
          <p className="text-xs text-neutral-400">
            Window: <strong className="text-neutral-200">{event.startTime} to {event.endTime}</strong> • {completedCount} of {sortedItems.length} cues marked complete
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleAddGhostBuffer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/50 rounded-full transition"
            title="Inject a 15-minute buffer into the schedule"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>+ 15m Ghost Buffer</span>
          </button>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-white/[0.08] hover:border-white/[0.18] rounded-full transition"
            title="Copy Markdown Run of Show for Google Docs"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMd ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={() => printRunOfShow(event, timelineItems, budgetItems)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-sky-300 bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/50 rounded-full transition"
            title="Open Clean Printable View"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-full transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Cue</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs text-neutral-500 uppercase font-semibold shrink-0 tracking-wider">Filter:</span>
        {['all', 'prep', 'ceremony', 'reception', 'dining', 'entertainment', 'logistics'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1 rounded-full text-xs font-medium capitalize transition whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-white/[0.15] text-white border border-white/[0.2] font-semibold'
                : 'bg-neutral-900/90 border border-white/[0.06] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chronological Milestone Timeline Cards */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative p-5 sm:p-6 rounded-3xl aceternity-card transition shadow-lg ${
              item.isCompleted ? 'opacity-50' : 'hover:scale-[1.005]'
            }`}
          >
            <button
              onClick={() => toggleTimelineComplete(item.id)}
              className="absolute -left-[35px] sm:-left-[43px] top-6 w-6 h-6 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center text-purple-400 hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              title={item.isCompleted ? 'Mark Pending' : 'Mark Completed'}
            >
              {item.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Circle className="w-3 h-3 text-purple-400" />
              )}
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-neutral-900 border border-white/[0.1] text-sky-400">
                  {item.time} {item.endTime ? `– ${item.endTime}` : ''}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${categoryColor[item.category]}`}>
                  {item.category}
                </span>

                {item.location && (
                  <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{item.location}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium bg-neutral-900/90 px-3 py-1 rounded-full border border-white/[0.08]">
                  <User className="w-3 h-3 text-neutral-400" />
                  <span>Lead: {item.leadPersonnel}</span>
                </span>

                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                  title="Edit Cue"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteTimelineItem(item.id)}
                  className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition"
                  title="Delete Cue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className={`text-base font-bold mt-2.5 tracking-tight ${item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'}`}>
              {item.title}
            </h3>

            <p className="text-xs text-neutral-300 mt-1 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="p-8 text-center aceternity-card rounded-3xl text-neutral-500 text-xs">
            No milestones found for this filter. Click "+ Add Cue" to create one.
          </div>
        )}
      </div>
    </div>
  );
};
