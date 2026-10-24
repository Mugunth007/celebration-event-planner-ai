import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { SeatingTable } from '../../types';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (table: Omit<SeatingTable, 'id' | 'assignedGuestIds'>) => void;
}

export const TableModal: React.FC<TableModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [shape, setShape] = useState<SeatingTable['shape']>('round');
  const [capacity, setCapacity] = useState<number>(8);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name || `Table ${Date.now().toString().slice(-3)}`,
      shape,
      capacity: Number(capacity)
    });
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-1">Create Seating Table</h3>
        <p className="text-xs text-slate-400 mb-5">
          Configure table shape and chair capacity for banquet seating.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Table Name / Label
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Table 5 - Sapphire Deck"
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Table Shape
              </label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as SeatingTable['shape'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="round">Round Table</option>
                <option value="rectangular">Rectangular Banquet</option>
                <option value="sweetheart">Sweetheart (2 Seats)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Max Seat Capacity
              </label>
              <input
                type="number"
                min="2"
                max="20"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
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
              Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
