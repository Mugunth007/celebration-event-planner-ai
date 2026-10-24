import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Sparkles, CloudRain, ShieldCheck, Edit3 } from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { fireFireworksConfetti } from '../common/ConfettiTrigger';
import { EventSetupModal } from './EventSetupModal';

export const EventHero: React.FC = () => {
  const { event } = useEvent();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const eventDateTime = new Date(`${event.date}T${event.startTime || '18:00'}:00`).getTime();
      const now = new Date().getTime();
      const diff = eventDateTime - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.date, event.startTime]);

  return (
    <div className="relative overflow-hidden rounded-3xl aceternity-card p-6 sm:p-10 shadow-2xl">
      {/* Aceternity Spotlight Orb */}
      <div
        className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ backgroundColor: event.colorPalette.secondary || '#a855f7' }}
      />
      <div
        className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ backgroundColor: event.colorPalette.primary || '#6366f1' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Side: Title & Key Metadata */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-purple-500/10 text-purple-300 border border-purple-500/25 flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              {event.vertical.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] text-neutral-300 border border-white/[0.08] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: event.colorPalette.secondary }} />
              {event.vibe}
            </span>
            {event.isOutdoor ? (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-amber-400" />
                Outdoor Weather Guard Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Indoor Climate Protected
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>{event.startTime} – {event.endTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {event.primaryNotes && (
            <p className="text-xs sm:text-sm text-neutral-400 italic line-clamp-2 max-w-xl">
              "{event.primaryNotes}"
            </p>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-neutral-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-full transition shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Blueprint
            </button>
            <button
              onClick={fireFireworksConfetti}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-full transition shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              🎉 Celebrate
            </button>
          </div>
        </div>

        {/* Right Side: Live Countdown Clocks (Aceternity Bento Style) */}
        <div className="flex flex-col items-start lg:items-end gap-2 bg-black/40 p-6 rounded-2xl border border-white/[0.08] backdrop-blur-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            T-Minus Countdown
          </div>
          <div className="grid grid-cols-4 gap-2.5 text-center mt-1">
            <div className="bg-neutral-900/90 border border-white/[0.08] rounded-xl px-3.5 py-2.5 min-w-[62px]">
              <span className="block text-2xl font-black text-white tracking-tight">{timeLeft.days}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Days</span>
            </div>
            <div className="bg-neutral-900/90 border border-white/[0.08] rounded-xl px-3.5 py-2.5 min-w-[62px]">
              <span className="block text-2xl font-black text-white tracking-tight">{timeLeft.hours}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Hours</span>
            </div>
            <div className="bg-neutral-900/90 border border-white/[0.08] rounded-xl px-3.5 py-2.5 min-w-[62px]">
              <span className="block text-2xl font-black text-white tracking-tight">{timeLeft.minutes}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Mins</span>
            </div>
            <div className="bg-neutral-900/90 border border-white/[0.08] rounded-xl px-3.5 py-2.5 min-w-[62px]">
              <span className="block text-2xl font-black text-purple-400 tracking-tight">{timeLeft.seconds}</span>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold">Secs</span>
            </div>
          </div>
          <p className="text-[10px] text-neutral-500 text-right mt-1 font-mono">
            Synchronized with venue call-time
          </p>
        </div>
      </div>

      <EventSetupModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};
