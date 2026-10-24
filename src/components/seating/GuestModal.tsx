import React, { useState, useEffect } from 'react';
import { X, User, Heart, AlertCircle } from 'lucide-react';
import { Guest, SeatingTable } from '../../types';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (guest: Omit<Guest, 'id'>) => void;
  tables: SeatingTable[];
  initialGuest?: Guest | null;
}

export const GuestModal: React.FC<GuestModalProps> = ({
  isOpen,
  onClose,
  onSave,
  tables,
  initialGuest
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState<Guest['group']>('friends');
  const [rsvpStatus, setRsvpStatus] = useState<Guest['rsvpStatus']>('confirmed');
  const [dietary, setDietary] = useState<Guest['dietary']>('none');
  const [tableId, setTableId] = useState<string>('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialGuest) {
      setName(initialGuest.name);
      setEmail(initialGuest.email || '');
      setGroup(initialGuest.group);
      setRsvpStatus(initialGuest.rsvpStatus);
      setDietary(initialGuest.dietary);
      setTableId(initialGuest.tableId || '');
      setNotes(initialGuest.notes || '');
    } else {
      setName('');
      setEmail('');
      setGroup('friends');
      setRsvpStatus('confirmed');
      setDietary('none');
      setTableId('');
      setNotes('');
    }
  }, [initialGuest, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      email,
      group,
      rsvpStatus,
      dietary,
      tableId: tableId || undefined,
      notes
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
          {initialGuest ? 'Edit Guest Details' : 'Add Guest to Roster'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Record attendee party affiliation, dietary accommodations, and assigned table.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Guest Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Guest Group / Circle
              </label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as Guest['group'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="vip">⭐ VIP / Honoree</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="colleagues">Colleagues</option>
                <option value="plus_one">Plus One</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                RSVP Status
              </label>
              <select
                value={rsvpStatus}
                onChange={(e) => setRsvpStatus(e.target.value as Guest['rsvpStatus'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Dietary Preference / Allergy
              </label>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value as Guest['dietary'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="none">Standard / None</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
                <option value="gluten_free">Gluten-Free / Celiac</option>
                <option value="nut_allergy">Severe Nut Allergy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Assigned Table
              </label>
              <select
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="">(Unassigned)</option>
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.assignedGuestIds.length}/{t.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Special Notes / Seating Considerations
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Needs high chair, bridesmaid, close to stage"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
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
              Save Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
