import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import OnboardingBanner from './components/OnboardingBanner'
import { CURRENCIES } from './constants'

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('mm_expenses')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [exchangeRates, setExchangeRates] = useState({})
  const [loadingRates, setLoadingRates] = useState(false)
  const [ratesError, setRatesError] = useState(null)
  const [showGuide, setShowGuide] = useState(() => {
    try { return localStorage.getItem('mm_guide_dismissed') !== 'true' } catch { return true }
  })

  const toggleGuide = () =>
    setShowGuide((prev) => {
      const next = !prev
      try { if (!next) localStorage.setItem('mm_guide_dismissed', 'true')
            else localStorage.removeItem('mm_guide_dismissed') } catch {}
      return next
    })

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  useEffect(() => {
    const fetchRates = async () => {
      setLoadingRates(true)
      setRatesError(null)
      try {
        const res = await fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP,INR')
        if (!res.ok) throw new Error('Bad response')
        const data = await res.json()
        setExchangeRates({ USD: 1, ...data.rates })
      } catch {
        setRatesError('Could not load exchange rates. Currency conversion is unavailable.')
      } finally {
        setLoadingRates(false)
      }
    }
    fetchRates()
  }, [])

  useEffect(() => {
    try { localStorage.setItem('mm_expenses', JSON.stringify(expenses)) } catch {}
  }, [expenses])

  const handleAddExpense = (expense) =>
    setExpenses((prev) => [{ ...expense, id: Date.now() }, ...prev])

  const handleDeleteExpense = (id) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id))

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="relative overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-lime-400 via-green-500 to-emerald-600" />

        {/* Radial highlight — bright center-left glow */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse 55% 120% at 15% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />

        {/* Depth shadow at bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-black/15 to-transparent pointer-events-none" />

        {/* Decorative orbs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-lime-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-4 left-1/2 w-56 h-56 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top + bottom shimmer lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <div className="flex items-center justify-between gap-4">

            {/* ── Brand ── */}
            <div className="flex items-center gap-4">
              {/* Logo pill — white background for maximum contrast */}
              <div className="bg-white rounded-2xl px-3.5 py-2 shadow-xl shadow-black/20 shrink-0">
                <img
                  src="/logo.png"
                  alt="Marketing Mojito"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>
              {/* App title */}
              <div className="hidden sm:block">
                <h1 className="text-white text-lg sm:text-xl font-extrabold tracking-tight leading-none drop-shadow-sm">
                  Expense Tracker
                </h1>
                <p className="text-white/55 text-[11px] mt-1 tracking-wide font-medium">
                  Internship Assignment
                </p>
              </div>
            </div>

            {/* ── Stat chips ── */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Help toggle */}
              <button
                onClick={toggleGuide}
                aria-label={showGuide ? 'Close guide' : 'Open how-to guide'}
                title={showGuide ? 'Close guide' : 'How to use this app'}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl hover:bg-white/15 transition-colors duration-150 group"
              >
                <span className="w-9 h-9 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-black/10 group-hover:bg-white/30 transition-colors duration-150">
                  ?
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  Help
                </span>
              </button>
              {/* Transactions — hidden on mobile */}
              <div className="hidden sm:flex flex-col items-end backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-3 shadow-lg shadow-black/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                  Transactions
                </p>
                <p className="text-white text-xl font-bold tabular-nums leading-tight mt-1">
                  {expenses.length}
                </p>
              </div>

              {/* Total spent */}
              <div className="flex flex-col items-end backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl px-4 py-3 shadow-lg shadow-black/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
                  Total Spent
                </p>
                <p className="text-white text-2xl font-bold tabular-nums leading-tight mt-1">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ── Content area with bg.png ── */}
      <div className="relative min-h-screen">
        {/* Background image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none"
          style={{ backgroundImage: 'url(/bg.png)' }}
          aria-hidden="true"
        />
        {/* Lightening overlay — white wash so the image is a soft texture, not distracting */}
        <div className="absolute inset-0 bg-white/82 pointer-events-none" aria-hidden="true" />

        {/* All content sits above the layers */}
        <div className="relative">
          {/* ── Onboarding guide ── */}
          <OnboardingBanner isOpen={showGuide} onToggle={toggleGuide} />

          {/* ── Main ── */}
          <main id="main-content" aria-label="Expense tracker dashboard" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 flex flex-col gap-5">
                <ExpenseForm onAddExpense={handleAddExpense} />
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
              </div>

              <div className="flex flex-col gap-5">
                <SummaryPanel expenses={expenses} total={total} />
                <CurrencyConverter
                  total={total}
                  exchangeRates={exchangeRates}
                  loading={loadingRates}
                  error={ratesError}
                  targetCurrency={targetCurrency}
                  onCurrencyChange={setTargetCurrency}
                  currencies={CURRENCIES}
                />
              </div>
            </div>
          </main>

          {/* ── Footer ── */}
          <footer className="relative overflow-hidden mt-6">
            {/* Top gradient rule */}
            <div className="h-0.5 bg-linear-to-r from-lime-400 via-green-500 to-emerald-500" />

            {/* Dark body */}
            <div className="relative bg-slate-900 py-7 px-4">
              {/* Subtle orbs */}
              <div className="absolute -top-10 left-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-lime-400/8 rounded-full blur-2xl pointer-events-none" />

              <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">

                {/* Logo */}
                <img src="/logo.png" alt="Marketing Mojito" className="h-8 w-auto object-contain opacity-75 shrink-0" />

                {/* Credit — center */}
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Engineered &amp; Designed by
                  </p>
                  <p className="text-white text-lg font-extrabold tracking-tight leading-none">
                    Shakti Priya
                  </p>
                  <a
                    href="https://shaktipriya13dev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-green-400 transition-colors duration-150 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="underline underline-offset-2 decoration-slate-600 group-hover:decoration-green-400 transition-colors duration-150">
                      Visit Portfolio
                    </span>
                  </a>
                 
                </div>

                {/* Year */}
                <p className="text-slate-600 text-xs font-semibold tracking-widest shrink-0">
                  © 2026
                </p>

              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
