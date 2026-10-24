import React, { useState } from 'react';
import { X, Calendar, DollarSign, Users, MapPin, Sparkles, Clock, Palette } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { EventVertical, VibeStyle } from '../../types';
import { PRESET_PALETTES } from '../../data/presetTemplates';

interface EventSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VERTICAL_OPTIONS: { id: EventVertical; label: string }[] = [
  { id: 'wedding', label: '💍 Wedding & Reception' },
  { id: 'birthday', label: '🎂 Milestone Birthday' },
  { id: 'corporate', label: '👔 Corporate Summit & Gala' },
  { id: 'babyshower', label: '👶 Baby Shower / Reveal' },
  { id: 'anniversary', label: '🥂 Anniversary & Renewal' },
  { id: 'soiree', label: '🎉 House Soiree / Festival' },
  { id: 'fundraiser', label: '🤝 Charity Gala & Fundraiser' }
];

const VIBE_OPTIONS: VibeStyle[] = [
  'Boho Botanical',
  'Cyberpunk Neon',
  'Old Money Elegance',
  'Modern Minimalist',
  'Rustic Vineyard',
  'Black Tie Glamour',
  'Tropical Riviera'
];

export const EventSetupModal: React.FC<EventSetupModalProps> = ({ isOpen, onClose }) => {
  const { event, updateEventDetails } = useEvent();

  const [title, setTitle] = useState(event.title);
  const [vertical, setVertical] = useState<EventVertical>(event.vertical);
  const [date, setDate] = useState(event.date);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [location, setLocation] = useState(event.location);
  const [isOutdoor, setIsOutdoor] = useState(event.isOutdoor);
  const [totalBudget, setTotalBudget] = useState(event.totalBudget);
  const [targetGuestCount, setTargetGuestCount] = useState(event.targetGuestCount);
  const [vibe, setVibe] = useState<VibeStyle>(event.vibe);
  const [primaryNotes, setPrimaryNotes] = useState(event.primaryNotes);
  const [paletteKey, setPaletteKey] = useState<string>('botanical');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEventDetails({
      title,
      vertical,
      date,
      startTime,
      endTime,
      location,
      isOutdoor,
      totalBudget: Number(totalBudget),
      targetGuestCount: Number(targetGuestCount),
      vibe,
      primaryNotes,
      colorPalette: PRESET_PALETTES[paletteKey] || event.colorPalette
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Event Blueprint Settings</h3>
            <p className="text-xs text-slate-400">Configure core constraints and persona parameters for this celebration</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Celebration Vertical
              </label>
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value as EventVertical)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                {VERTICAL_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Aesthetic Vibe
              </label>
              <select
                value={vibe}
                onChange={(e) => setVibe(e.target.value as VibeStyle)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                {VIBE_OPTIONS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                End Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Target Guest Count
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={targetGuestCount}
                  onChange={(e) => setTargetGuestCount(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <Users className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Total Budget Ceiling ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
                />
                <DollarSign className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Location / Venue Setting
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Glasshouse Loft, Downtown"
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
            <input
              type="checkbox"
              id="isOutdoor"
              checked={isOutdoor}
              onChange={(e) => setIsOutdoor(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded bg-slate-900 border-slate-700 focus:ring-purple-500"
            />
            <label htmlFor="isOutdoor" className="text-xs text-slate-300 cursor-pointer">
              <strong>Outdoor Setting:</strong> Triggers autonomous weather contingency tracking and tenting alerts
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Select Curated Color Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(PRESET_PALETTES).map(([key, pal]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setPaletteKey(key)}
                  className={`p-2.5 text-left rounded-xl border transition flex flex-col gap-1.5 ${
                    paletteKey === key
                      ? 'border-purple-500 bg-purple-950/30'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.secondary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: pal.accent }} />
                  </div>
                  <span className="text-xs font-medium text-slate-200 truncate">{pal.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Planner Context & Special Notes
            </label>
            <textarea
              rows={2}
              value={primaryNotes}
              onChange={(e) => setPrimaryNotes(e.target.value)}
              placeholder="Key priorities, musical preferences, VIP restrictions..."
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
              Save Blueprint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
