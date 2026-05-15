<div align="center">

# Mojio — Expense Tracker

**A premium SaaS-grade expense tracking dashboard built with React & Tailwind CSS**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

</div>

---

## Overview

Mojio is a **clean, production-quality expense tracker** built as a showcase frontend internship project for Marketing Mojito — a digital marketing and web agency. It combines thoughtful UX design with live financial data to deliver a dashboard experience that feels like a real SaaS product.

Track your spending, break it down by category, and instantly convert totals to foreign currencies — all in a minimal, recruiter-impressive interface.

---

## Features

- **Add & manage expenses** — Name, amount, and category with real-time validation
- **Category breakdown** — Visual progress bars with percentage distribution across Food, Travel, Marketing, Utilities, and Other
- **Live currency conversion** — Powered by the Frankfurter API; converts USD totals to EUR, GBP, or INR in real time
- **Summary dashboard** — At-a-glance total spend, transaction count, and per-category analytics
- **Responsive layout** — Pixel-perfect on desktop, tablet, and mobile
- **Micro-interactions** — Fade-in animations, hover transitions, smooth delete effects, and a pulsing live-rate indicator
- **Empty states** — Friendly, designed empty states instead of blank voids
- **Form UX** — Inline validation errors, disabled state handling, and success feedback

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Currency API | [Frankfurter](https://frankfurter.dev) |
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
│   ├── CurrencyConverter.jsx   # Live fintech-style currency widget
│   ├── ExpenseCard.jsx         # Individual animated expense item
│   ├── ExpenseForm.jsx         # Validated add-expense form
│   ├── ExpenseList.jsx         # Scrollable list with empty state
│   └── SummaryPanel.jsx        # Analytics mini-dashboard
├── App.jsx                     # Root layout, state, and API orchestration
├── constants.js                # Categories, icons, and Tailwind colour tokens
├── index.css                   # Global base styles and custom utilities
└── main.jsx                    # React DOM entry point
```

---

## Design System

### Colour Palette

Inspired by the [Marketing Mojito](https://marketingmojito.com) brand identity — fresh lime green on clean white.

| Role | Colour | Hex |
|---|---|---|
| Primary / Brand | Green | `#16a34a` (green-600) |
| Primary Light | Green | `#22c55e` (green-500) |
| Primary Dark | Green | `#15803d` (green-700) |
| Accent / Success | Emerald | `#10b981` (emerald-500) |
| Page Background | Soft green-tinted white | `#f0f7f2` |
| Cards / Surfaces | White with green border tint | `rgba(255,255,255,0.90)` |
| Dark Hero Cards | Slate-900 → Green-900 | gradient |
| Food category | Emerald | `#34d399` → `#059669` |
| Travel category | Sky | `#38bdf8` → `#0284c7` |
| Marketing category | Green | `#4ade80` → `#16a34a` |
| Utilities category | Amber | `#fcd34d` → `#d97706` |
| Other category | Slate | `#94a3b8` → `#64748b` |

### Key Design Principles

- **Card-based layout** with soft shadows and rounded corners
- **Glassmorphism** accents on the header
- **Gradient progress bars** per category — no third-party chart library needed
- **Tabular numbers** for all financial figures
- **Consistent 4px spacing grid** via Tailwind utilities

---

## API Integration

**Frankfurter Currency API**

```
GET https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP,INR
```

- Fetched once on app mount
- Shows a pulsing live-rate badge when rates are fresh
- Graceful error banner if the request fails
- Displays the raw exchange rate beneath the converted amount

---

## Expense Data Model

```js
{
  id: number,        // Date.now() timestamp — unique per entry
  name: string,      // Expense description
  amount: number,    // Stored to 2 decimal places
  category: string   // One of: Food | Travel | Marketing | Utilities | Other
}
```

---

## Responsive Behaviour

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | Single column, full-width inputs, stacked panels |
| Tablet (640–1024px) | Two-column form grid, panels side by side |
| Desktop (> 1024px) | Three-column grid — form + list on left, summary + converter on right |

---

## Acknowledgements

- [Frankfurter](https://frankfurter.dev) — free, open-source currency exchange API
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Vite](https://vitejs.dev) — lightning-fast dev tooling
- Built as an internship showcase project for **Marketing Mojito**

---

<div align="center">

Made with focus and pixel-precision · Marketing Mojito Internship Assignment

</div>
