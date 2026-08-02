// OrderManagement.jsx
import React, { useState, useEffect } from 'react'
import { useOrders } from '../../../orders/hooks/useOrders'
import OrderTable from '../../../orders/components/OrderTable/OrderTable'
import OrderDetailsModal from '../../../orders/components/OrderDetailsModal/OrderDetailsModal'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Select from '@/shared/components/ui/Select/Select'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import { ORDER_STATUSES_LABELS } from '../../../orders/constants'
import DriverAssignmentModal from '@/features/drivers/components/DriverAssignmentModal/DriverAssignmentModal'
import toast from 'react-hot-toast'

const OrderManagement = () => {
  const {
    orders,
    loading,
    pagination,
    fetchAllOrders,
    changePage,
    assignDriver,
    updateOrderStatus,
    cancelOrder,
  } = useOrders()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    fetchAllOrders({
      search: search || undefined,
      status: statusFilter || undefined,
    })
  }, [search, statusFilter, pagination.page])

  const handleAssignDriver = async (driverId) => {
    if (selectedOrder) {
      try {
        await assignDriver(selectedOrder.id, driverId)
        setShowAssignmentModal(false)
        setSelectedOrder(null)
        toast.success('Driver assigned successfully')
      } catch (error) {
        // error handled in hook
      }
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  const handleCancelOrder = async (orderId) => {
    const reason = window.prompt('Please enter cancellation reason:')
    if (reason !== null) {
      await cancelOrder(orderId, reason)
    }
  }

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
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Order Management ({pagination.total})
        </h1>
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
        <EmptyState icon="📋" title="No Orders" description="No orders found." />
      ) : (
        <>
          <OrderTable
            orders={orders}
            onAssign={(order) => {
              setSelectedOrder(order)
              setShowAssignmentModal(true)
            }}
            onViewDetails={handleViewDetails}
            onUpdateStatus={updateOrderStatus}
            onCancel={handleCancelOrder}
          />

          {pagination.totalPages > 1 && (
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
          )}
        </>
      )}

      <DriverAssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => {
          setShowAssignmentModal(false)
          setSelectedOrder(null)
        }}
        onAssign={handleAssignDriver}
        orderId={selectedOrder?.id}
      />

      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false)
          setSelectedOrder(null)
        }}
        order={selectedOrder}
      />
    </div>
  )
}

export default OrderManagement
