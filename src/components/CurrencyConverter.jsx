const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', INR: '₹' }
const CURRENCY_NAMES  = { USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound', INR: 'Indian Rupee' }
const CURRENCY_FLAGS  = { USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', INR: '🇮🇳' }

function Spinner() {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
      <div className="w-4 h-4 rounded-full border-2 border-violet-400 border-t-transparent animate-spin shrink-0" />
      <span className="text-sm text-slate-500">Fetching live rates…</span>
    </div>
  )
}

function ErrorBanner({ message }) {
  return (
    <div className="flex items-start gap-2.5 p-4 bg-red-50 rounded-xl border border-red-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className="text-red-400 shrink-0 mt-0.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}

export default function CurrencyConverter({
  total,
  exchangeRates,
  loading,
  error,
  targetCurrency,
  onCurrencyChange,
  currencies,
}) {
  const rate      = exchangeRates[targetCurrency]
  const converted = rate !== undefined ? total * rate : null
  const symbol    = CURRENCY_SYMBOLS[targetCurrency] ?? ''

  return (
    <div className="panel p-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="text-emerald-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-800">Currency</h2>
        </div>

        {!loading && !error && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-bold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Live
          </span>
        )}
      </div>

      {/* Currency selector */}
      <div className="mb-4">
        <label
          htmlFor="currency-select"
          className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2"
        >
          Convert total to
        </label>
        <select
          id="currency-select"
          value={targetCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          disabled={loading || !!error}
          className="w-full px-4 py-2.5 rounded-xl border border-green-100 bg-slate-50/60 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 hover:border-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {CURRENCY_FLAGS[c]} {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      {loading && <Spinner />}
      {!loading && error && <ErrorBanner message={error} />}

      {/* Conversion display — dark fintech card */}
      {!loading && !error && (
        <div className="relative overflow-hidden bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-4">
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
          {/* Ambient emerald glow behind converted amount */}
          <div className="absolute -top-8 right-2 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3">
            {/* From: USD */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-500 mb-1 font-semibold">
                {CURRENCY_FLAGS['USD']} USD
              </p>
              <p className="text-xl font-bold text-white tabular-nums truncate">
                ${total.toFixed(2)}
              </p>
            </div>

            {/* Arrow */}
            <div className="shrink-0 w-8 h-8 bg-white/[0.07] border border-white/8 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>

            {/* To: target currency */}
            <div className="flex-1 min-w-0 text-right">
              <p className="text-[11px] text-slate-500 mb-1 font-semibold">
                {CURRENCY_FLAGS[targetCurrency]} {targetCurrency}
              </p>
              <p className="text-xl font-bold tabular-nums truncate">
                {converted !== null ? (
                  <span className="text-gradient-emerald">
                    {symbol}{converted.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </p>
            </div>
          </div>

          {/* Exchange rate footer */}
          {rate !== undefined && targetCurrency !== 'USD' && (
            <div className="relative flex items-center justify-between border-t border-white/[0.07] pt-3 mt-3">
              <span className="text-[11px] text-slate-600 font-medium">Rate</span>
              <span className="text-[11px] text-slate-400 font-mono tabular-nums">
                1 USD = {rate.toFixed(4)} {targetCurrency}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
