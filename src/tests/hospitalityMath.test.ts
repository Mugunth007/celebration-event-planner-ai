import { describe, it, expect } from 'vitest';
import {
  calculateBeverageRequirements,
  analyzeBudgetHealth,
  calculateDietaryBreakdown
} from '../services/hospitalityMath';
import { BudgetItem, Guest } from '../types';

describe('Hospitality Math & Beverage Calculator', () => {
  it('correctly calculates drink requirements for 100 guests across 5 hours (full bar)', () => {
    const plan = calculateBeverageRequirements(100, 5, true, true);

    // 100 guests * 2 (first hour) + 100 * 4 = 600 base drinks * 1.08 buffer = ~648 drinks
    expect(plan.totalDrinks).toBeGreaterThanOrEqual(600);
    expect(plan.wineBottles).toBeGreaterThan(0);
    expect(plan.beerCases).toBeGreaterThan(0);
    expect(plan.liquorBottles).toBeGreaterThan(0);
    // Champagne toast: (100 * 1.1) / 6 = ~19 bottles
    expect(plan.champagneToastBottles).toBe(19);
    // Ice: 100 * 1.5 + 25 = 175 lbs
    expect(plan.iceLbs).toBe(175);
    // Glassware: 100 * 1.6 = 160 glasses
    expect(plan.glasswareEstimate).toBe(160);
  });

  it('correctly sets liquor bottles to 0 when in beer & wine mode', () => {
    const plan = calculateBeverageRequirements(50, 4, false, false);
    expect(plan.liquorBottles).toBe(0);
    expect(plan.champagneToastBottles).toBe(0);
    expect(plan.wineBottles).toBeGreaterThan(0);
    expect(plan.beerCases).toBeGreaterThan(0);
  });
});

describe('Budget Health & Trade-Off Engine', () => {
  const sampleItems: BudgetItem[] = [
    { id: '1', category: 'Venue', name: 'Ballroom', allocatedAmount: 10000, actualAmount: 12000, paidAmount: 5000, status: 'deposit_paid' },
    { id: '2', category: 'Catering', name: 'Dinner', allocatedAmount: 10000, actualAmount: 15000, paidAmount: 5000, status: 'deposit_paid' },
    { id: '3', category: 'Photo & Video', name: 'Photo', allocatedAmount: 3000, actualAmount: 3000, paidAmount: 3000, status: 'paid_in_full' }
  ];

  it('detects over-budget variance and flags high catering percentage', () => {
    const report = analyzeBudgetHealth(25000, sampleItems);

    expect(report.isOverBudget).toBe(true);
    expect(report.totalActual).toBe(30000);
    expect(report.remainingBudget).toBe(-5000);
    expect(report.variancePercentage).toBe(20);
    // Catering is 15000 / 30000 = 50%, which is > 42%
    expect(report.recommendations.some(r => r.includes('Catering accounts for 50%'))).toBe(true);
    // Flags missing contingency
    expect(report.recommendations.some(r => r.includes('Contingency Reserve'))).toBe(true);
  });

  it('reports healthy budget when actuals remain within cap', () => {
    const report = analyzeBudgetHealth(35000, sampleItems);
    expect(report.isOverBudget).toBe(false);
    expect(report.remainingBudget).toBe(5000);
  });
});

describe('Dietary Ratios & Allergy Summary', () => {
  const sampleGuests: Guest[] = [
    { id: 'g1', name: 'Alice', group: 'vip', rsvpStatus: 'confirmed', dietary: 'vegan' },
    { id: 'g2', name: 'Bob', group: 'family', rsvpStatus: 'confirmed', dietary: 'nut_allergy' },
    { id: 'g3', name: 'Charlie', group: 'friends', rsvpStatus: 'confirmed', dietary: 'gluten_free' },
    { id: 'g4', name: 'David', group: 'friends', rsvpStatus: 'confirmed', dietary: 'none' },
    { id: 'g5', name: 'Eve', group: 'colleagues', rsvpStatus: 'declined', dietary: 'vegan' }
  ];

  it('isolates critical allergies and counts confirmed dietary meals', () => {
    const summary = calculateDietaryBreakdown(sampleGuests);

    expect(summary.totalGuests).toBe(5);
    expect(summary.confirmedGuests).toBe(4);
    expect(summary.allergiesList.length).toBe(2);
    expect(summary.allergiesList.some(a => a.includes('Bob') && a.includes('nut allergy'))).toBe(true);
    expect(summary.dietaryCounts.vegan).toBe(1);
    expect(summary.dietaryCounts.standard).toBe(1);
  });
});
