// features/admin/components/AdminPayments/AdminPayments.jsx
import React, { useState, useEffect } from 'react'
import { paymentService } from '../../../payments/services/paymentService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import { PAYMENT_STATUSES_LABELS, PAYMENT_STATUSES_COLORS } from '../../../payments/constants'
import { formatPaymentAmount, formatPaymentDate } from '../../../payments/utils'
import toast from 'react-hot-toast'

const AdminPayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0,
  })
  const [filters, setFilters] = useState({
    status: '',
    gateway: '',
  })

  const fetchPayments = async (page = 0) => {
    setLoading(true)
    try {
      const params = {
        page: page,
        size: pagination.size,
        sortBy: 'createdAt',
        sortDirection: 'DESC',
      }

      if (filters.status) {
        params.status = filters.status
      }
      if (filters.gateway) {
        params.gateway = filters.gateway
      }

      const response = await paymentService.getAllPayments(params)

      setPayments(response.content || [])
      setPagination({
        page: response.pageNumber || response.page || 0,
        size: response.pageSize || response.size || 10,
        total: response.totalElements || response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      console.error('Failed to fetch payments', error)
      toast.error(error.response?.data?.message || 'Failed to load payments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments(0)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handlePageChange = (page) => {
    fetchPayments(page - 1)
  }

  const resetFilters = () => {
    setFilters({ status: '', gateway: '' })
  }

  const getStatusBadge = (status) => {
    const colors =
      PAYMENT_STATUSES_COLORS[status] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    return colors
  }

  const columns = [
    {
      key: 'transactionReference',
      label: 'Reference',
      render: (val) => val?.slice(0, 12) || 'N/A',
    },
    {
      key: 'orderNumber',
      label: 'Order',
      render: (val, row) => val || row.order?.orderNumber || 'N/A',
    },
    {
      key: 'userEmail',
      label: 'Customer',
      render: (val, row) => val || row.user?.email || row.customerEmail || 'N/A',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (val, row) => formatPaymentAmount(val, row.currency),
    },
    {
      key: 'paymentMethod',
      label: 'Method',
      render: (val) => val || 'N/A',
    },
    {
      key: 'gateway',
      label: 'Gateway',
      render: (val) => val || 'N/A',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(val)}`}>
          {PAYMENT_STATUSES_LABELS[val] || val || 'PENDING'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (val) => formatPaymentDate(val),
    },
  ]

  if (loading && payments.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(PAYMENT_STATUSES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const gatewayOptions = [
    { value: '', label: 'All Gateways' },
    { value: 'PAYSTACK', label: 'Paystack' },
    { value: 'FLUTTERWAVE', label: 'Flutterwave' },
    { value: 'CARD', label: 'Card' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
    { value: 'CASH', label: 'Cash' },
    { value: 'WALLET', label: 'Wallet' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Management ({pagination.total})
        </h1>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.gateway}
            onChange={(e) => handleFilterChange('gateway', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {gatewayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Reset
          </button>
          <button
            onClick={() => fetchPayments(0)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {payments.length === 0 ? (
        <EmptyState icon="💳" title="No payments found" />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table data={payments} columns={columns} />
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
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminPayments
