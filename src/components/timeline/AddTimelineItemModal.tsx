import React, { useState, useEffect } from 'react';
import { X, Clock, User, MapPin } from 'lucide-react';
import { TimelineItem } from '../../types';

interface AddTimelineItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<TimelineItem, 'id' | 'isCompleted'>) => void;
  initialItem?: TimelineItem | null;
}

const CATEGORIES: { id: TimelineItem['category']; label: string }[] = [
  { id: 'prep', label: 'Prep & Vendor Setup' },
  { id: 'ceremony', label: 'Ceremony / Keynote' },
  { id: 'reception', label: 'Cocktail & Reception' },
  { id: 'dining', label: 'Banquet & Dinner Service' },
  { id: 'entertainment', label: 'Speeches & Dancing' },
  { id: 'logistics', label: 'Send-Off & Load-Out' }
];

export const AddTimelineItemModal: React.FC<AddTimelineItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem
}) => {
  const [time, setTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:00');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TimelineItem['category']>('reception');
  const [leadPersonnel, setLeadPersonnel] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (initialItem) {
      setTime(initialItem.time);
      setEndTime(initialItem.endTime || '');
      setTitle(initialItem.title);
      setDescription(initialItem.description);
      setCategory(initialItem.category);
      setLeadPersonnel(initialItem.leadPersonnel);
      setLocation(initialItem.location || '');
    } else {
      setTime('16:00');
      setEndTime('16:45');
      setTitle('');
      setDescription('');
      setCategory('reception');
      setLeadPersonnel('Coordinator');
      setLocation('Main Hall');
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      time,
      endTime,
      title,
      description,
      category,
      leadPersonnel,
      location
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-1">
          {initialItem ? 'Edit Production Cue' : 'Add Production Cue / Milestone'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Define exact time, cues, and designated personnel responsible for flawless execution.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Milestone Cue Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Grand Entrance & Champagne Toast"
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Start Cue Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                End / Target Wrap Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Phase Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TimelineItem['category'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Lead Department / Person
              </label>
              <input
                type="text"
                value={leadPersonnel}
                onChange={(e) => setLeadPersonnel(e.target.value)}
                placeholder="e.g. Lead DJ, Maitre D, Maid of Honor"
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Physical Location / Station
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Garden Courtyard, Center Stage"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Operational Instructions &amp; Audio/Visual Cues
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dim chandeliers to 30%, spot-light to center floor, cue track #4..."
              required
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-900/30 transition"
            >
              Save Milestone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
