import { motion } from 'framer-motion'
import { format, isValid } from 'date-fns'

const badgeStyles = {
  DELIVERED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  PROCESSING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  IN_TRANSIT: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  ASSIGNED: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  PICKED_UP: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
}

const currency = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

// Helper function to safely format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    if (!isValid(date)) return 'N/A'
    return format(date, 'dd MMM yyyy')
  } catch (error) {
    return 'N/A'
  }
}

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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Orders</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Order
              </th>
              <th className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Route
              </th>
              <th className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Amount
              </th>
              <th className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-500 dark:text-slate-400">
                  No orders found.
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="px-6 py-5 font-medium text-slate-900 dark:text-white">
                  {order.orderNumber || 'N/A'}
                </td>

                <td className="px-6 py-5 text-sm text-slate-700 dark:text-slate-300">
                  {order.pickupLocation
                    ? order.pickupLocation.length > 20
                      ? order.pickupLocation.slice(0, 20) + '...'
                      : order.pickupLocation
                    : 'N/A'}
                  {' → '}
                  {order.deliveryLocation
                    ? order.deliveryLocation.length > 20
                      ? order.deliveryLocation.slice(0, 20) + '...'
                      : order.deliveryLocation
                    : 'N/A'}
                </td>

                <td className="px-6 py-5 font-medium text-slate-900 dark:text-white">
                  {currency.format(order.totalPrice || 0)}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${badgeStyles[order.status] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}
                    `}
                  >
                    {order.status || 'PENDING'}
                  </span>
                </td>

                <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(order.orderDate || order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
