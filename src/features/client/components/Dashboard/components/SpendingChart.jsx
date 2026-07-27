import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const defaultData = [
  { month: 'Jan', amount: 0 },
  { month: 'Feb', amount: 0 },
  { month: 'Mar', amount: 0 },
  { month: 'Apr', amount: 0 },
  { month: 'May', amount: 0 },
  { month: 'Jun', amount: 0 },
]

const currency = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export default function SpendingChart({ data = defaultData, loading = false }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-900
                p-6
                shadow-sm
            "
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Spending Trend</h2>

          <p className="text-sm mt-1 text-slate-500">Monthly logistics spending</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {currency.format(total)}
          </p>

          <p className="text-xs text-slate-500">Total Spent</p>
        </div>
      </div>

      {loading ? (
        <div className="h-[320px] rounded-xl animate-pulse bg-slate-100 dark:bg-slate-800" />
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />

                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: '#64748B',
                fontSize: 13,
              }}
            />

            <YAxis
              tickFormatter={(v) => `${v / 1000}k`}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: '#64748B',
                fontSize: 13,
              }}
            />

            <Tooltip
              formatter={(value) => currency.format(value)}
              contentStyle={{
                border: 'none',
                borderRadius: 12,
                boxShadow: '0 8px 30px rgba(0,0,0,.08)',
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#spendingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  )
}
