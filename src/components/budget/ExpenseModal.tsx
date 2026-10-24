import React, { useState, useEffect } from 'react';
import { X, DollarSign, Tag, FileText } from 'lucide-react';
import { BudgetItem } from '../../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<BudgetItem, 'id'>) => void;
  initialItem?: BudgetItem | null;
}

const CATEGORIES: BudgetItem['category'][] = [
  'Venue',
  'Catering',
  'Decor & Floral',
  'Photo & Video',
  'Music & AV',
  'Attire & Glam',
  'Stationery & Favors',
  'Contingency'
];

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BudgetItem['category']>('Venue');
  const [allocatedAmount, setAllocatedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [status, setStatus] = useState<BudgetItem['status']>('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setCategory(initialItem.category);
      setAllocatedAmount(initialItem.allocatedAmount);
      setActualAmount(initialItem.actualAmount);
      setPaidAmount(initialItem.paidAmount);
      setStatus(initialItem.status);
      setNotes(initialItem.notes || '');
    } else {
      setName('');
      setCategory('Venue');
      setAllocatedAmount(1000);
      setActualAmount(1000);
      setPaidAmount(0);
      setStatus('pending');
      setNotes('');
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      category,
      allocatedAmount: Number(allocatedAmount),
      actualAmount: Number(actualAmount),
      paidAmount: Number(paidAmount),
      status,
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
          {initialItem ? 'Edit Budget Expense' : 'Add New Expense Item'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Record vendor contracts, allocated caps, and payment tracking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Expense / Line Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage String Quartet, Artisan Cake"
              required
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BudgetItem['category'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Payment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BudgetItem['status'])}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              >
                <option value="pending">Pending</option>
                <option value="deposit_paid">Deposit Paid</option>
                <option value="paid_in_full">Paid in Full</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Allocated ($)
              </label>
              <input
                type="number"
                min="0"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Actual / Quote ($)
              </label>
              <input
                type="number"
                min="0"
                value={actualAmount}
                onChange={(e) => setActualAmount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Paid So Far ($)
              </label>
              <input
                type="number"
                min="0"
                value={paidAmount}
                onChange={(e) => setPaidAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Vendor Notes / Invoicing Details
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Due date, deliverables, refund policy..."
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
              Save Line Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
