import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Palette
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';

type CopyTone = 'regal' | 'chic' | 'witty' | 'intimate';

export const InviteGenerator: React.FC = () => {
  const { event } = useEvent();

  const [tone, setTone] = useState<CopyTone>('regal');
  const [dressCode, setDressCode] = useState('Cocktail Attire / Black Tie Optional');
  const [rsvpDate, setRsvpDate] = useState('Two weeks prior to event');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const toneCopyMap: Record<CopyTone, { headline: string; body: string; signoff: string }> = {
    regal: {
      headline: `Together with their families, you are cordially invited to celebrate`,
      body: `An evening of distinction, celebration, and exquisite banquet hospitality in honor of ${event.title}. We request the pleasure of your esteemed company as we gather for an unforgettable milestone.`,
      signoff: `With warmest regards & anticipation`
    },
    chic: {
      headline: `Save the Date for an Extraordinary Night`,
      body: `We are bringing our favorite people together for an immersive evening of high vibrations, signature craft cocktails, and unforgettable music at ${event.location}.`,
      signoff: `Dress sharp. Arrive thirsty.`
    },
    witty: {
      headline: `The Rumors Are True: It’s Time to Party!`,
      body: `Mark your calendar for ${event.date} because good times, questionable dance moves, and top-shelf drinks await. We promise great food, loud music, and zero boring speeches.`,
      signoff: `Can’t wait to celebrate with you!`
    },
    intimate: {
      headline: `From our hearts to yours, join our celebration`,
      body: `Our story wouldn't be complete without you in it. Join us for a heartfelt gathering surrounded by candlelight, laughter, and lifelong memories at ${event.location}.`,
      signoff: `With all our love & gratitude`
    }
  };

  const currentCopy = toneCopyMap[tone];

  const fullInvitationText = `${currentCopy.headline.toUpperCase()}
${event.title}

Date: ${event.date}
Hours: ${event.startTime} - ${event.endTime}
Venue: ${event.location}
Vibe / Aesthetic: ${event.vibe}

${currentCopy.body}

Dress Code: ${dressCode}
RSVP Kindly By: ${rsvpDate}

${currentCopy.signoff}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullInvitationText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="p-6 sm:p-8 rounded-3xl aceternity-card shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">Invitation Suite &amp; Aesthetic Palette Studio</h2>
          </div>
          <p className="text-xs text-neutral-400">
            Generate bespoke copywriting in 4 narrative tones and inspect harmonious color design tokens.
          </p>
        </div>

        <button
          onClick={handleCopyText}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          {copiedText ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedText ? 'Copied Invitation!' : 'Copy Invitation Text'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Controls & Copywriting Options */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tone Selector */}
          <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Select Copywriting Tone
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'regal', label: '👑 Regal & Formal', desc: 'Opulent, grand, timeless' },
                { id: 'chic', label: '✨ Chic & Modern', desc: 'Contemporary, sleek vibe' },
                { id: 'witty', label: '🎉 Witty & Energetic', desc: 'Fun, humorous, bold' },
                { id: 'intimate', label: '🤍 Warm & Intimate', desc: 'Heartfelt, emotional' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id as CopyTone)}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col gap-1 ${
                    tone === t.id
                      ? 'bg-purple-950/40 border-purple-500 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                      : 'bg-neutral-900 border-white/[0.08] text-neutral-400 hover:border-white/[0.18]'
                  }`}
                >
                  <span className="font-bold text-xs text-neutral-200">{t.label}</span>
                  <span className="text-[10px] text-neutral-500">{t.desc}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                  RSVP Deadline
                </label>
                <input
                  type="text"
                  value={rsvpDate}
                  onChange={(e) => setRsvpDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/[0.08] rounded-full text-xs text-neutral-200 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Color Palette Palette Token Inspector */}
          <div className="p-6 sm:p-7 rounded-3xl aceternity-card shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Theme Palette: {event.colorPalette.name}
                </h3>
              </div>
              <span className="text-[10px] text-neutral-500">Click to copy hex</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Primary', hex: event.colorPalette.primary },
                { label: 'Secondary', hex: event.colorPalette.secondary },
                { label: 'Accent', hex: event.colorPalette.accent },
                { label: 'Background', hex: event.colorPalette.background },
                { label: 'Text', hex: event.colorPalette.text }
              ].map((c) => (
                <button
                  key={c.label}
                  onClick={() => handleCopyHex(c.hex)}
                  className="p-3 rounded-2xl bg-neutral-900 border border-white/[0.08] hover:border-white/[0.2] text-left transition space-y-1.5"
                >
                  <div
                    className="w-full h-8 rounded-xl border border-white/10 shadow-inner flex items-center justify-center text-[10px] font-bold text-white drop-shadow"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedHex === c.hex && 'Copied!'}
                  </div>
                  <div className="text-[10px] font-semibold text-neutral-300">{c.label}</div>
                  <div className="font-mono text-[10px] text-neutral-400">{c.hex}</div>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed italic">
              "{event.colorPalette.description}"
            </p>
          </div>
        </div>

        {/* Right Side: Live Invitation Card Mockup */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full max-w-lg p-[1px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-amber-400 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div
              className="w-full p-8 sm:p-12 rounded-[23px] text-center space-y-6 relative overflow-hidden backdrop-blur-2xl"
              style={{
                backgroundColor: event.colorPalette.background || '#09090b',
                color: event.colorPalette.text || '#F3F4F6',
                border: `1px solid ${event.colorPalette.secondary}40`
              }}
            >
              {/* Inner Decorative Double Border */}
              <div
                className="absolute inset-3 border rounded-2xl pointer-events-none opacity-40"
                style={{ borderColor: event.colorPalette.secondary }}
              />

              {/* Monogram / Top Icon */}
              <div className="flex justify-center">
                <div
                  className="w-12 h-12 rounded-full border flex items-center justify-center shadow-lg"
                  style={{
                    borderColor: event.colorPalette.secondary,
                    backgroundColor: `${event.colorPalette.primary}80`
                  }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: event.colorPalette.secondary }} />
                </div>
              </div>

              {/* Subtitle / Headline */}
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold"
                style={{ color: event.colorPalette.secondary }}
              >
                {currentCopy.headline}
              </p>

              {/* Main Title */}
              <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-wide leading-tight">
                {event.title}
              </h1>

              {/* Date & Details Badge */}
              <div
                className="py-3 px-6 rounded-2xl border inline-block mx-auto space-y-1 text-xs backdrop-blur-md"
                style={{
                  borderColor: `${event.colorPalette.secondary}30`,
                  backgroundColor: `${event.colorPalette.primary}40`
                }}
              >
                <div className="font-semibold tracking-wider uppercase">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-[11px] opacity-80 font-mono">
                  {event.startTime} — {event.endTime}
                </div>
              </div>

              {/* Venue */}
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-sm">{event.location}</div>
                <div className="text-[11px] opacity-75">{event.isOutdoor ? 'Outdoor Ceremony & Reception' : 'Indoor Climate-Controlled Setting'}</div>
              </div>

              {/* Body narrative */}
              <p className="text-xs leading-relaxed max-w-sm mx-auto opacity-90 italic">
                "{currentCopy.body}"
              </p>

              {/* Dress Code & RSVP Footer */}
              <div
                className="pt-4 border-t text-[11px] space-y-1 opacity-80"
                style={{ borderColor: `${event.colorPalette.secondary}30` }}
              >
                <div>Dress Code: <strong>{dressCode}</strong></div>
                <div>RSVP Kindly By: <strong>{rsvpDate}</strong></div>
                <div className="text-[10px] pt-1" style={{ color: event.colorPalette.secondary }}>
                  {currentCopy.signoff}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-neutral-500">
            Rendered live using your selected theme palette tokens and copywriting tone
          </div>
        </div>
      </div>
    </div>
  );
};
