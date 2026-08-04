// AdminDispatch.jsx - Updated with debugging and fixes
import React, { useEffect, useState } from 'react'
import { dispatchService } from '@/shared/services/dispatchService'
import { orderService } from '@/features/orders/services/orderService'
import { driverService } from '@/features/drivers/services/driverService'
import { vehicleService } from '@/features/vehicles/services/vehicleService'
import Table from '@/shared/components/ui/Table/Table'
import TableHead from '@/shared/components/ui/Table/TableHead'
import TableBody from '@/shared/components/ui/Table/TableBody'
import TableRow from '@/shared/components/ui/Table/TableRow'
import TableCell, { TableHeaderCell } from '@/shared/components/ui/Table/TableCell'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import toast from 'react-hot-toast'
import Button from '@/shared/components/ui/Button/Button'
import Modal from '@/shared/components/ui/Modal/Modal'
import Select from '@/shared/components/ui/Select/Select'

const MOCK_DISPATCHES = [
  {
    id: 'mock-1',
    orderNumber: 'ORD-001',
    status: 'PENDING',
    driverName: 'John Doe',
    vehicleNumber: 'VH-001',
    createdAt: new Date().toISOString(),
    priority: 0,
  },
  {
    id: 'mock-2',
    orderNumber: 'ORD-002',
    status: 'WAITING_DRIVER_ACCEPTANCE',
    driverName: 'Jane Smith',
    vehicleNumber: 'VH-002',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    priority: 1,
  },
  {
    id: 'mock-3',
    orderNumber: 'ORD-003',
    status: 'DRIVER_ACCEPTED',
    driverName: 'Mike Johnson',
    vehicleNumber: 'VH-003',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    priority: 2,
  },
]

