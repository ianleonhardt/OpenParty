# OpenParty

**The easiest way to find and book private event spaces in NYC.**

---

## The Problem

Planning a private event at a bar or restaurant in NYC is unnecessarily painful. Whether you're throwing a birthday party, hosting an after-party for your run club, or organizing a corporate happy hour, the process is the same: Google around, call venue after venue, send DMs and emails, and wait days for responses that may never come.

Critical information — capacity, minimum spend, available dates, private room fees — is scattered across phone calls, Instagram replies, and email threads. There's no single place to browse, compare, and confidently book a venue for a private event.

---

## The Solution

OpenParty is a platform that lets consumers browse, compare, and connect with bars and restaurants that offer private event spaces in NYC. Think of it as the **"Zillow for private events"** — every listing shows what a planner actually needs upfront: capacity, minimum spend, available formats, pricing, photos, and real reviews.

---

## Target Users

**Primary:** Individual party planners in NYC (ages 25–40) organizing personal celebrations — birthdays, engagement parties, graduation dinners, milestone events. Comfortable booking online; frustrated that venue booking hasn't caught up to OpenTable or Airbnb.

**Secondary (future):** Group organizers — run clubs, sports leagues, corporate social committees — who book recurring events and need a reliable, repeatable process.

---

## MVP Features

- **Searchable venue directory** with filters for neighborhood, capacity, budget, vibe, and event type
- **Standardized venue profiles** showing capacity, minimum spend, private room fee, availability, food/drink packages, and photos
- **Inquiry/contact flow** for messaging venues directly with event details (date, headcount, budget)
- **Reviews and ratings** from people who've actually hosted events at the venue
- **Saved favorites and comparison tool** so planners can shortlist without losing track

---

## Business Model

**MVP (Lead Generation):** Users browse and submit inquiries; venues handle booking off-platform. Revenue comes from tiered venue subscriptions once traction is established.

**V2 (Direct Booking):** Real-time availability and in-platform booking with a 10–15% transaction commission, once venue trust and demand are proven.

---

## Competitive Landscape

| Competitor | Strength | OpenParty Differentiation |
|---|---|---|
| Peerspace | Large inventory, direct booking | Broad focus (studios, lofts) — not bars/restaurants for personal events |
| Litty | NYC-native, concierge support | OpenParty wins on standardized upfront info and deeper filtering |
| Tagvenue | Wide global coverage | Generic; no NYC-specific depth |
| OpenTable | Massive brand, trusted booking | Private events are an afterthought; limited event-specific filtering |
| EventUp | Strong B2B connections | B2B-focused; not consumer-friendly |

**The gap:** No platform is purpose-built for the everyday NYC consumer who wants to rent out a bar or restaurant for a personal event, with all key info visible upfront and a streamlined path to booking.

---

## Go-to-Market

- **Neighborhood-first launch:** Start deep in 2–3 neighborhoods (LES, East Village, Williamsburg) before expanding
- **Run club partnerships:** NYC's running community constantly books post-race bars — partner with 5–10 clubs for co-branded booking
- **Social proof flywheel:** Event photos and reviews on the platform become organic marketing
- **SEO + content:** Curated guides ("Best bars to rent out for a 30th birthday in Brooklyn") to capture search traffic

---

## Status

Early-stage. Currently validating demand and scoping the MVP.

# Notes on scaffolding: React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
