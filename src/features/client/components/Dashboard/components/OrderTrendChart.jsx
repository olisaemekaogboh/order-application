import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const defaultData = [
  { month: 'Jan', orders: 0 },
  { month: 'Feb', orders: 0 },
  { month: 'Mar', orders: 0 },
  { month: 'Apr', orders: 0 },
  { month: 'May', orders: 0 },
  { month: 'Jun', orders: 0 },
]

export default function OrderTrendChart({ data = defaultData, loading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Order Activity</h2>

          <p className="mt-1 text-sm text-slate-500">Monthly order trend</p>
        </div>
      </div>

      {loading ? (
        <div className="h-[340px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      ) : (
        <ResponsiveContainer width="100%" height={340}>
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 15,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={false} />

            <XAxis
              dataKey="month"
              tick={{
                fill: '#64748B',
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fill: '#64748B',
                fontSize: 13,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,.08)',
              }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  )
}
