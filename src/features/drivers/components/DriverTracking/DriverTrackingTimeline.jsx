// features/drivers/components/DriverTracking/DriverTrackingTimeline.jsx

import { Clock, CheckCircle, Truck, Package, Navigation, Flag } from 'lucide-react'

const timeline = [
  {
    status: 'WAITING_DRIVER_ACCEPTANCE',
    title: 'Dispatch Assigned',
    icon: Clock,
  },
  {
    status: 'DRIVER_ACCEPTED',
    title: 'Driver Accepted',
    icon: CheckCircle,
  },
  {
    status: 'EN_ROUTE_PICKUP',
    title: 'Travelling to Pickup',
    icon: Navigation,
  },
  {
    status: 'PICKUP_COMPLETED',
    title: 'Package Picked Up',
    icon: Package,
  },
  {
    status: 'DELIVERY_IN_PROGRESS',
    title: 'Delivery In Progress',
    icon: Truck,
  },
  {
    status: 'DELIVERED',
    title: 'Delivered',
    icon: Flag,
  },
]

const order = timeline.map((t) => t.status)

const DriverTrackingTimeline = ({ dispatch }) => {
  const currentIndex = order.indexOf(dispatch.status)

  return (
    <div className="space-y-6">
      {timeline.map((step, index) => {
        const Icon = step.icon
        const completed = index <= currentIndex

        return (
          <div key={step.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                ${completed ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <Icon size={18} />
              </div>

              {index !== timeline.length - 1 && (
                <div
                  className={`w-1 h-12
                  ${completed ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                />
              )}
            </div>

            <div className="flex-1">
              <h4
                className={`font-semibold
                ${completed ? 'text-green-600' : 'text-gray-500'}`}
              >
                {step.title}
              </h4>

              {dispatch.status === step.status && (
                <p className="text-sm text-blue-600 mt-1">Current Status</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DriverTrackingTimeline
