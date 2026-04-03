# KrishiNetra Codebase Understanding and Bhashini Integration Plan

## 1) Codebase at a glance

KrishiNetra is a Next.js App Router project focused on climate-resilient and data-driven agriculture workflows.

- Framework: Next.js 16 + React 19 + TypeScript
- Styling/UI: Tailwind CSS 4 + Radix UI primitives + custom UI wrappers
- Visualization: Recharts
- Motion: Framer Motion
- Current data mode: In-memory constants (no backend persistence yet)
- Product positioning: Voice-first, multilingual AI assistant (Bhumi Bai)

Primary files that define this:
- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/dashboard/layout.tsx`

## 2) Application structure and responsibilities

### App routes

- Landing and shell:
  - `app/page.tsx`: marketing and product narrative
  - `app/layout.tsx`: root metadata and global shell
- Dashboard shell:
  - `app/dashboard/layout.tsx`: sidebar + topbar + floating voice button
- Functional pages:
  - `app/dashboard/page.tsx`: overview dashboard
  - `app/dashboard/alerts/page.tsx`
  - `app/dashboard/market/page.tsx`
  - `app/dashboard/finance/page.tsx`
  - `app/dashboard/sustainability/page.tsx`
  - `app/dashboard/precision-agriculture/page.tsx`
  - `app/dashboard/climate-advisor/page.tsx`
  - `app/dashboard/gis-map/page.tsx`
  - `app/dashboard/crop-breeding/page.tsx`
  - `app/dashboard/assistant/page.tsx`

### Shared component layer

- Dashboard framing and nav: `components/nav-sidebar.tsx`, `components/top-bar.tsx`, `components/dashboard-card.tsx`
- Voice entry points: `components/voice-button.tsx`, `components/floating-voice-button.tsx`
- Domain widgets: weather, climate, IoT, crop breeding, renewable energy, risk timeline, yield optimization
- Design system components: `components/ui/*`

### Data and types

- `lib/types.ts`: domain models (alerts, markets, finance, climate vulnerability, IoT, crop varieties, etc.)
- `lib/constants.ts`: mock data and configuration (alerts, weather, languages, suggested questions, nav, etc.)

## 3) Current multilingual and voice status

Current implementation indicates a strong voice-first intent, but most voice behavior is UI-level and simulated.

Implemented today:
- Language list exists in `lib/constants.ts` (`LANGUAGES`)
- Language dropdown rendered in:
  - `components/top-bar.tsx`
  - `app/dashboard/assistant/page.tsx`
- Voice controls rendered in:
  - `components/voice-button.tsx`
  - `components/floating-voice-button.tsx`
- Assistant supports multilingual text prompts and mock response logic in:
  - `app/dashboard/assistant/page.tsx`
- Alerts support optional `voiceUrl` metadata in:
  - `lib/types.ts` (`Alert.voiceUrl`)
  - `lib/constants.ts` (sample audio files)
  - `app/dashboard/alerts/page.tsx` (Listen button)

Gap today:
- No real ASR/STT (speech-to-text)
- No real TTS (text-to-speech)
- No language translation/normalization pipeline
- No API route layer for model integration
- No persistent conversation state or backend

## 4) Where we want Bhashini (exact integration points)

Bhashini should be integrated in the places below, in order of impact:

### A) Assistant voice I/O (highest priority)

Files to touch:
- `app/dashboard/assistant/page.tsx`
- `components/voice-button.tsx`
- `lib/types.ts` (optional metadata extensions)

What to add:
- STT: capture farmer speech -> transcript
- Translation pipeline when user language differs from model language
- TTS: synthesize assistant response in selected language
- Auto language handling from selected language code

Why this matters:
- The assistant is the core multilingual experience and already promises voice-first advisory.

### B) Global quick-voice capture via floating button

Files to touch:
- `app/dashboard/layout.tsx`
- `components/floating-voice-button.tsx`

What to add:
- Start voice capture from any dashboard page
- Route transcript to assistant page or open command palette-like quick query panel
- Optional: short spoken summary playback of top alerts

Why this matters:
- Farmers should ask without navigating into Assistant first.

### C) Alerts spoken playback

Files to touch:
- `app/dashboard/alerts/page.tsx`
- `lib/constants.ts`

What to add:
- Replace static `voiceUrl` dependence with on-demand Bhashini TTS for alert text
- Optional local caching of generated audio URL per alert+language

Why this matters:
- Critical advisories become accessible to low-literacy users instantly.

### D) Language state unification in header and assistant

Files to touch:
- `components/top-bar.tsx`
- `app/dashboard/assistant/page.tsx`
- (new) `hooks/use-language.ts` or context provider

What to add:
- Single source of truth for selected language
- Use same selected language for STT, translation, TTS, and UI labels

Why this matters:
- Prevents mismatch where top bar language and assistant language diverge.

### E) Future: voice summaries on key analytics pages

Candidate files:
- `app/dashboard/page.tsx`
- `app/dashboard/market/page.tsx`
- `app/dashboard/climate-advisor/page.tsx`
- `app/dashboard/sustainability/page.tsx`

What to add:
- One-click "Listen Summary" for each page (TTS)

Why this matters:
- Enables glance-and-listen workflows in field conditions.

## 5) Why KrishiNetra requires Bhashini specifically

1. India language coverage at product core
- KrishiNetra already targets Hindi, Telugu, Tamil, Kannada, Marathi, and English usage.
- Bhashini is aligned with Indian language speech and translation requirements.

2. Voice access for low literacy and hands-busy users
- Farmers in-field often prefer speaking over typing.
- Speech interfaces reduce friction and improve adoption.

3. Better advisory trust through native language delivery
- Advice in the farmer's own language improves comprehension and actionability.
- TTS can communicate urgency for alerts faster than dense text.

4. Standardized multilingual pipeline
- One integration can handle ASR + translation + TTS flow, reducing fragmented vendor logic.

5. Product promise alignment
- Current UI and copy repeatedly promise voice-first multilingual support.
- Bhashini closes the implementation gap between promise and working capability.

## 6) Suggested technical architecture

### API layer to introduce

Add server routes under `app/api/`:
- `app/api/bhashini/stt/route.ts`
- `app/api/bhashini/tts/route.ts`
- `app/api/bhashini/translate/route.ts` (optional if needed)

### Client integration helpers

Add:
- `lib/bhashini.ts`: typed client wrappers
- `hooks/use-bhashini-voice.ts`: recording, upload, transcript, playback lifecycle

### Environment configuration

Add `.env` keys (names can be adapted):
- `BHASHINI_API_KEY`
- `BHASHINI_BASE_URL`
- `BHASHINI_APP_ID`

### Observability and fallback

- Graceful fallback to text-only mode when speech API fails
- Retry and user-friendly error states in assistant and alert playback
- Basic logging for request latency and failure reasons

## 7) Phased rollout plan

### Phase 1: Assistant STT + TTS MVP
- Integrate Bhashini in `app/dashboard/assistant/page.tsx` and `components/voice-button.tsx`
- Add API routes and env wiring
- Validate end-to-end for Hindi and English first

### Phase 2: Global voice access
- Connect `components/floating-voice-button.tsx` to the same pipeline
- Add transcript handoff to assistant

### Phase 3: Alerts and summaries
- Convert alert listen action in `app/dashboard/alerts/page.tsx` to dynamic TTS
- Add optional summary playback on dashboard pages

### Phase 4: Hardening
- Caching, analytics, language quality checks, and accessibility refinement

## 8) Key takeaway

KrishiNetra already has the right UX scaffolding, domain flows, and multilingual intent. Bhashini is required to operationalize this intent into real voice intelligence: speech input, language-aware understanding, and spoken advisories that work for real farm contexts.
