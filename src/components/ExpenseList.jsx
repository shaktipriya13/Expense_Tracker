import ExpenseCard from './ExpenseCard'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="w-16 h-16 bg-linear-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
          />
        </svg>
      </div>
      <p className="text-slate-700 font-semibold text-sm">No expenses yet</p>
      <p className="text-slate-400 text-xs mt-1.5 max-w-50 leading-relaxed">
        Fill in the form above and hit <strong className="text-slate-500">Add Expense</strong> to get started.
      </p>
      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        Start tracking above
      </div>
    </div>
  )
}

export default function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-slate-800">Expenses</h2>
        </div>
        {expenses.length > 0 && (
          <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
          </span>
        )}
      </div>

      {expenses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-0.5">
          {expenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} onDelete={onDeleteExpense} />
          ))}
        </div>
      )}
    </div>
  )
}
