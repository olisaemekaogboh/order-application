import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const colors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-100 dark:border-blue-900',
    text: 'text-blue-600',
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-100 dark:border-emerald-900',
    text: 'text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-100 dark:border-amber-900',
    text: 'text-amber-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-100 dark:border-purple-900',
    text: 'text-purple-600',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-100 dark:border-red-900',
    text: 'text-red-600',
  },
  slate: {
    bg: 'bg-slate-50 dark:bg-slate-900',
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-600',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-100 dark:border-emerald-900',
    text: 'text-emerald-600',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-100 dark:border-indigo-900',
    text: 'text-indigo-600',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-100 dark:border-violet-900',
    text: 'text-violet-600',
  },
}

export default function StatCard({ title, value, subtitle, color = 'blue' }) {
  const c = colors[color] || colors.slate

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border ${c.border} ${c.bg} p-6 shadow-sm`}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className={`mt-3 text-4xl font-bold ${c.text}`}>
        <CountUp end={value || 0} duration={1.8} separator="," />
      </h2>
      <p className="mt-3 text-sm text-gray-500">{subtitle}</p>
    </motion.div>
  )
}
