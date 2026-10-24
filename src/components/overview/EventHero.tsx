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
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 p-6 sm:p-8 shadow-2xl">
      {/* Decorative ambient gradient backdrop */}
      <div
        className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: event.colorPalette.secondary || '#a855f7' }}
      />
      <div
        className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: event.colorPalette.primary || '#6366f1' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Title & Key Metadata */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {event.vertical.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: event.colorPalette.secondary }} />
              {event.vibe}
            </span>
            {event.isOutdoor ? (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-amber-400" />
                Outdoor Weather Guard Active
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Indoor Climate Protected
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{event.location}</span>
            </div>
          </div>

          {event.primaryNotes && (
            <p className="text-xs sm:text-sm text-slate-400 italic line-clamp-2">
              "{event.primaryNotes}"
            </p>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setIsEditOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Blueprint
            </button>
            <button
              onClick={fireFireworksConfetti}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition"
            >
              🎉 Celebrate
            </button>
          </div>
        </div>

        {/* Right Side: Live Countdown Clocks */}
        <div className="flex flex-col items-start lg:items-end gap-2 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
            T-Minus Countdown
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-w-[56px]">
              <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.days}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Days</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-w-[56px]">
              <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.hours}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-w-[56px]">
              <span className="block text-xl sm:text-2xl font-black text-white">{timeLeft.minutes}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 min-w-[56px]">
              <span className="block text-xl sm:text-2xl font-black text-purple-400">{timeLeft.seconds}</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Secs</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-right mt-1">
            Real-time synchronization with venue call time
          </p>
        </div>
      </div>

      <EventSetupModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};