const AdminDispatch = () => {
  const [dispatches, setDispatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [useMockData, setUseMockData] = useState(false)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  // Dropdown data
  const [orders, setOrders] = useState([])
  const [drivers, setDrivers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loadingOptions, setLoadingOptions] = useState(false)

  const [formData, setFormData] = useState({
    orderId: '',
    driverId: '',
    vehicleId: '',
    priority: 0,
    notes: '',
  })

  const fetchDispatches = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await dispatchService.getAllDispatches({
        page: pagination.page,
        size: pagination.size,
      })

      let content = []
      let total = 0
      let totalPages = 0

      if (response) {
        if (response.content && Array.isArray(response.content)) {
          content = response.content
          total = response.total || response.totalElements || content.length
          totalPages = response.totalPages || 1
        } else if (Array.isArray(response)) {
          content = response
          total = content.length
          totalPages = 1
        }
      }

      if (content.length === 0 && useMockData) {
        content = MOCK_DISPATCHES
        total = MOCK_DISPATCHES.length
        totalPages = 1
      }

      setDispatches(content)
      setPagination({
        page: pagination.page,
        size: pagination.size,
        total,
        totalPages,
      })
    } catch (error) {
      console.error('Dispatch fetch error:', error)
      setError(error.message)
      toast.error('Failed to load dispatches')

      if (useMockData) {
        setDispatches(MOCK_DISPATCHES)
        setPagination({
          page: 0,
          size: 10,
          total: MOCK_DISPATCHES.length,
          totalPages: 1,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchOptions = async () => {
    setLoadingOptions(true)
    try {
      let ordersData = []
      try {
        const response = await orderService.getAllOrders({
          page: 0,
          size: 100,
        })

        // Debug: Log the full response
        console.log('Full orders response:', response)

        // Handle different response structures
        ordersData = response?.content || response?.data?.content || response || []

        // Debug: Log the raw orders data
        console.log('Raw orders data:', ordersData)
        console.log('Raw orders count:', ordersData.length)

        // Log sample order to see its structure
        if (ordersData.length > 0) {
          console.log('Sample order:', ordersData[0])
          console.log('Sample order keys:', Object.keys(ordersData[0]))
        }

        // Filter orders - check both paymentStatus and payment_status
        ordersData = ordersData.filter((order) => {
          const paymentStatus = order.paymentStatus || order.payment_status || order.paymentStatus
          const orderStatus = order.status

          console.log(
            `Order ${order.orderNumber}: paymentStatus=${paymentStatus}, status=${orderStatus}`
          )

          return (
            paymentStatus === 'PAID' &&
            (orderStatus === 'READY_FOR_DISPATCH' ||
              orderStatus === 'PAID' ||
              orderStatus === 'DISPATCH')
          )
        })

        console.log('Orders loaded (PAID & ready):', ordersData.length)
      } catch (e) {
        console.error('Could not fetch orders:', e)
        if (useMockData) {
          ordersData = [
            {
              id: 'mock-order-1',
              orderNumber: 'ORD-001',
              pickupLocation: '123 Main St',
              deliveryLocation: '456 Oak Ave',
              payment_status: 'PAID',
              status: 'READY_FOR_DISPATCH',
            },
          ]
        }
      }

      setOrders(ordersData || [])

      let driversData = []
      try {
        const response = await driverService.getAvailableDrivers()
        driversData = response?.content || response || []
        console.log('Drivers loaded:', driversData.length)
      } catch (e) {
        console.warn('Failed to fetch drivers:', e)
        if (useMockData) {
          driversData = [
            { id: 'mock-driver-1', name: 'John Doe', available: true, verified: true },
            { id: 'mock-driver-2', name: 'Jane Smith', available: true, verified: true },
          ]
        }
      }
      setDrivers(driversData || [])

      let vehiclesData = []
      try {
        const response = await vehicleService.getAvailableVehicles()
        vehiclesData = response?.content || response || []
        console.log('Vehicles loaded:', vehiclesData.length)
      } catch (e) {
        console.warn('Failed to fetch vehicles:', e)
        if (useMockData) {
          vehiclesData = [
            {
              id: 'mock-vehicle-1',
              vehicleNumber: 'VH-001',
              brand: 'Toyota',
              model: 'Hilux',
              plateNumber: 'ABC-1234',
              status: 'AVAILABLE',
            },
            {
              id: 'mock-vehicle-2',
              vehicleNumber: 'VH-002',
              brand: 'Ford',
              model: 'Transit',
              plateNumber: 'XYZ-5678',
              status: 'AVAILABLE',
            },
          ]
        }
      }
      setVehicles(vehiclesData || [])

      if (ordersData.length === 0 && driversData.length === 0 && vehiclesData.length === 0) {
        toast.error('No data available. Please create orders, drivers, and vehicles first.')
      }
    } catch (error) {
      console.error('Failed to fetch options:', error)
      toast.error('Failed to load form options')
    } finally {
      setLoadingOptions(false)
    }
  }

  useEffect(() => {
    fetchDispatches()
  }, [pagination.page])

  const openCreateModal = () => {
    setShowCreateModal(true)
    // Reset form data
    setFormData({
      orderId: '',
      driverId: '',
      vehicleId: '',
      priority: 0,
      notes: '',
    })
    fetchOptions()
  }

  // AdminDispatch.jsx - Updated handleCreate function

  const handleCreate = async (e) => {
    e.preventDefault()

    if (!formData.orderId || !formData.driverId || !formData.vehicleId) {
      toast.error('Please select an order, driver, and vehicle')
      return
    }

    try {
      console.log('Creating dispatch with data:', formData)

      // First check if there's an existing cancelled dispatch
      try {
        const existingDispatch = await dispatchService.getDispatchByOrder(formData.orderId)
        if (existingDispatch && existingDispatch.status === 'CANCELLED') {
          // Reassign the cancelled dispatch first
          await dispatchService.reassignDispatch(existingDispatch.id)
          toast.info('Reusing cancelled dispatch...')
        }
      } catch (e) {
        // No existing dispatch, that's fine
        console.log('No existing dispatch found')
      }

      // Now create the dispatch with manual assign
      const result = await dispatchService.manualAssign({
        orderId: formData.orderId,
        driverId: formData.driverId,
        vehicleId: formData.vehicleId,
        priority: formData.priority || 0,
        scheduledTime: null,
        notes: formData.notes || '',
      })

      console.log('Manual assign response:', result)

      toast.success('Dispatch created and assigned successfully!')
      setShowCreateModal(false)
      setFormData({
        orderId: '',
        driverId: '',
        vehicleId: '',
        priority: 0,
        notes: '',
      })
      fetchDispatches()
    } catch (error) {
      console.error('Create error:', error)
      console.error('Error response:', error.response?.data)

      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to create dispatch'
      toast.error(errorMessage)
    }
  }
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this dispatch?')) return
    try {
      await dispatchService.cancelDispatch(id, 'Cancelled by admin')
      toast.success('Dispatch cancelled successfully!')
      fetchDispatches()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to cancel dispatch')
    }
  }

  const handleComplete = async (id) => {
    try {
      await dispatchService.completeDispatch(id)
      toast.success('Dispatch completed!')
      fetchDispatches()
    } catch (error) {
      console.error('Complete error:', error)
      toast.error('Failed to complete dispatch')
    }
  }

  const handleReassign = async (id) => {
    try {
      await dispatchService.reassignDispatch(id)
      toast.success('Dispatch reassigned successfully!')
      fetchDispatches()
    } catch (error) {
      console.error('Reassign error:', error)
      toast.error('Failed to reassign dispatch')
    }
  }

  const getStatusBadgeClass = (status) => {
    const classes = {
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      WAITING_DRIVER_ACCEPTANCE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      DRIVER_ACCEPTED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      EN_ROUTE_PICKUP: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      PICKUP_COMPLETED: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
      DELIVERY_IN_PROGRESS: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    }
    return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: 'Pending',
      WAITING_DRIVER_ACCEPTANCE: 'Waiting for Driver',
      DRIVER_ACCEPTED: 'Driver Accepted',
      EN_ROUTE_PICKUP: 'En Route to Pickup',
      PICKUP_COMPLETED: 'Pickup Completed',
      DELIVERY_IN_PROGRESS: 'Delivery In Progress',
      DELIVERED: 'Delivered',
      FAILED: 'Failed',
      CANCELLED: 'Cancelled',
    }
    return labels[status] || status
  }

  const canComplete = (status) => {
    return !['DELIVERED', 'CANCELLED'].includes(status)
  }

  const canCancel = (status) => {
    return !['DELIVERED', 'CANCELLED'].includes(status)
  }

  const canReassign = (status) => {
    return ['FAILED', 'WAITING_DRIVER_ACCEPTANCE'].includes(status)
  }

  const isActive = (status) => {
    return [
      'WAITING_DRIVER_ACCEPTANCE',
      'DRIVER_ACCEPTED',
      'EN_ROUTE_PICKUP',
      'PICKUP_COMPLETED',
      'DELIVERY_IN_PROGRESS',
    ].includes(status)
  }

  const orderOptions = orders.map((order) => ({
    value: order.id,
    label: `${order.orderNumber} - ${order.pickupLocation || 'N/A'} → ${order.deliveryLocation || 'N/A'}`,
  }))

  const driverOptions = drivers.map((driver) => ({
    value: driver.id,
    label: `${driver.name} ${driver.vehiclePlateNumber ? `(${driver.vehiclePlateNumber})` : ''}`,
    disabled: !driver.available || !driver.verified,
  }))

  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.id,
    label: `${vehicle.vehicleNumber} - ${vehicle.brand || ''} ${vehicle.model || ''} (${vehicle.plateNumber || 'N/A'})`,
    disabled: vehicle.status !== 'AVAILABLE',
  }))

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispatch Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setUseMockData(!useMockData)}>
            {useMockData ? '🔴 Mock Data ON' : '⚪ Mock Data OFF'}
          </Button>
          <Button variant="primary" onClick={openCreateModal}>
            + Create Dispatch
          </Button>
          <Button variant="secondary" onClick={fetchDispatches}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{pagination.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          <p className="text-2xl font-bold text-blue-600">
            {dispatches.filter((d) => isActive(d.status)).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {dispatches.filter((d) => d.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {dispatches.filter((d) => d.status === 'DELIVERED').length}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-4">
          Error: {error}
        </div>
      )}

      {dispatches.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No dispatches found</p>
            <p className="text-sm mb-4">
              {useMockData
                ? 'Mock data is enabled but no data available.'
                : 'Create a new dispatch or enable mock data.'}
            </p>
            <Button variant="primary" onClick={() => setUseMockData(true)}>
              Enable Mock Data
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Order</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Driver</TableHeaderCell>
                  <TableHeaderCell>Vehicle</TableHeaderCell>
                  <TableHeaderCell>Priority</TableHeaderCell>
                  <TableHeaderCell>Created</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dispatches.map((dispatch) => (
                  <TableRow key={dispatch.id}>
                    <TableCell className="font-mono text-xs">
                      {dispatch.id?.slice(0, 8) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {dispatch.orderNumber || dispatch.orderId?.slice(0, 8) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(dispatch.status)}`}
                      >
                        {getStatusLabel(dispatch.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {dispatch.driverName || dispatch.driverId?.slice(0, 8) || 'Not Assigned'}
                    </TableCell>
                    <TableCell>
                      {dispatch.vehicleNumber || dispatch.vehicleId?.slice(0, 8) || 'Not Assigned'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          dispatch.priority === 2
                            ? 'bg-red-100 text-red-800'
                            : dispatch.priority === 1
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {dispatch.priority === 2
                          ? 'Urgent'
                          : dispatch.priority === 1
                            ? 'High'
                            : 'Normal'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {dispatch.createdAt ? new Date(dispatch.createdAt).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {canComplete(dispatch.status) && (
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleComplete(dispatch.id)}
                          >
                            Complete
                          </Button>
                        )}
                        {canReassign(dispatch.status) && (
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleReassign(dispatch.id)}
                          >
                            Reassign
                          </Button>
                        )}
                        {canCancel(dispatch.status) && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(dispatch.id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={pagination.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
              />
            </div>
          )}
        </>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Dispatch"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          {loadingOptions ? (
            <div className="flex justify-center py-4">
              <Spinner size="sm" />
            </div>
          ) : (
            <>
              <div>
                <Select
                  label="Order *"
                  options={orderOptions}
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  required
                  placeholder={orders.length === 0 ? 'No orders available' : 'Select an order'}
                />
                {orders.length === 0 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    No orders available for dispatch. Please create an order first.
                  </p>
                )}
              </div>

              <div>
                <Select
                  label="Driver *"
                  options={driverOptions}
                  value={formData.driverId}
                  onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                  required
                  placeholder={drivers.length === 0 ? 'No drivers available' : 'Select a driver'}
                />
                {drivers.length === 0 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    No available drivers found. Please register a driver first.
                  </p>
                )}
              </div>

              <div>
                <Select
                  label="Vehicle *"
                  options={vehicleOptions}
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  required
                  placeholder={vehicles.length === 0 ? 'No vehicles available' : 'Select a vehicle'}
                />
                {vehicles.length === 0 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                    No available vehicles found. Please add a vehicle first.
                  </p>
                )}
              </div>

              <div>
                <Select
                  label="Priority"
                  options={[
                    { value: 0, label: 'Normal' },
                    { value: 1, label: 'High' },
                    { value: 2, label: 'Urgent' },
                  ]}
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  rows="3"
                  placeholder="Additional notes..."
                />
              </div>
            </>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                loadingOptions || !formData.orderId || !formData.driverId || !formData.vehicleId
              }
            >
              {loadingOptions ? 'Loading...' : 'Create Dispatch'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminDispatch
