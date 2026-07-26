import React, { useState, useEffect } from 'react'
import { useOrders } from '../../hooks/useOrders'
import OrderList from '../OrderList/OrderList'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Select from '@/shared/components/ui/Select/Select'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import { ORDER_STATUSES_LABELS } from '../../constants'

const OrderHistory = () => {
  const { orders, loading, pagination, fetchOrders, changePage } = useOrders()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchOrders({
      search: search || undefined,
      status: statusFilter || undefined,
    })
  }, [search, statusFilter, pagination.page])

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(ORDER_STATUSES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            placeholder="Search orders..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-64"
          />
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState icon="📋" title="No Orders" description="You haven't placed any orders yet." />
      ) : (
        <>
          <OrderList orders={orders} />
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {pagination.page * pagination.size + 1} to{' '}
              {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
              {pagination.total} orders
            </div>
            <Pagination
              currentPage={pagination.page + 1}
              totalPages={pagination.totalPages}
              onPageChange={(page) => changePage(page - 1)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default OrderHistory
