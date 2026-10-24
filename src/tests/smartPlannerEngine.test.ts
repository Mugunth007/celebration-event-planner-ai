import { describe, it, expect } from 'vitest';
import { generateHeuristicResponse } from '../services/smartPlannerEngine';
import { PRESET_TEMPLATES } from '../data/presetTemplates';

describe('Autonomous Planner Heuristic Engine', () => {
  const template = PRESET_TEMPLATES[0];

  it('generates context-aware budget audit recommendations for budget prompts', () => {
    const res = generateHeuristicResponse(
      'Can you audit our budget and suggest ways to save money?',
      template.event,
      template.budgetItems,
      template.timelineItems,
      template.sampleGuests
    );

    expect(res.content).toContain('Budget Intelligence Audit');
    expect(res.content).toContain(template.event.title);
    expect(res.suggestedActions?.some(a => a.payload === 'budget')).toBe(true);
  });

  it('generates run-of-show schedule recommendations for timeline prompts', () => {
    const res = generateHeuristicResponse(
      'What should the timeline and run of show look like?',
      template.event,
      template.budgetItems,
      template.timelineItems,
      template.sampleGuests
    );

    expect(res.content).toContain('Strategic Run-of-Show Protocol');
    expect(res.content).toContain(template.event.startTime);
    expect(res.suggestedActions?.some(a => a.payload === 'timeline')).toBe(true);
  });

  it('generates a 2-minute speech and toast when requested', () => {
    const res = generateHeuristicResponse(
      'Write a toast speech for the reception',
      template.event,
      template.budgetItems,
      template.timelineItems,
      template.sampleGuests
    );

    expect(res.content).toContain('Toast & Welcome Script');
    expect(res.content).toContain('Good evening everyone');
  });

  it('generates weather contingencies for outdoor venues', () => {
    const res = generateHeuristicResponse(
      'What is our rain and emergency weather plan?',
      template.event,
      template.budgetItems,
      template.timelineItems,
      template.sampleGuests
    );

    expect(res.content).toContain('Weather Action Protocol');
    expect(res.content).toContain('Tenting');
  });
});
