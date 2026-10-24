import React, { useState } from 'react';
import {
  Wine,
  Beer,
  Sparkles,
  GlassWater,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Sliders,
  UtensilsCrossed
} from 'lucide-react';
import { useEvent } from '../../context/EventContext';
import { calculateBeverageRequirements, calculateDietaryBreakdown } from '../../services/hospitalityMath';

export const BeverageCalculator: React.FC = () => {
  const { event, guests } = useEvent();

  const [guestCount, setGuestCount] = useState<number>(event.targetGuestCount || 80);
  const [durationHours, setDurationHours] = useState<number>(5);
  const [isFullOpenBar, setIsFullOpenBar] = useState<boolean>(true);
  const [hasChampagneToast, setHasChampagneToast] = useState<boolean>(true);

  const plan = calculateBeverageRequirements(guestCount, durationHours, isFullOpenBar, hasChampagneToast);
  const dietary = calculateDietaryBreakdown(guests);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Introduction */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 mb-1">
            <Wine className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Hospitality &amp; Bar Beverage Calculator</h2>
          </div>
          <p className="text-xs text-slate-400">
            Formulated using hospitality industry algorithms: 2 drinks for hour 1, 1 drink/hour after, +8% safety margin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 border border-pink-500/30 text-pink-300">
            {isFullOpenBar ? 'Full Liquor & Wine Bar' : 'Beer & Wine Only'}
          </span>
        </div>
      </div>

      {/* Interactive Sliders & Options */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Guest Count Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 uppercase tracking-wider">
              Guest Count
            </label>
            <span className="font-mono font-bold text-white text-sm bg-slate-800 px-2.5 py-0.5 rounded-lg">
              {guestCount} guests
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="400"
            step="5"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Syncs with event capacity</span>
        </div>

        {/* Duration Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-slate-300 uppercase tracking-wider">
              Bar Service Hours
            </label>
            <span className="font-mono font-bold text-white text-sm bg-slate-800 px-2.5 py-0.5 rounded-lg">
              {durationHours} hours
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="9"
            step="0.5"
            value={durationHours}
            onChange={(e) => setDurationHours(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Typical reception: 4 to 6 hours</span>
        </div>

        {/* Bar Style Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Bar Program Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsFullOpenBar(true)}
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                isFullOpenBar
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Full Bar
            </button>
            <button
              type="button"
              onClick={() => setIsFullOpenBar(false)}
              className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                !isFullOpenBar
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Beer &amp; Wine
            </button>
          </div>
        </div>

        {/* Champagne Toast Toggle */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Ceremonial Toast Flutes
          </label>
          <button
            type="button"
            onClick={() => setHasChampagneToast(!hasChampagneToast)}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border transition flex items-center justify-center gap-2 ${
              hasChampagneToast
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hasChampagneToast ? 'Champagne Toast Enabled' : 'No Toast Planned'}</span>
          </button>
        </div>
      </div>

      {/* Calculated Inventory Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Drinks */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Drinks</span>
          <div className="text-2xl font-black text-white">{plan.totalDrinks}</div>
          <span className="text-[10px] text-slate-500">Total servings</span>
        </div>

        {/* Wine Bottles */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center text-pink-400 mb-0.5">
            <Wine className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wine Bottles</span>
          <div className="text-2xl font-black text-pink-400">{plan.wineBottles}</div>
          <span className="text-[10px] text-slate-500">750ml bottles (5 pours)</span>
        </div>

        {/* Beer Cases */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center text-amber-400 mb-0.5">
            <Beer className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Beer Cases</span>
          <div className="text-2xl font-black text-amber-400">{plan.beerCases}</div>
          <span className="text-[10px] text-slate-500">24-bottle cases</span>
        </div>

        {/* Liquor Bottles */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center text-indigo-400 mb-0.5">
            <GlassWater className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Liquor Bottles</span>
          <div className="text-2xl font-black text-indigo-400">{plan.liquorBottles}</div>
          <span className="text-[10px] text-slate-500">750ml (16 pours)</span>
        </div>

        {/* Champagne Flutes */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center text-amber-300 mb-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Toast Bottles</span>
          <div className="text-2xl font-black text-amber-300">{plan.champagneToastBottles}</div>
          <span className="text-[10px] text-slate-500">Brut / Prosecco</span>
        </div>

        {/* Ice & Glassware */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ice Required</span>
          <div className="text-2xl font-black text-sky-400">{plan.iceLbs} lbs</div>
          <span className="text-[10px] text-slate-500">{plan.glasswareEstimate} glasses needed</span>
        </div>
      </div>

      {/* Signature Cocktails & Dietary Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Curated Signature Recipes */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Flame className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Signature Cocktails for {event.vibe}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Signature Alcoholic Cocktail</span>
                <span className="text-[10px] font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                  Coupe Glass
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{plan.signatureCocktail}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empress 1908 botanical gin or bourbon, house lavender-thyme syrup, fresh Meyer lemon, sparkling prosecco floater. Fast 15-second pour rate per guest.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-300">Signature Non-Alcoholic Mocktail</span>
                <span className="text-[10px] font-semibold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                  Collins Glass
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{plan.signatureMocktail}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Japanese yuzu nectar, white peach essence, slapped rosemary sprig, fever-tree sparkling club soda over clear block ice. Zero-proof luxury elegance.
              </p>
            </div>
          </div>
        </div>

        {/* Dietary & Allergy Matrix for Kitchen */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400">
              <UtensilsCrossed className="w-5 h-5" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Catering Dietary &amp; Allergy Matrix
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {dietary.confirmedGuests} Confirmed Attendees
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-lg font-bold text-white">{dietary.dietaryCounts.standard || 0}</span>
              <p className="text-[10px] text-slate-400">Standard</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-lg font-bold text-emerald-400">
                {(dietary.dietaryCounts.vegan || 0) + (dietary.dietaryCounts.vegetarian || 0)}
              </span>
              <p className="text-[10px] text-slate-400">Plant-Based</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-lg font-bold text-amber-400">{dietary.dietaryCounts.gluten_free || 0}</span>
              <p className="text-[10px] text-slate-400">Gluten-Free</p>
            </div>
          </div>

          {dietary.allergiesList.length > 0 ? (
            <div className="p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-2xl text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Allergy Alert ({dietary.allergiesList.length} guests):</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                {dietary.allergiesList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>No severe nut or celiac allergies logged in current roster.</span>
            </div>
          )}

          <p className="text-[11px] text-slate-500 italic">
            *Hospitality Guideline: Prepare 5% spare plant-based and gluten-free plates for last-minute guest requests.*
          </p>
        </div>
      </div>
    </div>
  );
};
