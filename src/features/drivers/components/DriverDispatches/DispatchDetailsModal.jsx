// features/drivers/components/DriverDispatches/DispatchDetailsModal.jsx

import React from 'react'
import Modal from '@/shared/components/ui/Modal/Modal'
import Badge from '@/shared/components/ui/Badge/Badge'
import DispatchTimeline from './DispatchTimeline'

const statusColors = {
  WAITING_DRIVER_ACCEPTANCE: 'warning',
  DRIVER_ACCEPTED: 'info',
  EN_ROUTE_PICKUP: 'primary',
  PICKUP_COMPLETED: 'success',
  DELIVERY_IN_PROGRESS: 'primary',
  DELIVERED: 'success',
  FAILED: 'danger',
  CANCELLED: 'danger',
}

const formatStatus = (status) =>
  status
    ?.replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const formatDate = (date) => {
  if (!date) return '-'

  return new Date(date).toLocaleString()
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b dark:border-gray-700 py-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value || '-'}</span>
  </div>
)

const DispatchDetailsModal = ({ isOpen, onClose, dispatch }) => {
  if (!dispatch) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Dispatch ${dispatch.orderNumber}`} size="xl">
      <div className="space-y-8">
        {/* Dispatch Information */}

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Dispatch Information</h2>

            <Badge variant={statusColors[dispatch.status] || 'secondary'}>
              {formatStatus(dispatch.status)}
            </Badge>
          </div>

          <InfoRow label="Order Number" value={dispatch.orderNumber} />

          <InfoRow label="Customer" value={dispatch.customerName} />

          <InfoRow label="Phone" value={dispatch.customerPhone} />

          <InfoRow label="Pickup" value={dispatch.pickupLocation} />

          <InfoRow label="Delivery" value={dispatch.deliveryLocation} />

          <InfoRow label="Driver" value={dispatch.driverName} />

          <InfoRow label="Vehicle" value={dispatch.vehicleNumber} />

          <InfoRow label="Priority" value={dispatch.priority} />

          <InfoRow label="Retry Count" value={dispatch.retryCount} />
        </div>

        {/* Timeline */}

        <DispatchTimeline dispatch={dispatch} />

        {/* Dates */}

        <div>
          <h2 className="text-lg font-semibold mb-4">Activity</h2>

          <InfoRow label="Created" value={formatDate(dispatch.createdAt)} />

          <InfoRow label="Assigned" value={formatDate(dispatch.assignedAt)} />

          <InfoRow label="Accepted" value={formatDate(dispatch.acceptedAt)} />

          <InfoRow label="Completed" value={formatDate(dispatch.completedAt)} />
        </div>
      </div>
    </Modal>
  )
}

export default DispatchDetailsModal
