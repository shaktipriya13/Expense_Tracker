import { CATEGORIES, CATEGORY_STYLES, CATEGORY_ICONS } from '../constants'

function CategoryRow({ category, amount, percentage }) {
  const styles = CATEGORY_STYLES[category]
  const icon = CATEGORY_ICONS[category]

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base select-none">{icon}</span>
          <span className="text-sm text-slate-600 font-medium">{category}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-slate-400 tabular-nums font-semibold">
            {percentage.toFixed(0)}%
          </span>
          <span className="text-sm font-bold text-slate-700 tabular-nums w-16 text-right">
            ${amount.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Gradient progress bar — thicker for impact */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${styles.bar} transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default function SummaryPanel({ expenses, total }) {
  const categoryTotals = CATEGORIES.reduce((acc, cat) => {
    const sum = expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0)
    if (sum > 0) acc[cat] = sum
    return acc
  }, {})

  const activeCategories = Object.entries(categoryTotals)

  return (
    <div className="panel p-6">
      {/* Section header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-slate-800">Summary</h2>
      </div>

      {/* Dark hero total card */}
      <div className="relative overflow-hidden rounded-2xl p-5 mb-5 bg-linear-to-br from-slate-900 to-green-900">
        {/* Ambient green orb */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-green-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-400/15 rounded-full blur-xl pointer-events-none" />
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Total Expenses
          </p>
          <p className="text-[2rem] font-bold text-white mt-2 tabular-nums leading-none">
            ${total.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500 mt-2.5">
            {expenses.length === 0
              ? 'No transactions yet'
              : `${expenses.length} ${expenses.length === 1 ? 'transaction' : 'transactions'}`}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
        By Category
      </p>

      {activeCategories.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          Add expenses to see breakdown
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {activeCategories.map(([cat, amount]) => (
            <CategoryRow
              key={cat}
              category={cat}
              amount={amount}
              percentage={total > 0 ? (amount / total) * 100 : 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}
