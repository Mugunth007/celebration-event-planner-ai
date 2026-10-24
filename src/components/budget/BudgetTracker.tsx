import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  TrendingDown,
  Layers
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { BudgetItem } from '../../types';
import { analyzeBudgetHealth } from '../../services/hospitalityMath';
import { ExpenseModal } from './ExpenseModal';
import { fireCelebrationConfetti } from '../common/ConfettiTrigger';

export const BudgetTracker: React.FC = () => {
  const { event, budgetItems, addBudgetItem, updateBudgetItem, deleteBudgetItem } = useEvent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const report = analyzeBudgetHealth(event.totalBudget, budgetItems);
  const costPerGuest = event.targetGuestCount > 0 ? Math.round(report.totalActual / event.targetGuestCount) : 0;

  const filteredItems = selectedCategory === 'all'
    ? budgetItems
    : budgetItems.filter(i => i.category === selectedCategory);

  const handleEdit = (item: BudgetItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Omit<BudgetItem, 'id'>) => {
    if (editingItem) {
      updateBudgetItem(editingItem.id, itemData);
    } else {
      addBudgetItem(itemData);
      fireCelebrationConfetti();
    }
  };

  const statusBadges: Record<BudgetItem['status'], { label: string; class: string }> = {
    pending: { label: 'Pending', class: 'bg-slate-800 text-slate-300 border-slate-700' },
    deposit_paid: { label: 'Deposit Paid', class: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
    paid_in_full: { label: 'Paid in Full', class: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
    overdue: { label: 'Overdue', class: 'bg-rose-500/10 text-rose-300 border-rose-500/30' }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Budget Ceiling</div>
          <div className="text-2xl font-black text-white mt-2">
            ${event.totalBudget.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Configured maximum financial cap</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Committed / Actual</div>
          <div className={`text-2xl font-black mt-2 ${report.isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
            ${report.totalActual.toLocaleString()}
          </div>
          <div className="text-[11px] flex items-center gap-1 mt-1">
            {report.isOverBudget ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {report.variancePercentage}% over budget
              </span>
            ) : (
              <span className="text-emerald-400 font-medium">
                ${report.remainingBudget.toLocaleString()} buffer available
              </span>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Paid to Vendors</div>
          <div className="text-2xl font-black text-purple-400 mt-2">
            ${report.totalPaid.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Liability remaining: <strong className="text-slate-200">${report.unpaidLiability.toLocaleString()}</strong>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Cost Per Guest</div>
          <div className="text-2xl font-black text-sky-400 mt-2">
            ${costPerGuest.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Based on {event.targetGuestCount} planned attendees
          </p>
        </div>
      </div>

      {/* AI Smart Trade-Off Advisor */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-purple-400">
          <Lightbulb className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Aura Financial Trade-Off Engine
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
            >
              <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Distribution Breakdown */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Category Distribution Breakdown
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {report.categoryPercentages.length} active spending pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.categoryPercentages.map((cat) => (
            <div key={cat.category} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">{cat.category}</span>
                <span className="font-mono font-bold text-purple-300">{cat.percentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${Math.min(100, cat.percentage)}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-400 text-right">
                ${cat.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Items Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Expense Register &amp; Invoices</h3>
            <p className="text-xs text-slate-400">Detailed itemization of all contracts, vendor fees, and deposits</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Venue">Venue</option>
              <option value="Catering">Catering</option>
              <option value="Photo & Video">Photo &amp; Video</option>
              <option value="Music & AV">Music &amp; AV</option>
              <option value="Decor & Floral">Decor &amp; Floral</option>
              <option value="Stationery & Favors">Stationery</option>
              <option value="Contingency">Contingency</option>
            </select>

            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition shadow-md shadow-purple-900/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Item / Vendor</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Allocated</th>
                <th className="py-3 px-3">Actual Quote</th>
                <th className="py-3 px-3">Paid</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-100">{item.name}</div>
                    {item.notes && <div className="text-[11px] text-slate-400 truncate max-w-xs">{item.notes}</div>}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium">
                    {item.category}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    ${item.allocatedAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-100">
                    ${item.actualAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-400">
                    ${item.paidAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadges[item.status].class}`}>
                      {statusBadges[item.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBudgetItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No budget items found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        initialItem={editingItem}
      />
    </div>
  );
};
