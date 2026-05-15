import { CATEGORY_STYLES, CATEGORY_ICONS } from '../constants'

export default function ExpenseCard({ expense, onDelete }) {
  const styles = CATEGORY_STYLES[expense.category] ?? CATEGORY_STYLES.Other
  const icon = CATEGORY_ICONS[expense.category] ?? CATEGORY_ICONS.Other
  const date = new Date(expense.id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div className="expense-card flex items-center gap-3.5 px-4 py-3.5 group animate-fade-in-up">
      {/* Category icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl select-none ${styles.iconBg}`}
      >
        {icon}
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-800 font-semibold text-sm truncate">{expense.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${styles.badge}`}
          >
            {expense.category}
          </span>
          <span className="text-slate-300 text-xs select-none">·</span>
          <span className="text-slate-400 text-xs">{date}</span>
        </div>
      </div>

      {/* Amount + delete */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-gradient font-bold text-sm tabular-nums">
          ${expense.amount.toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.name}`}
          title={`Remove "${expense.name}"`}
          className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-150 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
