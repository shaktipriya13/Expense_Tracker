import { useState } from 'react'
import { CATEGORIES } from '../constants'

function ErrorMsg({ id, message }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {message}
    </p>
  )
}

const inputBase =
  'w-full px-4 py-2.5 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 hover:border-slate-300 transition-all duration-200'

export default function ExpenseForm({ onAddExpense }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [errors, setErrors] = useState({})
  const [justAdded, setJustAdded] = useState(false)

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Please enter an expense name.'
    const parsed = parseFloat(amount)
    if (!amount || isNaN(parsed) || parsed <= 0) errs.amount = 'Enter a valid amount greater than 0.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    onAddExpense({ name: name.trim(), amount: parseFloat(parseFloat(amount).toFixed(2)), category })
    setName(''); setAmount(''); setCategory(CATEGORIES[0])
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="panel p-6">
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-green-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-slate-800">Add New Expense</h2>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Add new expense" className="flex flex-col gap-4">
        {/* Expense name */}
        <div>
          <label
            htmlFor="exp-name"
            className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2"
          >
            Expense Name
          </label>
          <input
            id="exp-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="e.g. Coffee, Flight ticket, Ad spend"
            autoComplete="off"
            aria-required="true"
            aria-describedby={errors.name ? 'err-name' : undefined}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${
              errors.name
                ? 'border-red-300 bg-red-50 focus:ring-red-400/30 focus:border-red-400'
                : 'border-green-100'
            }`}
          />
          {errors.name && <ErrorMsg id="err-name" message={errors.name} />}
        </div>

        {/* Amount + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="exp-amount"
              className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2"
            >
              Amount <span className="normal-case font-normal">(USD)</span>
            </label>
            <input
              id="exp-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setErrors((p) => ({ ...p, amount: undefined })) }}
              placeholder="0.00"
              aria-required="true"
              aria-describedby={errors.amount ? 'err-amount' : undefined}
              aria-invalid={!!errors.amount}
              className={`${inputBase} ${
                errors.amount
                  ? 'border-red-300 bg-red-50 focus:ring-red-400/30 focus:border-red-400'
                  : 'border-green-100'
              }`}
            />
            {errors.amount && <ErrorMsg id="err-amount" message={errors.amount} />}
          </div>

          <div>
            <label
              htmlFor="exp-category"
              className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2"
            >
              Category
            </label>
            <select
              id="exp-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Select expense category"
              className={`${inputBase} border-green-100 cursor-pointer`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-linear-to-r from-lime-400 to-emerald-400 text-white text-sm font-bold rounded-2xl hover:brightness-105 active:scale-[0.98] transition-all duration-200 mt-1 shadow-lg shadow-emerald-300/50"
        >
          {justAdded ? (
            <span className="flex items-center justify-center gap-2.5">
              Add Expense
              <span className="w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2.5">
              Add Expense
              <span className="w-6 h-6 rounded-full border-2 border-white/70 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
