import { motion } from 'framer-motion'
import { format } from 'date-fns'

const badgeStyles = {
  DELIVERED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',

  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',

  PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',

  IN_TRANSIT: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',

  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

const currency = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export default function RecentOrdersTable({ orders = [], loading = false }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="h-8 w-52 rounded bg-slate-200 animate-pulse mb-6" />

        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse mb-3"
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-semibold">Recent Orders</h2>

        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4">Order</th>

              <th className="px-6 py-4">Route</th>

              <th className="px-6 py-4">Amount</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <td className="px-6 py-5 font-medium">{order.orderNumber}</td>

                <td className="px-6 py-5">
                  {order.pickupLocation}

                  {' → '}

                  {order.deliveryLocation}
                </td>

                <td className="px-6 py-5">{currency.format(order.totalPrice || 0)}</td>

                <td className="px-6 py-5">
                  <span
                    className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    ${badgeStyles[order.status]}
                                `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-500">
                  {format(new Date(order.orderDate), 'dd MMM yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
