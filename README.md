# 🌟 CelebAura AI — Autonomous Celebration & Event Planner
> **Virtual Prompt Wars 2026 — [Challenge 5] Celebration & Event Planner**  
> *A smart, context-driven AI orchestration engine designed to turn high-level celebration visions into operationally flawless reality.*

[![CI Test & Build](https://github.com/Mugunth007/celebration-event-planner-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/Mugunth007/celebration-event-planner-ai/actions/workflows/ci.yml)
[![Tests Passing](https://img.shields.io/badge/Vitest-9%2F9%20Passing-success)](https://github.com/Mugunth007/celebration-event-planner-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Google Cloud Run](https://img.shields.io/badge/Deployed%20on-Google%20Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)](https://celebraite-ai-877598034358.us-central1.run.app)

---

## 🎯 Chosen Vertical & Persona

### Vertical
**[Challenge 5] Celebration & Event Planner**  
Spanning weddings, milestone jubilees, corporate summits & galas, baby showers, anniversaries, and themed festival gatherings.

### AI Persona: "Aura" — Master Celebration Director
Unlike generic chatbots that output superficial lists, **Aura** operates as an elite, high-touch event architect and hospitality director. Aura balances:
1. **Aesthetic Vision:** Theme curation, color design tokens, tone-matched invitations, and sensory atmosphere.
2. **Ruthless Operational Logistics:** Dynamic budget trade-off analysis, hospitality beverage algorithms, run-of-show minute-by-minute cues, and seating collision avoidance.
3. **Dual-Intelligence Engine:**
   - **Google Gemini API Support** (Gemini 2.5 Flash, 2.0 Flash, 1.5 Pro) for dynamic, open-ended conversational planning and live prompt execution.
   - **Autonomous Offline Heuristic Engine** that works immediately with zero configuration or API key, providing instant hospitality math, toast scripts, and contingency plans.
4. **Google Sign-In & User Identity:**
   - Seamless one-click authentication with Google profile integration (name, email, avatar).
   - Session persistence and custom Google OAuth 2.0 Client ID support.

---

## ✨ Key Features & Real-World Usability

```
                       ┌────────────────────────────────────────┐
                       │             CelebAura AI               │
                       │     Autonomous Event Orchestrator      │
                       └──────────────────┬─────────────────────┘
                                          │
    ┌──────────────────┬──────────────────┼──────────────────┬──────────────────┐
    │                  │                  │                  │                  │
┌───▼────┐       ┌─────▼────┐       ┌─────▼────┐       ┌─────▼────┐       ┌─────▼────┐
│ Budget │       │  Run-of- │       │ Hospitality│      │ Seating  │      │ Invites &│
│ & Cost │       │   Show   │       │ & Bar Math │      │  Chart   │      │ Aesthetic│
│Engine  │       │ Timeline │       │ Calculator │      │  Mapper  │      │  Studio  │
└────────┘       └──────────┘       └──────────┘       └──────────┘       └──────────┘
```

### 1. 🔑 Google Sign-In & Cloud Profile
- **One-Click Authentication:** Real-time Google profile synchronization with user avatar, name, and verified email.
- **Client Isolation:** Secure local session management with optional Google OAuth 2.0 Client ID integration.

### 2. 🤖 Aura AI Co-Pilot (Conversational Assistant)
- **Voice-Enabled Planning:** Speech-to-text dictation via Web Speech API and text-to-speech audio feedback.
- **Context-Aware Synthesis:** Aura automatically retains event dates, financial caps, confirmed RSVPs, venue acoustics, and dietary preferences.
- **Pre-Prompt Chips:** Instant 1-click execution for budget audits, rainy-day contingencies, custom toast writing, and signature drink curation.

### 3. 💰 Dynamic Budget Allocation & Trade-Off Engine
- Evaluates spending against standard hospitality industry benchmarks:
  - Venue (30–35%), Catering & Bar (30–40%), Decor & Floral (10–12%), Photography (8–12%), Music/AV (8–10%), Contingency (5–10%).
- **Automated Trade-Off Suggestions:** If catering exceeds 42% or the budget is in deficit, Aura suggests concrete alternatives (e.g., shifting from 3-course plated service to curated chef tasting stations saves 20% with zero loss in perceived luxury).
- Cost-per-guest analysis and vendor deposit status tracking (`deposit_paid`, `paid_in_full`, `pending`, `overdue`).

### 4. ⏱️ Master Run-of-Show & Timeline Architect
- Chronological day-of production cue sheet with start/end times, lead personnel, and designated locations.
- **Ghost Buffer Injection:** 1-click insertion of 15-minute emergency schedule buffers before critical speeches to prevent delays.
- **Printable Run Sheet & Markdown Export:** Clean, one-click print layout designed for on-site wedding coordinators and stage managers.

### 5. 🍷 Hospitality Beverage & Catering Math Engine
- Built using hospitality algorithms:
  - Total drinks = `guests * 2 (hr 1) + guests * (duration - 1) * 1.0` with an 8% safety overage margin.
  - Wine bottles (5 pours/750ml), Beer cases (24/case), Spirits (16 pours/750ml).
  - Champagne flutes calculated with a 10% overflow allowance.
  - Ice requirements: 1.5 lbs/person for cocktails + 25 lbs buffer for wine chilling buckets.
- **Dietary & Critical Allergy Matrix:** Automatically isolates severe tree-nut, celiac, vegan, and halal counts for the catering kitchen.

### 6. 🪑 Interactive Seating & Table Arrangement Mapper
- Visual table planner supporting Round 8-tops, Round 10-tops, Rectangular Banquets, and Sweetheart tables.
- **Collision & Capacity Detection:** Live alerts when tables exceed maximum seat counts or when VIP attendees lack assigned seating.
- Seated guest dietary tags so waitstaff can identify special plates at a glance.

### 7. 💌 Invitation Suite & Curated Aesthetic Studio
- Generates invitations across **4 narrative tones**:
  - *👑 Regal & Formal*
  - *✨ Chic & Modern*
  - *🎉 Witty & Energetic*
  - *🤍 Warm & Intimate*
- Live interactive card preview with customizable fonts, borders, dress code, and RSVP instructions.
- 5-color aesthetic design token palette with 1-click hex code copying.

### 8. 📋 Milestone Checklist & Automated Vendor RFP Generator
- Phased checklist (`6-12 Months`, `2-3 Months`, `1 Month`, `Week Of`, `Day Of`).
- **Vendor RFP Generator:** Select Photographer, Caterer, DJ, Florist, or Venue to immediately generate a tailored, professional inquiry email pre-populated with all event specifications.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Cloud Hosting** | **Google Cloud Run** | Fully managed serverless container runtime (port 8080) |
| **Containerization** | Docker + Nginx Alpine | Multi-stage production build and static asset delivery |
| **Authentication** | Google Identity & OAuth 2.0 | One-click Google Sign-In with profile badge |
| **Frontend Framework** | React 19 + TypeScript | High-performance, strictly typed component architecture |
| **Bundler & Dev Server** | Vite 8 + `@tailwindcss/vite` | Sub-second HMR and optimized production bundling |
| **Styling & Design** | Tailwind CSS v4 | Responsive dark-mode styling with glassmorphism |
| **Icons & Effects** | Lucide React + Canvas Confetti | Visual feedback and celebratory animations |
| **Generative AI** | Google Gemini API (v1beta) | Live model calls (`gemini-2.5-flash`, `gemini-1.5-pro`) |
| **Offline Heuristics** | Custom Rule-Based Engine | Deterministic, zero-dependency intelligence fallback |
| **Audio & Speech** | Web Speech API | Client-side speech recognition & speech synthesis |
| **Testing** | Vitest | Automated unit testing for math and planner logic |

---

## 🔒 Security & Safe Implementation
- **Zero Credential Leaks:** If a Gemini API key or Google Client ID is provided, it is stored strictly in the user's local browser `localStorage` and sent directly to Google's HTTPS endpoints. It is never transmitted to third-party tracking servers.
- **Sanitized Outputs:** All inputs and prompt templates are strictly typed and sanitized.
- **Graceful Degradation:** If network access fails or no API key is supplied, the built-in heuristic engine handles all requests without crashing.

---

## 🧪 Testing & Validation

CelebAura AI includes automated Vitest unit tests verifying hospitality formulas, budget variance detection, and heuristic AI fallback logic.

```bash
# Run the test suite
npm test
```

### Test Results:
```
 ✓ src/tests/hospitalityMath.test.ts (5 tests)
 ✓ src/tests/smartPlannerEngine.test.ts (4 tests)

 Test Files  2 passed (2)
      Tests  9 passed (9)
```

---

## 🚀 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/Mugunth007/celebration-event-planner-ai.git
cd celebration-event-planner-ai

# 2. Install dependencies
npm install

# 3. Run unit tests
npm test

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

---

## ☁️ Google Cloud Run Deployment

To deploy directly to Google Cloud Run:

```bash
gcloud run deploy celebraite-ai \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📋 Hack2Skill Submission Form Reference

### 1. Public GitHub Repository Link
```
https://github.com/Mugunth007/celebration-event-planner-ai
```

### 2. Project Deployed Link
```
https://celebraite-ai-877598034358.us-central1.run.app
```

### 3. Describe the changes/updates made in the deployed version (under 1024 chars)
```
Deployed version on Google Cloud Run includes:
1. Google Sign-In Authentication: Integrated one-click Google OAuth profile authentication with verified account badges, avatar display, and session management.
2. Cloud Run Containerization: Production-grade multi-stage Dockerfile and Nginx Alpine server listening on port 8080 with automated health checks and asset gzip compression.
3. Multi-Vertical Event Presets: 1-click blueprints for Botanical Vineyard Weddings, Cyberpunk 30th Birthdays, and Tech Innovation Summits.
4. Dual-Engine Intelligence: Live Google Gemini 2.5 Flash / 1.5 Pro integration alongside an instant zero-config deterministic offline fallback engine.
5. Hospitality Math Engine: Automated bar inventory algorithms (drink/hour ratios, wine/beer/spirit counts, ice in lbs, glassware turnaround, and dietary matrix).
6. Budget Health & Trade-Offs: Ratios audit (Venue 35%, Catering 35%, Contingency 5%) with smart cost-saving recommendations.
7. Run-of-Show & Seating: Minute-by-minute cues with ghost buffers and table collision detection.
```

### 4. Mention the Gen AI services utilized in the submission, and where did you utilize it? (under 1024 chars)
```
1. Google Gemini API (gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-pro):
- Aura AI Co-Pilot: Powers the conversational event assistant with full context memory (event date, financial cap, attendee count, venue acoustics, and dietary preferences).
- Contextual Script & Toast Generator: Generates personalized 2-minute welcoming toasts and keynote introductions tailored to the celebration tone.
- Contingency & Weather Planning: Synthesizes indoor/outdoor safety buffers, rain marquee triggers, and acoustic echo mitigations.
- Narrative Invitation Studio: Crafts tailored invitation copy in 4 distinct narrative voices (Regal, Chic, Witty, Intimate).

2. Web Speech API (Client-Side AI):
- Speech-to-Text: Hands-free voice dictation for interacting with the Aura assistant.
- Text-to-Speech: Auditory speech synthesis allowing Aura to speak recommendations aloud.

3. Deterministic Heuristic Engine:
- Operates as an instant offline fallback, ensuring zero-latency decision making even without an API key.
```

### 5. LinkedIn Post
```
🎉 Excited to unveil CelebAura AI for the Virtual Prompt Wars Hackathon! 🚀

Planning an unforgettable celebration—whether a dream vineyard wedding, a cyberpunk rooftop milestone, or an executive tech gala—requires balancing artistic vision with rigorous operational logistics.

That’s why I built CelebAura AI: an autonomous celebration director and event orchestrator powered by Google Gemini and real-world hospitality intelligence, deployed live on Google Cloud Run with Google Sign-In!

✨ Key Highlights:
🔑 One-Click Google Sign-In with verified profile sync
🤖 Aura AI Co-Pilot with voice dictation & speech synthesis
💰 Smart Budget Health Engine with trade-off analysis
⏱️ Master Run-of-Show timeline with printable cue sheets
🍷 Hospitality Beverage Calculator (drinks, ice, and glassware ratios)
🪑 Interactive Seating Mapper with conflict & dietary alerts
💌 Invitation Studio with curated aesthetic palette design tokens
📋 Automated Vendor RFP proposal generator
☁️ Deployed serverless on Google Cloud Run with Docker & Nginx

🔗 Live Cloud Run App: https://celebraite-ai-877598034358.us-central1.run.app
💻 GitHub Repo: https://github.com/Mugunth007/celebration-event-planner-ai

#GenAI #GoogleGemini #GoogleCloud #CloudRun #React #TypeScript #WebDev #Hackathon #VirtualPromptWars #AI
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
