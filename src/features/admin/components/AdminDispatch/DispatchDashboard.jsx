// DispatchDashboard.jsx - Fixed imports and uses dispatchService
import React, { useState, useEffect } from 'react'
import { dispatchService } from '@/shared/services/dispatchService'
import DispatchTable from './DispatchTable'
import AssignDispatchModal from './AssignDispatchModal'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import toast from 'react-hot-toast'

const DispatchDashboard = () => {
  const [readyOrders, setReadyOrders] = useState([])
  const [dispatches, setDispatches] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)

  const fetchData = async () => {
    setLoading(true)

    try {
      const [orders, dispatchPage, analytics] = await Promise.all([
        dispatchService.getReadyOrders(),
        dispatchService.getAllDispatches({
          page: 0,
          size: 50,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
        }),
        dispatchService.getDispatchAnalytics(),
      ])

      setReadyOrders(Array.isArray(orders) ? orders : [])

      setDispatches(dispatchPage?.content ?? [])

      setAnalytics(analytics ?? {})
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message ?? 'Failed to load dispatch dashboard')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleAssign = async (data) => {
    if (!selectedOrder) return

    setAssigning(true)

    try {
      await dispatchService.manualAssign({
        orderId: selectedOrder.id,
        driverId: data.driverId,
        vehicleId: data.vehicleId,
        priority: Number(data.priority ?? 0),
        scheduledTime: null,
        notes: data.notes ?? '',
      })

      toast.success('Dispatch assigned successfully')

      setShowAssignModal(false)
      setSelectedOrder(null)

      fetchData()
    } catch (error) {
      console.error(error)

      toast.error(error.response?.data?.message ?? 'Unable to assign dispatch')
    } finally {
      setAssigning(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  const analyticsCards = [
    {
      label: 'Pending',
      value: analytics?.pendingDispatches ?? 0,
    },
    {
      label: 'Active',
      value: analytics?.activeDispatches ?? 0,
    },
    {
      label: 'Completed',
      value: analytics?.completedDispatches ?? 0,
    },
    {
      label: 'Cancelled',
      value: analytics?.cancelledDispatches ?? 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispatch Dashboard</h1>
        <Button onClick={fetchData} variant="outline">
          Refresh
        </Button>
      </div>

      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analyticsCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Orders Ready for Dispatch ({readyOrders.length})
        </h2>
        {readyOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            No orders ready for dispatch.
          </div>
        ) : (
          <DispatchTable
            orders={readyOrders}
            type="ready"
            onAssign={(order) => {
              setSelectedOrder(order)
              setShowAssignModal(true)
            }}
          />
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Active Dispatches ({dispatches.length})
        </h2>
        {dispatches.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            No active dispatches.
          </div>
        ) : (
          <DispatchTable dispatches={dispatches} type="active" onRefresh={fetchData} />
        )}
      </div>

      <AssignDispatchModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false)
          setSelectedOrder(null)
        }}
        onAssign={handleAssign}
        order={selectedOrder}
        loading={assigning}
      />
    </div>
  )
}

export default DispatchDashboard
