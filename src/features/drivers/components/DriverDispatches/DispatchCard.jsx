// features/drivers/components/DriverDispatches/DispatchCard.jsx

import React from 'react'
import Button from '@/shared/components/ui/Button/Button'
import Badge from '@/shared/components/ui/Badge/Badge'
import { Truck, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react'

const statusColors = {
  WAITING_DRIVER_ACCEPTANCE: 'warning',
  DRIVER_ACCEPTED: 'info',
  EN_ROUTE_PICKUP: 'primary',
  PICKUP_COMPLETED: 'success',
  DELIVERY_IN_PROGRESS: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'danger',
  FAILED: 'danger',
}

const formatStatus = (status) =>
  status
    ?.replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const DispatchCard = ({ dispatch, onView }) => {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
        <div>
          <h3 className="font-semibold text-lg">{dispatch.orderNumber}</h3>

          <p className="text-sm text-gray-500">{dispatch.customerName || 'Customer'}</p>
        </div>

        <Badge variant={statusColors[dispatch.status] || 'secondary'}>
          {formatStatus(dispatch.status)}
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Pickup</p>
            <p>{dispatch.pickupLocation || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Delivery</p>
            <p>{dispatch.deliveryLocation || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">Vehicle</p>
            <p>{dispatch.vehicleNumber || 'Not Assigned'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <div>
              <p className="text-xs text-gray-500">Created</p>

              <p className="text-sm">
                {dispatch.createdAt ? new Date(dispatch.createdAt).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <div>
              <p className="text-xs text-gray-500">Priority</p>

              <p className="text-sm">{dispatch.priority ?? 0}</p>
            </div>
          </div>
        </div>

        {dispatch.completedAt && (
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600" size={18} />

            <span className="text-sm">
              Delivered {new Date(dispatch.completedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="border-t p-4 dark:border-gray-700">
        <Button className="w-full" onClick={onView}>
          View Dispatch
        </Button>
      </div>
    </div>
  )
}

export default DispatchCard
