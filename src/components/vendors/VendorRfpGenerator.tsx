import React, { useState } from 'react';
import {
  ClipboardCheck,
  Mail,
  Copy,
  Check,
  Trash2,
  CheckCircle2,
  Circle,
  Building,
  Camera,
  Music,
  Utensils,
  Flower2
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { ChecklistItem } from '../../types';
import { fireCelebrationConfetti } from '../common/ConfettiTrigger';

type VendorType = 'photo' | 'caterer' | 'dj' | 'floral' | 'venue';

export const VendorRfpGenerator: React.FC = () => {
  const { event, checklistItems, addChecklistItem, toggleChecklistComplete, deleteChecklistItem } = useEvent();

  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newPhase, setNewPhase] = useState<ChecklistItem['phase']>('1 Month');
  const [newAssignee, setNewAssignee] = useState('');

  const [vendorType, setVendorType] = useState<VendorType>('photo');
  const [vendorName, setVendorName] = useState('Artisan Visuals Studio');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const phases: ChecklistItem['phase'][] = [
    '6-12 Months',
    '2-3 Months',
    '1 Month',
    'Week Of',
    'Day Of',
    'Post Event'
  ];

  const filteredChecklist = selectedPhase === 'all'
    ? checklistItems
    : checklistItems.filter(c => c.phase === selectedPhase);

  const completedCount = checklistItems.filter(c => c.isCompleted).length;

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addChecklistItem({
      title: newTitle.trim(),
      phase: newPhase,
      assignedTo: newAssignee.trim() || undefined,
      isCompleted: false
    });
    setNewTitle('');
    setNewAssignee('');
    fireCelebrationConfetti();
  };

  const vendorConfig: Record<VendorType, { label: string; icon: React.ReactNode; specificRequirements: string }> = {
    photo: {
      label: 'Lead Photographer & Videographer',
      icon: <Camera className="w-4 h-4" />,
      specificRequirements: `We require coverage from ${event.startTime} through wrap-up, including candid documentary portraits, golden hour lighting session, and drone footage if permitted.`
    },
    caterer: {
      label: 'Fine Dining Catering & Beverage Service',
      icon: <Utensils className="w-4 h-4" />,
      specificRequirements: `We are planning for ${event.targetGuestCount} guests with several dietary accommodations (including vegan, celiac/gluten-free, and nut allergies). We would like pricing for hors d'oeuvres, main course service, and bar staff.`
    },
    dj: {
      label: 'Live DJ & Production Sound',
      icon: <Music className="w-4 h-4" />,
      specificRequirements: `We need high-fidelity wireless microphones for speeches, dance floor intelligent lighting, and customized musical curation aligned with our ${event.vibe} aesthetic.`
    },
    floral: {
      label: 'Florist & Decor Architect',
      icon: <Flower2 className="w-4 h-4" />,
      specificRequirements: `Our color palette centers around primary ${event.colorPalette.primary} and accent ${event.colorPalette.accent}. We need centerpieces, arch styling, and ambient tablescape florals.`
    },
    venue: {
      label: 'Venue Management & Site Director',
      icon: <Building className="w-4 h-4" />,
      specificRequirements: `Please confirm availability for ${event.date} from ${event.startTime} to ${event.endTime}, load-in policies, sound curfew, and weather rain-plan contingencies.`
    }
  };

  const currentVendor = vendorConfig[vendorType];

  const generatedRfpEmail = `Subject: Vendor Inquiry: ${event.title} (${event.date} - ${event.location})

Dear ${vendorName} Team,

I hope this message finds you well.

We are currently planning "${event.title}" and are inquiring about your availability and rates for ${event.date}.

EVENT SPECIFICATIONS:
• Celebration Vertical: ${event.vertical.toUpperCase()}
• Date: ${event.date}
• Hours: ${event.startTime} to ${event.endTime}
• Location: ${event.location} (${event.isOutdoor ? 'Outdoor Space' : 'Indoor Venue'})
• Target Guest Count: ${event.targetGuestCount} Attendees
• Theme & Aesthetic Vibe: ${event.vibe}

SERVICE REQUIREMENTS:
${currentVendor.specificRequirements}

Could you please confirm your availability for this date and send over your service brochure and package pricing? We are aiming to finalize vendor contracts within the coming weeks.

Thank you very much for your time and expertise, and we look forward to hearing from you!

Warm regards,
Event Coordination Team
CelebAura AI Orchestration Protocol`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generatedRfpEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="p-6 sm:p-8 rounded-3xl aceternity-card shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <ClipboardCheck className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">Milestone Checklist &amp; Vendor RFP Suite</h2>
          </div>
          <p className="text-xs text-neutral-400">
            {completedCount} of {checklistItems.length} milestone tasks completed • Automated vendor proposal inquiry generator
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
            {Math.round((completedCount / Math.max(1, checklistItems.length)) * 100)}% Readiness
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Milestone Checklist Tracker */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Planning Milestones
              </h3>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="px-3 py-1 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-200 focus:outline-none"
              >
                <option value="all">All Phases</option>
                {phases.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Checklist items list */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 text-xs ${
                    item.isCompleted
                      ? 'bg-neutral-950/40 border-white/[0.04] text-neutral-500'
                      : 'bg-white/[0.03] border-white/[0.08] text-neutral-200 hover:border-white/[0.16]'
                  }`}
                >
                  <button
                    onClick={() => toggleChecklistComplete(item.id)}
                    className="flex items-center gap-2.5 text-left flex-1"
                  >
                    {item.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-purple-400 shrink-0" />
                    )}
                    <span className={item.isCompleted ? 'line-through text-neutral-500' : 'font-medium'}>
                      {item.title}
                    </span>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-900 border border-white/[0.08] text-neutral-400">
                      {item.phase}
                    </span>
                    <button
                      onClick={() => deleteChecklistItem(item.id)}
                      className="p-1 text-neutral-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredChecklist.length === 0 && (
                <div className="p-6 text-center text-xs text-neutral-500">
                  No checklist items for this phase.
                </div>
              )}
            </div>

            {/* Add task form */}
            <form onSubmit={handleAddChecklist} className="pt-2 border-t border-white/[0.08] space-y-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add milestone task (e.g. Schedule cake tasting)..."
                className="w-full px-4 py-2 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-200 focus:outline-none focus:border-purple-500"
              />
              <div className="flex items-center gap-2">
                <select
                  value={newPhase}
                  onChange={(e) => setNewPhase(e.target.value as ChecklistItem['phase'])}
                  className="px-3 py-1.5 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-300"
                >
                  {phases.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  placeholder="Assignee (optional)"
                  className="flex-1 px-3 py-1.5 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-300"
                />

                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)] transition"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Vendor RFP Generator */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400">
                <Mail className="w-4 h-4" />
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Automated Vendor RFP Generator
                </h3>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-full transition shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied Email!' : 'Copy RFP Draft'}</span>
              </button>
            </div>

            {/* Vendor Category Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(vendorConfig) as VendorType[]).map((vKey) => (
                <button
                  key={vKey}
                  onClick={() => setVendorType(vKey)}
                  className={`p-3 rounded-2xl border text-xs font-semibold text-left transition flex items-center gap-2 ${
                    vendorType === vKey
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'bg-neutral-900 border-white/[0.08] text-neutral-400 hover:border-white/[0.18]'
                  }`}
                >
                  {vendorConfig[vKey].icon}
                  <span className="truncate">{vendorConfig[vKey].label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                Vendor Studio Name
              </label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Rendered RFP Email preview */}
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Generated Proposal Email (Ready to Send)
              </label>
              <textarea
                readOnly
                rows={11}
                value={generatedRfpEmail}
                className="w-full p-4 bg-black/60 border border-white/[0.08] rounded-2xl text-xs font-mono text-neutral-300 leading-relaxed focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
