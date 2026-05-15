<div align="center">

# Marketing Mojito — Expense Tracker

**A production-grade expense tracking dashboard built with React & Tailwind CSS**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

*Internship Assignment — [Marketing Mojito](https://marketingmojito.com)*

</div>

---

## Overview

A clean, fully-branded expense tracker built as a frontend internship showcase for **Marketing Mojito** — a digital marketing and web agency. The app combines real API data, persistent local storage, and a polished UI inspired directly by the Marketing Mojito brand identity (lime-to-emerald green palette).

Track spending, break it down by category, convert totals to foreign currencies, and pick up where you left off — data survives page refreshes.

---

## Features

| Feature | Detail |
|---|---|
| **Add & manage expenses** | Name, amount (USD), category with real-time inline validation |
| **Persistent data** | Expenses saved to `localStorage` — survive page refresh and browser close |
| **Category breakdown** | Live progress bars with % distribution across 5 categories |
| **Live currency conversion** | Frankfurter API — converts USD totals to EUR, GBP, or INR |
| **Collapsible help guide** | Onboarding banner with 4-step walkthrough, dismissable & re-openable via `?` button |
| **Brand-matched UI** | Lime → emerald gradient theme, Marketing Mojito logo, favicon, background texture |
| **Responsive layout** | Fully tested at 1600×900, 768px tablet, and 375px mobile |
| **Micro-interactions** | Fade-in cards, hover lifts, pulsing live-rate badge, button scale feedback |
| **Accessible markup** | `aria-label`, `aria-invalid`, `aria-describedby`, `role="alert"` on all interactive elements |
| **Graceful error states** | API failure banner, form validation errors, empty-state guidance |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 (utility-first, no component library) |
| Currency API | [Frankfurter](https://frankfurter.dev) |
| Persistence | `localStorage` (native browser API) |
| Linting | ESLint 10 with React Hooks plugin |
| Package Manager | npm |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Marketing_Mojio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Build optimised production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the source |

---

## Project Structure

```
src/
├── components/
│   ├── OnboardingBanner.jsx    # Collapsible help guide with 4-step walkthrough
│   ├── CurrencyConverter.jsx   # Live fintech-style currency widget
│   ├── ExpenseCard.jsx         # Individual animated expense item
│   ├── ExpenseForm.jsx         # Validated add-expense form
│   ├── ExpenseList.jsx         # Scrollable list with empty state
│   └── SummaryPanel.jsx        # Analytics mini-dashboard
├── App.jsx                     # Root layout, state, localStorage, API orchestration
├── constants.js                # Categories, icons, and Tailwind colour tokens
├── index.css                   # Global base styles and custom utilities
└── main.jsx                    # React DOM entry point

public/
├── logo.png                    # Marketing Mojito logo (header)
├── logo 2.png                  # Favicon
├── bg.png                      # Background texture for content area
└── favicon.svg                 # Fallback favicon
```

---

## Design System

### Colour Palette

Inspired directly by the [Marketing Mojito](https://marketingmojito.com) brand — fresh lime-to-emerald green on clean white.

| Role | Colour | Value |
|---|---|---|
| Header gradient | Lime → Green → Emerald | `from-lime-400 via-green-500 to-emerald-600` |
| CTA buttons | Lime → Emerald | `from-lime-400 to-emerald-400` |
| Primary accent | Green-600 | `#16a34a` |
| Page background | `bg.png` + `bg-white/82` overlay | soft textured white |
| Cards / Surfaces | White + green border tint | `rgba(255,255,255,0.90)` |
| Dark hero cards | Slate-900 → Green-900 | gradient |
| Footer | Slate-900 | `#0f172a` |
| Food category | Emerald | `#34d399 → #059669` |
| Travel category | Sky | `#38bdf8 → #0284c7` |
| Marketing category | Violet | `#a78bfa → #7c3aed` |
| Utilities category | Amber | `#fcd34d → #d97706` |
| Other category | Slate | `#94a3b8 → #64748b` |

### Key Design Principles

- **Brand-matched** — every colour and gradient pulled from the Marketing Mojito visual identity
- **Card-based layout** with soft shadows, green-tinted borders, and rounded-2xl corners
- **Glassmorphism** header with layered orbs, radial glows, and shimmer lines
- **Gradient CTA button** with circle-arrow icon matching the agency's own site buttons
- **Gradient progress bars** per category — no third-party chart library
- **Tabular numbers** for all financial figures
- **`bg-fixed` background texture** for subtle parallax depth in the content area

---

## Data Persistence

Expenses and UI preferences are saved to `localStorage` under two keys:

| Key | Value |
|---|---|
| `mm_expenses` | `JSON` array of all expense objects |
| `mm_guide_dismissed` | `"true"` when the user has closed the help banner |

Both reads and writes are wrapped in `try/catch` for safety in private-browsing environments.

---

## API Integration

**Frankfurter Currency API**

```
GET https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP,INR
```

- Fetched once on app mount
- Pulsing green **Live** badge confirms fresh rates
- Graceful error banner if the request fails
- Raw exchange rate displayed beneath the converted amount

---

## Expense Data Model

```js
{
  id: number,        // Date.now() timestamp — unique per entry
  name: string,      // Expense description
  amount: number,    // Stored to 2 decimal places (USD)
  category: string   // One of: Food | Travel | Marketing | Utilities | Other
}
```

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | Single column, stacked panels, stat chips condensed |
| Tablet (640–1024px) | Two-column form grid, panels side by side |
| Desktop (> 1024px) | Three-column grid — form + list on left, summary + converter on right |

---

## Accessibility

- All form inputs have associated `<label>` elements
- Error messages use `role="alert"` and are linked via `aria-describedby`
- Invalid fields marked with `aria-invalid="true"`
- All icon-only buttons have `aria-label` and `title` attributes
- Delete button always focusable with visible focus ring (`focus:ring-2`)
- Onboarding panel uses `role="region"` and `aria-label`

---

## Acknowledgements

- [Frankfurter](https://frankfurter.dev) — free, open-source currency exchange API
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Vite](https://vitejs.dev) — lightning-fast dev tooling
- [Marketing Mojito](https://marketingmojito.com) — brand assets and design inspiration

---

<div align="center">

Engineered & Designed by **Shakti Priya** · [shaktipriya13dev.vercel.app](https://shaktipriya13dev.vercel.app/) · IIIT Ranchi

*Marketing Mojito Internship Assignment · 2026*

</div>
