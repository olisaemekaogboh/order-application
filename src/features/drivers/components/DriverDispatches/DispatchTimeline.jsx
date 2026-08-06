// features/drivers/components/DriverDispatches/DispatchTimeline.jsx

import React from 'react'
import { Clock, CheckCircle, Truck, Package, MapPin } from 'lucide-react'

const steps = [
  {
    key: 'createdAt',
    label: 'Dispatch Created',
    icon: Clock,
  },
  {
    key: 'assignedAt',
    label: 'Assigned',
    icon: Truck,
  },
  {
    key: 'acceptedAt',
    label: 'Driver Accepted',
    icon: CheckCircle,
  },
  {
    key: 'pickupCompletedAt',
    label: 'Pickup Completed',
    icon: Package,
  },
  {
    key: 'completedAt',
    label: 'Delivered',
    icon: MapPin,
  },
]

const formatDate = (value) => {
  if (!value) return null
  return new Date(value).toLocaleString()
}

const DispatchTimeline = ({ dispatch }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">Dispatch Timeline</h2>

      <div className="relative border-l-2 border-gray-300 dark:border-gray-700 ml-4">
        {steps.map((step) => {
          const Icon = step.icon
          const completed = !!dispatch?.[step.key]

          return (
            <div key={step.key} className="relative mb-8 ml-6">
              <span
                className={`absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full border-2
                ${
                  completed
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-white dark:bg-gray-800 border-gray-300 text-gray-400'
                }`}
              >
                <Icon size={16} />
              </span>

              <div>
                <h4 className={`font-medium ${completed ? 'text-green-600' : 'text-gray-500'}`}>
                  {step.label}
                </h4>

                {completed ? (
                  <p className="text-sm text-gray-500">{formatDate(dispatch[step.key])}</p>
                ) : (
                  <p className="text-sm text-gray-400">Pending</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DispatchTimeline
