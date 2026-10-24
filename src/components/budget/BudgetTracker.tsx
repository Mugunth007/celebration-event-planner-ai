import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  Lightbulb,
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
    pending: { label: 'Pending', class: 'bg-neutral-800 text-neutral-300 border-neutral-700' },
    deposit_paid: { label: 'Deposit Paid', class: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
    paid_in_full: { label: 'Paid in Full', class: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
    overdue: { label: 'Overdue', class: 'bg-rose-500/10 text-rose-300 border-rose-500/30' }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl aceternity-card shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Total Budget Ceiling</div>
          <div className="text-3xl font-black text-white mt-2 tracking-tight">
            ${event.totalBudget.toLocaleString()}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">Configured maximum financial cap</p>
        </div>

        <div className="p-6 rounded-3xl aceternity-card shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Committed / Actual</div>
          <div className={`text-3xl font-black mt-2 tracking-tight ${report.isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
            ${report.totalActual.toLocaleString()}
          </div>
          <div className="text-[11px] flex items-center gap-1 mt-1 font-medium">
            {report.isOverBudget ? (
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {report.variancePercentage}% over budget
              </span>
            ) : (
              <span className="text-emerald-400">
                ${report.remainingBudget.toLocaleString()} buffer available
              </span>
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl aceternity-card shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Paid to Vendors</div>
          <div className="text-3xl font-black text-purple-400 mt-2 tracking-tight">
            ${report.totalPaid.toLocaleString()}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Liability remaining: <strong className="text-neutral-200">${report.unpaidLiability.toLocaleString()}</strong>
          </p>
        </div>

        <div className="p-6 rounded-3xl aceternity-card shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Cost Per Guest</div>
          <div className="text-3xl font-black text-sky-400 mt-2 tracking-tight">
            ${costPerGuest.toLocaleString()}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Based on {event.targetGuestCount} planned attendees
          </p>
        </div>
      </div>

      {/* AI Smart Trade-Off Advisor */}
      <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
        <div className="flex items-center gap-2.5 text-purple-400">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/25">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Aura Financial Trade-Off Engine
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {report.recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-neutral-300 flex items-start gap-3 hover:border-white/[0.16] transition"
            >
              <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5 border border-purple-500/20">
                <TrendingDown className="w-3.5 h-3.5" />
              </div>
              <p className="leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Distribution Breakdown */}
      <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Category Distribution Breakdown
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            {report.categoryPercentages.length} active spending pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {report.categoryPercentages.map((cat) => (
            <div key={cat.category} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] space-y-2 transition">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">{cat.category}</span>
                <span className="font-mono font-bold text-purple-300">{cat.percentage}%</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${Math.min(100, cat.percentage)}%` }}
                />
              </div>
              <div className="text-[11px] text-neutral-400 text-right font-mono">
                ${cat.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Items Table */}
      <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Expense Register &amp; Invoices</h3>
            <p className="text-xs text-neutral-400">Detailed itemization of all contracts, vendor fees, and deposits</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-1.5 bg-neutral-900 border border-white/[0.1] rounded-full text-xs text-neutral-200 focus:outline-none"
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
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-full transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-3">Item / Vendor</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Allocated</th>
                <th className="py-3.5 px-3">Actual Quote</th>
                <th className="py-3.5 px-3">Paid</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.03] transition">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-neutral-100">{item.name}</div>
                    {item.notes && <div className="text-[11px] text-neutral-400 truncate max-w-xs">{item.notes}</div>}
                  </td>
                  <td className="py-3.5 px-3 text-neutral-300 font-medium">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-neutral-400">
                    ${item.allocatedAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-white">
                    ${item.actualAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-400 font-semibold">
                    ${item.paidAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadges[item.status].class}`}>
                      {statusBadges[item.status].label}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right space-x-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteBudgetItem(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-neutral-500">
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
