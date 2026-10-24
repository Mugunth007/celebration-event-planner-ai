import React, { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { Guest, SeatingTable } from '../../types';
import { GuestModal } from './GuestModal';
import { TableModal } from './TableModal';
import { fireCelebrationConfetti } from '../common/ConfettiTrigger';

export const SeatingPlanner: React.FC = () => {
  const {
    event,
    tables,
    guests,
    addTable,
    deleteTable,
    addGuest,
    updateGuest,
    deleteGuest,
    assignGuestToTable
  } = useEvent();

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  const totalSeats = tables.reduce((acc, t) => acc + t.capacity, 0);
  const totalAssigned = guests.filter(g => g.tableId).length;
  const unassignedGuests = guests.filter(g => !g.tableId && g.rsvpStatus !== 'declined');

  // Conflict detection
  const overcapacityTables = tables.filter(t => t.assignedGuestIds.length > t.capacity);
  const unseatedVips = unassignedGuests.filter(g => g.group === 'vip');

  const handleEditGuest = (g: Guest) => {
    setEditingGuest(g);
    setIsGuestModalOpen(true);
  };

  const handleAddGuest = () => {
    setEditingGuest(null);
    setIsGuestModalOpen(true);
  };

  const handleSaveGuest = (guestData: Omit<Guest, 'id'>) => {
    if (editingGuest) {
      updateGuest(editingGuest.id, guestData);
    } else {
      addGuest(guestData);
      fireCelebrationConfetti();
    }
  };

  const handleSaveTable = (tableData: Omit<SeatingTable, 'id' | 'assignedGuestIds'>) => {
    addTable(tableData);
    fireCelebrationConfetti();
  };

  const dietaryColors: Record<Guest['dietary'], { label: string; badge: string }> = {
    none: { label: '', badge: '' },
    vegan: { label: 'Vegan', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    vegetarian: { label: 'Veg', badge: 'bg-green-500/20 text-green-300 border-green-500/30' },
    halal: { label: 'Halal', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    kosher: { label: 'Kosher', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    gluten_free: { label: 'GF', badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
    nut_allergy: { label: 'Nut Allergy', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Metrics */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Users className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Interactive Seating &amp; Table Arrangement</h2>
          </div>
          <p className="text-xs text-slate-400">
            {totalAssigned} seated / {guests.length} roster guests • {tables.length} tables ({totalSeats} total chairs available)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsTableModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            <span>Add Table</span>
          </button>

          <button
            onClick={handleAddGuest}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition shadow-md shadow-purple-900/30"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Guest</span>
          </button>
        </div>
      </div>

      {/* Autonomous Seating Conflict Alerts */}
      {(overcapacityTables.length > 0 || unseatedVips.length > 0) && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Aura Seating Conflict Resolution Alerts:</span>
          </div>
          {overcapacityTables.map(t => (
            <p key={t.id} className="text-[11px] leading-relaxed">
              ⚠️ <strong>{t.name}</strong> is over capacity ({t.assignedGuestIds.length} seated of {t.capacity} max). Reassign {t.assignedGuestIds.length - t.capacity} guest(s) to maintain banquet aisle clearance.
            </p>
          ))}
          {unseatedVips.map(v => (
            <p key={v.id} className="text-[11px] leading-relaxed">
              ⭐ VIP Guest <strong>{v.name}</strong> is currently unseated. Recommend placement at Table 1 (Head Table).
            </p>
          ))}
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => {
          const seatedGuests = guests.filter(g => g.tableId === table.id);
          const isFull = seatedGuests.length >= table.capacity;
          const isOver = seatedGuests.length > table.capacity;

          return (
            <div
              key={table.id}
              className={`p-5 rounded-3xl border transition shadow-lg flex flex-col justify-between ${
                isOver
                  ? 'bg-rose-950/20 border-rose-500/50'
                  : isFull
                  ? 'bg-slate-900/90 border-slate-700/80'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm text-white">{table.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 capitalize">
                      <span>{table.shape} table</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        isOver
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : isFull
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {seatedGuests.length} / {table.capacity} Seats
                    </span>

                    <button
                      onClick={() => deleteTable(table.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                      title="Delete Table"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Seated Guests List */}
                <div className="mt-3 space-y-2 min-h-[90px]">
                  {seatedGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {guest.group === 'vip' && <span className="text-amber-400">⭐</span>}
                        <span className="font-medium text-slate-200 truncate">{guest.name}</span>
                        {guest.dietary && guest.dietary !== 'none' && (
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold uppercase border ${dietaryColors[guest.dietary].badge}`}>
                            {dietaryColors[guest.dietary].label}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleEditGuest(guest)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Edit Guest"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => assignGuestToTable(guest.id, null)}
                          className="p-1 text-slate-400 hover:text-rose-400"
                          title="Unseat Guest"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {seatedGuests.length === 0 && (
                    <div className="h-full flex items-center justify-center text-center text-slate-500 text-xs py-6">
                      Empty table — Assign guests from the unassigned roster below.
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Seat Assignment Picker */}
              {unassignedGuests.length > 0 && !isFull && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        assignGuestToTable(e.target.value, table.id);
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:border-purple-500/40 rounded-xl text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="">+ Seat Unassigned Guest...</option>
                    {unassignedGuests.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.group}) {u.dietary !== 'none' ? `[${u.dietary}]` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unassigned Guests Pool */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Unassigned Guest Pool ({unassignedGuests.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Select a table to seat each attendee
          </span>
        </div>

        {unassignedGuests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unassignedGuests.map((g) => (
              <div
                key={g.id}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-1.5">
                    {g.group === 'vip' && <span className="text-amber-400">⭐</span>}
                    <span className="font-semibold text-slate-100 truncate">{g.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span className="capitalize">{g.group}</span>
                    {g.dietary !== 'none' && (
                      <span className={`px-1 rounded font-semibold ${dietaryColors[g.dietary].badge}`}>
                        {dietaryColors[g.dietary].label}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        assignGuestToTable(g.id, e.target.value);
                      }
                    }}
                    className="px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="">Seat At...</option>
                    {tables.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleEditGuest(g)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteGuest(g.id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>All confirmed guests have been successfully placed at tables!</span>
          </div>
        )}
      </div>

      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={handleSaveGuest}
        tables={tables}
        initialGuest={editingGuest}
      />

      <TableModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onSave={handleSaveTable}
      />
    </div>
  );
};
