import React from 'react'

const OrderStatusBadge = ({ status }) => {
  const statusMap = {
    PENDING: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
    ASSIGNED: { label: 'Assigned', className: 'bg-blue-100 text-blue-800' },
    PICKED_UP: {
      label: 'Picked Up',
      className: 'bg-purple-100 text-purple-800',
    },
    IN_TRANSIT: {
      label: 'In Transit',
      className: 'bg-indigo-100 text-indigo-800',
    },
    DELIVERED: { label: 'Delivered', className: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
  }

  const info = statusMap[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800',
  }

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.className}`}
    >
      {info.label}
    </span>
  )
}

export default OrderStatusBadge
