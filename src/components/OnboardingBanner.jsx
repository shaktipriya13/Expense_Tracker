const STEPS = [
  {
    emoji: '✏️',
    color: 'bg-green-100 text-green-700',
    title: 'Add an Expense',
    desc: 'Enter a name, amount in USD, and pick a category. Hit "Add Expense" — it appears in your list instantly.',
  },
  {
    emoji: '📊',
    color: 'bg-sky-100 text-sky-700',
    title: 'See Your Breakdown',
    desc: 'The Summary panel shows live category totals with progress bars. Track Food, Travel, Marketing, and more.',
  },
  {
    emoji: '💱',
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Convert Currency',
    desc: 'Select EUR, GBP, or INR to convert your total using live Frankfurter exchange rates fetched on load.',
  },
  {
    emoji: '🗑️',
    color: 'bg-red-100 text-red-600',
    title: 'Delete Entries',
    desc: 'Hover any expense card and click the trash icon on the right side to remove it from your list.',
  },
]

export default function OnboardingBanner({ isOpen, onToggle }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      {/* Toggle bar */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls="onboarding-panel"
        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 bg-white border border-green-200 rounded-2xl shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 bg-lime-100 rounded-lg flex items-center justify-center text-sm select-none shrink-0">
            💡
          </span>
          <span className="text-sm font-semibold text-slate-700">How to use this app</span>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium px-2 py-0.5 bg-slate-100 rounded-full">
            Quick guide
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-green-600 font-semibold hidden sm:inline">
            {isOpen ? 'Collapse' : 'Expand'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`text-slate-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible body */}
      <div
        id="onboarding-panel"
        role="region"
        aria-label="App usage guide"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border border-green-100 rounded-2xl px-5 py-5 sm:px-7 sm:py-6 shadow-sm">

          {/* Intro */}
          <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-lime-50 border border-lime-200 flex items-center justify-center text-lg shrink-0">
              🧾
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Marketing Mojito — Expense Tracker</p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-2xl">
                A lightweight personal finance tool to log, categorise, and analyse your spending.
                Add expenses on the left, view your analytics summary on the right, and convert
                your total to any currency — all in real time, no account needed.
              </p>
            </div>
          </div>

          {/* Steps */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Getting started — 4 simple steps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative flex gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition-colors duration-150"
              >
                <span className="absolute -top-2 -left-1.5 w-5 h-5 bg-green-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5 ${step.color}`}>
                  {step.emoji}
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">{step.title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips row */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              '💰 Amounts are always in USD',
              '🌐 Exchange rates update on page load',
              '📱 Works on mobile & desktop',
              '⌨️ Press Enter to submit the form',
            ].map((tip) => (
              <span
                key={tip}
                className="text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium"
              >
                {tip}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              You can reopen this guide anytime via the <strong className="text-slate-600">? Help</strong> button in the header.
            </p>
            <button
              onClick={onToggle}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-linear-to-r from-lime-400 to-emerald-400 text-white text-xs font-bold rounded-xl hover:brightness-105 active:scale-[0.98] transition-all duration-200 shadow-md shadow-emerald-200/50"
            >
              Got it, let's go
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
