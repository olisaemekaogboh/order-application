import { motion } from 'framer-motion'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#16A34A', '#2563EB', '#F59E0B', '#DC2626']

const defaultData = [
  { name: 'Delivered', value: 0 },
  { name: 'In Transit', value: 0 },
  { name: 'Pending', value: 0 },
  { name: 'Cancelled', value: 0 },
]

export default function DeliveryStatusChart({ data = defaultData, loading = false }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Delivery Status</h2>

          <p className="mt-1 text-sm text-slate-500">Distribution of all shipments</p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{total}</p>

          <p className="text-xs text-slate-500">Total Orders</p>
        </div>
      </div>

      {loading ? (
        <div className="h-[340px] rounded-xl animate-pulse bg-slate-100 dark:bg-slate-800" />
      ) : (
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={105} paddingAngle={3} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [value, 'Orders']}
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 8px 30px rgba(0,0,0,.08)',
              }}
            />

            <Legend verticalAlign="bottom" height={40} />
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={item.name} className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
            <div className="flex items-center justify-between">
              <span
                className="font-medium"
                style={{
                  color: COLORS[index],
                }}
              >
                {item.name}
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
