import { EventDetails, BudgetItem, TimelineItem, Guest } from '../types';
import { generateHeuristicResponse, AssistantResponse } from './smartPlannerEngine';

const GEMINI_API_KEY_STORAGE = 'celebraite_gemini_api_key';
const GEMINI_MODEL_STORAGE = 'celebraite_gemini_model';

export const SUPPORTED_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Recommended - Ultra Fast & Dynamic)' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Fast & Balanced)' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Standard)' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Reasoning & Complex Planning)' }
];

export function getStoredApiKey(): string {
  try {
    return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function saveStoredApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    }
  } catch (err) {
    console.error('Failed to save API key', err);
  }
}

export function getStoredModel(): string {
  try {
    return localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-2.5-flash';
  } catch {
    return 'gemini-2.5-flash';
  }
}

export function saveStoredModel(model: string): void {
  try {
    localStorage.setItem(GEMINI_MODEL_STORAGE, model);
  } catch (err) {
    console.error('Failed to save model', err);
  }
}

/**
 * Builds the comprehensive system instruction that informs the AI
 * of the user's specific celebration context, budget, guests, and theme.
 */
function buildSystemInstruction(
  event: EventDetails,
  budgetItems: BudgetItem[],
  timelineItems: TimelineItem[],
  guests: Guest[]
): string {
  const totalSpent = budgetItems.reduce((acc, i) => acc + (i.actualAmount || i.allocatedAmount || 0), 0);
  const confirmedGuests = guests.filter(g => g.rsvpStatus === 'confirmed').length;

  return `You are Aura, an elite, world-class Celebration & Event Director and Autonomous Hospitality Strategist.
You possess deep expertise in weddings, milestone celebrations, luxury galas, corporate summits, and intimate parties.
Your tone is poised, warm, inspiring, and intensely practical. You balance high-aesthetic vision with rigorous operational logistics (budget math, vendor management, guest flow, acoustic/lighting physics, and contingency planning).

CURRENT EVENT BLUEPRINT:
- Title: "${event.title}"
- Vertical: ${event.vertical}
- Vibe / Aesthetic: ${event.vibe}
- Date: ${event.date} | Schedule: ${event.startTime} to ${event.endTime}
- Venue / Setting: ${event.location} (${event.isOutdoor ? 'Outdoor / High weather sensitivity' : 'Indoor Protected'})
- Financial Cap: $${event.totalBudget.toLocaleString()} (Current Allocated/Actual: $${totalSpent.toLocaleString()})
- Target Guest Count: ${event.targetGuestCount} (Confirmed: ${confirmedGuests}, Total in Roster: ${guests.length})
- Color Palette: Primary ${event.colorPalette.primary}, Accent ${event.colorPalette.accent}
- Core Notes: ${event.primaryNotes || 'None specified'}

INSTRUCTIONS:
1. Always base your advice on this specific event's context and constraints.
2. Provide crisp, structured Markdown responses with bullet points, bold headers, and actionable takeaways.
3. Suggest practical cost trade-offs, contingency precautions, and hospitality tips.
4. Keep advice concise, punchy, and enjoyable to read.`;
}

/**
 * Sends a message to the Gemini API or gracefully falls back to the smart heuristic engine.
 */
export async function sendChatMessage(
  prompt: string,
  event: EventDetails,
  budgetItems: BudgetItem[],
  timelineItems: TimelineItem[],
  guests: Guest[],
  history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
): Promise<AssistantResponse> {
  const apiKey = getStoredApiKey();
  const selectedModel = getStoredModel();

  // If no API key is provided, use the instant smart heuristic engine
  if (!apiKey) {
    return generateHeuristicResponse(prompt, event, budgetItems, timelineItems, guests);
  }

  try {
    const systemInstruction = buildSystemInstruction(event, budgetItems, timelineItems, guests);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

    const contents = [
      ...history,
      {
        role: 'user',
        parts: [{ text: `${systemInstruction}\n\nUSER INQUIRY: ${prompt}` }]
      }
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.warn('Gemini API call failed, falling back to smart heuristics:', errData);
      return generateHeuristicResponse(prompt, event, budgetItems, timelineItems, guests);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return generateHeuristicResponse(prompt, event, budgetItems, timelineItems, guests);
    }

    return {
      content: candidateText,
      suggestedActions: [
        { label: 'Check Budget', actionType: 'open_tab', payload: 'budget' },
        { label: 'View Timeline', actionType: 'open_tab', payload: 'timeline' }
      ]
    };
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    return generateHeuristicResponse(prompt, event, budgetItems, timelineItems, guests);
  }
}
