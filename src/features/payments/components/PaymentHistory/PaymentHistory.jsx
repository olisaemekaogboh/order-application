// features/payments/components/PaymentHistory/PaymentHistory.jsx
import React, { useState, useEffect } from 'react'
import { usePayments } from '../../hooks/usePayments'
import { PAYMENT_STATUSES_LABELS, PAYMENT_STATUSES_COLORS } from '../../constants'
import { formatPaymentAmount, formatPaymentDate } from '../../utils'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import { useAuth } from '../../../auth/hooks/useAuth'

const PaymentHistory = () => {
  const { user } = useAuth()
  const { payments, loading, pagination, getUserPayments, changePage } = usePayments()

  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const params = {}
    if (statusFilter) {
      params.status = statusFilter
    }
    getUserPayments(params)
  }, [statusFilter, pagination.page])

  const getStatusBadge = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      PROCESSING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      PAID: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      FAILED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      REFUNDED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      PARTIALLY_REFUNDED:
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    }
    return colors[status] || colors.PENDING
  }

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(PAYMENT_STATUSES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  if (loading && payments.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment History ({pagination.total})
        </h1>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {payments.length === 0 ? (
        <EmptyState
          icon="💳"
          title="No Payments Found"
          description="You haven't made any payments yet."
        />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                        {payment.transactionReference || payment.reference || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {payment.orderNumber || payment.order?.orderNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        {formatPaymentAmount(payment.amount, payment.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {payment.paymentMethod || payment.method || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.status)}`}
                        >
                          {PAYMENT_STATUSES_LABELS[payment.status] || payment.status || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatPaymentDate(payment.paymentDate || payment.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {pagination.page * pagination.size + 1} to{' '}
                {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
                {pagination.total} payments
              </div>
              <Pagination
                currentPage={pagination.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={(page) => changePage(page - 1)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PaymentHistory
