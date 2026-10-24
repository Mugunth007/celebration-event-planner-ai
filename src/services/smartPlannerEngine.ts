import { EventDetails, BudgetItem, TimelineItem, Guest } from '../types';

export interface AssistantResponse {
  content: string;
  suggestedActions?: {
    label: string;
    actionType: 'apply_budget' | 'add_timeline' | 'set_theme' | 'open_tab';
    payload?: any;
  }[];
}

/**
 * Advanced autonomous planner heuristic engine.
 * Provides instant, rich, context-aware answers when operating in offline/demo mode,
 * or as a fallback for the Gemini API.
 */
export function generateHeuristicResponse(
  prompt: string,
  event: EventDetails,
  budgetItems: BudgetItem[],
  timelineItems: TimelineItem[],
  guests: Guest[]
): AssistantResponse {
  const query = prompt.toLowerCase();

  // 1. Budget & Cost Reduction Queries
  if (query.includes('budget') || query.includes('cost') || query.includes('money') || query.includes('save') || query.includes('expensive')) {
    const totalSpent = budgetItems.reduce((acc, i) => acc + (i.actualAmount || i.allocatedAmount || 0), 0);
    const diff = event.totalBudget - totalSpent;
    const isOver = diff < 0;

    let response = `### 💰 Budget Intelligence Audit for **${event.title}**\n\n`;
    response += `* **Total Cap:** $${event.totalBudget.toLocaleString()}\n`;
    response += `* **Current Allocated/Spent:** $${totalSpent.toLocaleString()}\n`;
    response += `* **Status:** ${isOver ? `⚠️ **Over budget by $${Math.abs(diff).toLocaleString()}**` : `✅ **Under budget with $${diff.toLocaleString()} remaining buffer**`}\n\n`;

    response += `#### High-Impact Optimization Tactics for ${event.vertical.toUpperCase()}:\n`;
    response += `1. **Catering Strategy:** Opt for roaming culinary stations or heavy hors d’oeuvres rather than 3-course plated service to save roughly 18-25% without sacrificing luxury.\n`;
    response += `2. **Floral & Greenery Balance:** Use cascading seasonal greenery (e.g. Italian ruscus, silver dollar eucalyptus) to add high visual volume at 40% lower cost than heavy imported florals.\n`;
    response += `3. **Bar Rationalization:** Feature 2 curated signature cocktails + craft beer & wine rather than a chaotic 20-bottle full open bar. This slashes waste by over 30%.\n`;
    response += `4. **Lighting Transformation:** Warm ambient pin-spot lighting and LED uplights transform spaces more dramatically than high-priced physical props.\n`;

    return {
      content: response,
      suggestedActions: [
        { label: 'View Budget Breakdown', actionType: 'open_tab', payload: 'budget' },
        { label: 'Check Beverage Math', actionType: 'open_tab', payload: 'hospitality' }
      ]
    };
  }

  // 2. Timeline & Run of Show Queries
  if (query.includes('timeline') || query.includes('schedule') || query.includes('run of show') || query.includes('order') || query.includes('time')) {
    let response = `### ⏱️ Strategic Run-of-Show Protocol for **${event.title}**\n\n`;
    response += `Event Window: **${event.startTime} – ${event.endTime}** | Location: **${event.location}**\n\n`;
    response += `Here is your optimal pacing architecture to prevent guest fatigue and maintain high energy:\n\n`;

    if (timelineItems.length > 0) {
      response += `#### Current Scheduled Milestones (${timelineItems.length} active):\n`;
      timelineItems.slice(0, 5).forEach(t => {
        response += `* **${t.time}** — ${t.title} *(Lead: ${t.leadPersonnel})*\n`;
      });
      if (timelineItems.length > 5) {
        response += `* *(...and ${timelineItems.length - 5} additional cues in timeline tab)*\n`;
      }
    } else {
      response += `* **T-120 Min:** Vendor Load-In, Sound Check, Florals & Ambient Lighting Set\n`;
      response += `* **Start Time (${event.startTime}):** Doors open, welcome aperitifs, ambient background audio\n`;
      response += `* **+45 Min:** Keynote / Ceremony / Main Welcome\n`;
      response += `* **+90 Min:** Dinner / Food Experience opens\n`;
      response += `* **+180 Min:** Speeches, Toasts, Cake or Dessert Presentation\n`;
      response += `* **-30 Min to End:** High-energy finale, last call, sparkler send-off\n`;
    }

    response += `\n> 💡 **Golden Master Tip:** Always protect a 15-minute "ghost buffer" right before major ceremonial speeches to account for late arrivals and mic handoffs!`;

    return {
      content: response,
      suggestedActions: [
        { label: 'Open Master Timeline', actionType: 'open_tab', payload: 'timeline' },
        { label: 'Add 15m Ghost Buffer', actionType: 'add_timeline', payload: { title: '15m Buffer & Mic Check', time: '17:30', category: 'logistics', leadPersonnel: 'Stage Coordinator' } }
      ]
    };
  }

  // 3. Speech / Toast Generator
  if (query.includes('speech') || query.includes('toast') || query.includes('words') || query.includes('script')) {
    let response = `### 🎙️ Bespoke 2-Minute Toast & Welcome Script\n\n`;
    response += `*(Pacing: 250 words, delivery time ~2.5 minutes with deliberate pauses for applause and laughter)*\n\n`;
    response += `> "Good evening everyone! Looking around this room at **${event.location}**, I am struck by how incredible it is to have so many remarkable people gathered together in one place.\n\n`;
    response += `> When we started planning this **${event.vertical}**, our single greatest wish wasn't just about the music or the venue—it was about this exact moment right here: the laughter, the stories, and celebrating shared memories with each of you.\n\n`;
    response += `> To our extraordinary guests who traveled from near and far: thank you for bringing your warmth, energy, and joy into this room tonight.\n\n`;
    response += `> So please, raise your glasses high with me: To life, to friendship, and to making memories tonight that we will never forget. Cheers!" 🥂\n\n`;
    response += `*Pro tip: Keep speech under 3 minutes; make eye contact with 3 different corners of the room.*`;

    return {
      content: response,
      suggestedActions: [
        { label: 'Review Run-of-Show Speeches', actionType: 'open_tab', payload: 'timeline' }
      ]
    };
  }

  // 4. Contingency & Rain / Weather Plan
  if (query.includes('weather') || query.includes('rain') || query.includes('backup') || query.includes('contingency') || query.includes('emergency')) {
    let response = `### 🌧️ Rapid Contingency & Weather Action Protocol\n\n`;
    response += `Venue Type: **${event.isOutdoor ? 'Outdoor Space (High Weather Exposure)' : 'Indoor Venue (Protected)'}**\n\n`;
    
    if (event.isOutdoor) {
      response += `#### Immediate Action Steps for Weather Defense:\n`;
      response += `1. **Tenting 72-Hour Trigger:** Decide with marquee supplier 72 hours out whether to install sidewalls or a clear-span roof.\n`;
      response += `2. **Pavement & Mud Protection:** Ensure covered walkways with sisal runner mats between parking, restrooms, and main tent.\n`;
      response += `3. **Power & AV Insulation:** Verify all DJ power cables, lighting ballasts, and audio extension chords have GFCI safety breakers and rubber cable bridges.\n`;
      response += `4. **Guest Comfort Kit:** Prep 30 transparent umbrella props (great for photos!), fleece lap throws in basket displays, and welcome hot spiced cider/tea.\n`;
    } else {
      response += `#### Indoor Contingency Safeguards:\n`;
      response += `1. **HVAC Check:** Confirm ballroom cooling/heating capacity for ${event.targetGuestCount} warm bodies.\n`;
      response += `2. **Sound Bleed & Echo:** Position speakers angled downward at 15° to prevent reverberation on hard glass/marble.\n`;
      response += `3. **Restroom Line Flow:** Place water dispensers away from main restroom entrances to eliminate bottlenecks.\n`;
    }

    return {
      content: response,
      suggestedActions: [
        { label: 'Check Contingency Budget', actionType: 'open_tab', payload: 'budget' }
      ]
    };
  }

  // 5. Signature Drink & Catering Recipes
  if (query.includes('drink') || query.includes('cocktail') || query.includes('mocktail') || query.includes('bar') || query.includes('wine') || query.includes('food')) {
    let response = `### 🍸 Curated Cocktail & Beverage Program for **${event.vibe}**\n\n`;
    response += `Designed for **${event.targetGuestCount} guests** with balanced speed-of-service and visual drama:\n\n`;
    response += `#### 1. Signature Cocktail: "The Velvet Twilight"\n`;
    response += `* **Ingredients:** Empress 1908 botanical gin, elderflower liqueur, freshly squeezed Meyer lemon, sparkling brut float.\n`;
    response += `* **Presentation:** Coupe glass with floating edible pansy & lemon twist. Dynamic color shift from royal indigo to soft violet upon pour!\n\n`;
    response += `#### 2. Signature Mocktail (Zero-Proof): "Golden Sunburst Spritz"\n`;
    response += `* **Ingredients:** Cold-pressed yuzu, white peach nectar, crushed rosemary sprig, fever-tree club soda.\n`;
    response += `* **Presentation:** Highball glass over crystal clear block ice with candied rosemary spear.\n\n`;
    response += `*Hospitality Bar Rule: Batch the base ingredients in advance so bartenders pour in under 15 seconds per drink.*`;

    return {
      content: response,
      suggestedActions: [
        { label: 'View Hospitality & Bar Calculator', actionType: 'open_tab', payload: 'hospitality' }
      ]
    };
  }

  // 6. Seating & Conflict Resolution
  if (query.includes('seat') || query.includes('table') || query.includes('guest') || query.includes('rsvp') || query.includes('conflict')) {
    const dietaryList = guests.filter(g => g.dietary && g.dietary !== 'none');
    let response = `### 🪑 Seating Optimization & Guest Dynamics Intelligence\n\n`;
    response += `* Total Registered Guests: **${guests.length}** | Target Capacity: **${event.targetGuestCount}**\n`;
    response += `* Dietary Accommodations Required: **${dietaryList.length} guests**\n\n`;
    response += `#### Master Placement Principles:\n`;
    response += `1. **VIP & Immediate Family:** Place Table 1 & 2 closest to the stage/center without blocking high-traffic server pathways.\n`;
    response += `2. **Acoustic Consideration:** Seat elderly guests and families with infants further away from direct line-of-sight to the main subwoofer/DJ speaker stack.\n`;
    response += `3. **Collision Avoidance:** Maintain at least 60 inches (5 feet) between round tables to allow servers carrying banquet trays to move effortlessly without brushing chairs.\n`;
    response += `4. **Dietary Flagging:** Table cards have special dietary badges so catering waitstaff know exact place settings without awkward questioning.\n`;

    return {
      content: response,
      suggestedActions: [
        { label: 'Open Seating Chart Planner', actionType: 'open_tab', payload: 'seating' }
      ]
    };
  }

  // 7. General Event Architecture Advisor
  let response = `### ✨ Master Event Planner Guidance for **${event.title}**\n\n`;
  response += `I am **Aura**, your Autonomous Event & Celebration Director. I have reviewed your current blueprint:\n\n`;
  response += `* **Vertical:** ${event.vertical.toUpperCase()} | **Vibe:** ${event.vibe}\n`;
  response += `* **Guests:** ${guests.length} / ${event.targetGuestCount} planned\n`;
  response += `* **Budget:** $${budgetItems.reduce((acc, i) => acc + (i.actualAmount || i.allocatedAmount || 0), 0).toLocaleString()} of $${event.totalBudget.toLocaleString()}\n`;
  response += `* **Timeline:** ${timelineItems.length} cues logged\n\n`;
  response += `How can I help you elevate this event right now?\n`;
  response += `- Ask me to **"audit our budget"** for hidden vendor fees.\n`;
  response += `- Ask me to **"optimize our run of show"** for seamless transitions.\n`;
  response += `- Ask me to **"write a custom invitation"** or **"draft a 2-minute toast"**.\n`;
  response += `- Ask me for **"cocktail recipes and beverage formulas"**.\n`;

  return {
    content: response,
    suggestedActions: [
      { label: 'Optimize Budget', actionType: 'open_tab', payload: 'budget' },
      { label: 'Check Run-of-Show', actionType: 'open_tab', payload: 'timeline' },
      { label: 'Generate Invites', actionType: 'open_tab', payload: 'invites' }
    ]
  };
}
