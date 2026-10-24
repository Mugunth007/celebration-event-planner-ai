import { BeveragePlan, BudgetItem, Guest } from '../types';

/**
 * Calculates event beverage and bar stock requirements using
 * industry standard hospitality formulas (1.5 drinks/guest/hour baseline).
 */
export function calculateBeverageRequirements(
  guestCount: number,
  durationHours: number,
  isFullOpenBar: boolean = true,
  hasChampagneToast: boolean = true
): BeveragePlan {
  const safeGuests = Math.max(1, guestCount);
  const safeHours = Math.max(1, durationHours);

  // Industry hospitality standard: 2 drinks first hour, 1 drink each subsequent hour
  const drinksFirstHour = safeGuests * 2;
  const drinksRemainingHours = safeGuests * (safeHours - 1) * 1.0;
  const rawTotalDrinks = Math.round(drinksFirstHour + drinksRemainingHours);

  // Buffer multiplier (1.10 for 10% safety margin)
  const totalDrinks = Math.round(rawTotalDrinks * 1.08);

  let wineBottles: number;
  let beerCases: number;
  let liquorBottles: number;

  if (isFullOpenBar) {
    // 45% Wine, 30% Beer, 25% Liquor
    const wineDrinks = totalDrinks * 0.45;
    const beerDrinks = totalDrinks * 0.30;
    const liquorDrinks = totalDrinks * 0.25;

    wineBottles = Math.ceil(wineDrinks / 5); // 5 standard 5oz glasses per 750ml bottle
    beerCases = Math.ceil(beerDrinks / 24); // 24 bottles/cans per case
    liquorBottles = Math.ceil(liquorDrinks / 16); // 16 1.5oz pours per 750ml bottle
  } else {
    // Wine & Beer only: 60% Wine, 40% Beer
    const wineDrinks = totalDrinks * 0.60;
    const beerDrinks = totalDrinks * 0.40;

    wineBottles = Math.ceil(wineDrinks / 5);
    beerCases = Math.ceil(beerDrinks / 24);
    liquorBottles = 0;
  }

  // Champagne toast: 1 flute per guest, 6 flutes per 750ml bottle + 10% overage
  const champagneToastBottles = hasChampagneToast
    ? Math.ceil((safeGuests * 1.1) / 6)
    : 0;

  // Ice: 1.5 lbs per person for drinks + 25 lbs buffer for wine coolers
  const iceLbs = Math.round(safeGuests * 1.5 + 25);

  // Glassware: 1.5 glasses per person per bar station to allow for refreshed glasses
  const glasswareEstimate = Math.round(safeGuests * 1.6);

  return {
    totalDrinks,
    wineBottles,
    beerCases,
    liquorBottles,
    champagneToastBottles,
    iceLbs,
    glasswareEstimate,
    signatureMocktail: 'Sparkling Lavender Yuzu Spritz (Non-Alcoholic)',
    signatureCocktail: 'Smoked Rosemary French 75 / Spiced Velvet Old Fashioned'
  };
}

export interface BudgetHealthReport {
  totalBudget: number;
  totalAllocated: number;
  totalActual: number;
  totalPaid: number;
  remainingBudget: number;
  unpaidLiability: number;
  variancePercentage: number;
  isOverBudget: boolean;
  categoryPercentages: { category: string; amount: number; percentage: number }[];
  recommendations: string[];
}

/**
 * Analyzes budget health, flags category deviations against industry benchmarks,
 * and generates logical cost-saving trade-offs.
 */
export function analyzeBudgetHealth(
  totalBudget: number,
  items: BudgetItem[]
): BudgetHealthReport {
  const totalAllocated = items.reduce((sum, item) => sum + (item.allocatedAmount || 0), 0);
  const totalActual = items.reduce((sum, item) => sum + (item.actualAmount || item.allocatedAmount || 0), 0);
  const totalPaid = items.reduce((sum, item) => sum + (item.paidAmount || 0), 0);

  const remainingBudget = totalBudget - totalActual;
  const unpaidLiability = totalActual - totalPaid;
  const variancePercentage = totalBudget > 0 ? Math.round(((totalActual - totalBudget) / totalBudget) * 100) : 0;
  const isOverBudget = totalActual > totalBudget;

  // Category breakdown
  const categoryMap = new Map<string, number>();
  items.forEach(item => {
    const current = categoryMap.get(item.category) || 0;
    categoryMap.set(item.category, current + (item.actualAmount || item.allocatedAmount || 0));
  });

  const categoryPercentages = Array.from(categoryMap.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalActual > 0 ? Math.round((amount / totalActual) * 100) : 0
  })).sort((a, b) => b.amount - a.amount);

  // Smart trade-off recommendations
  const recommendations: string[] = [];

  if (isOverBudget) {
    const deficit = totalActual - totalBudget;
    recommendations.push(
      `Budget deficit of $${deficit.toLocaleString()} detected. Consider adjusting high-weight categories below.`
    );
  }

  const cateringEntry = categoryPercentages.find(c => c.category === 'Catering');
  if (cateringEntry && cateringEntry.percentage > 42) {
    recommendations.push(
      `Catering accounts for ${cateringEntry.percentage}% of spending. Shifting from plated 3-course to interactive culinary stations can reduce costs by 15-20% without sacrificing luxury feel.`
    );
  }

  const venueEntry = categoryPercentages.find(c => c.category === 'Venue');
  if (venueEntry && venueEntry.percentage > 45) {
    recommendations.push(
      `Venue cost is ${venueEntry.percentage}%. Inquire if Friday or Sunday dates offer a 20-30% reduction, or if table/chair rentals are bundled.`
    );
  }

  const contingencyItem = items.find(i => i.category === 'Contingency');
  if (!contingencyItem || contingencyItem.allocatedAmount < totalBudget * 0.05) {
    recommendations.push(
      'Healthy events maintain a 5% to 10% Contingency Reserve for last-minute guest additions, weather adjustments, or overtime fees.'
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Budget allocation is well-balanced across standard hospitality ratios! You are within your target limits.'
    );
  }

  return {
    totalBudget,
    totalAllocated,
    totalActual,
    totalPaid,
    remainingBudget,
    unpaidLiability,
    variancePercentage,
    isOverBudget,
    categoryPercentages,
    recommendations
  };
}

export interface DietarySummary {
  totalGuests: number;
  confirmedGuests: number;
  dietaryCounts: Record<string, number>;
  allergiesList: string[];
}

/**
 * Computes dietary ratios and food allergy alert summaries for catering teams.
 */
export function calculateDietaryBreakdown(guests: Guest[]): DietarySummary {
  const confirmed = guests.filter(g => g.rsvpStatus === 'confirmed');
  const counts: Record<string, number> = {
    standard: 0,
    vegan: 0,
    vegetarian: 0,
    halal: 0,
    kosher: 0,
    gluten_free: 0,
    nut_allergy: 0
  };

  const allergiesList: string[] = [];

  guests.forEach(guest => {
    if (guest.rsvpStatus !== 'declined') {
      const d = guest.dietary || 'none';
      if (d === 'none') {
        counts.standard++;
      } else {
        if (counts[d] !== undefined) {
          counts[d]++;
        } else {
          counts[d] = 1;
        }
        if (d === 'nut_allergy' || d === 'gluten_free') {
          allergiesList.push(`${guest.name} (${d.replace('_', ' ')})`);
        }
      }
    }
  });

  return {
    totalGuests: guests.length,
    confirmedGuests: confirmed.length,
    dietaryCounts: counts,
    allergiesList
  };
}
