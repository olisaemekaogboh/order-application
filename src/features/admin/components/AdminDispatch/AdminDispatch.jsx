import React, { useEffect, useState } from 'react'
import { dispatchService } from '@/shared/services/dispatchService'
import Table from '@/shared/components/ui/Table/Table'
import TableHead from '@/shared/components/ui/Table/TableHead'
import TableBody from '@/shared/components/ui/Table/TableBody'
import TableRow from '@/shared/components/ui/Table/TableRow'
import TableCell, { TableHeaderCell } from '@/shared/components/ui/Table/TableCell'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import toast from 'react-hot-toast'

const AdminDispatch = () => {
  const [dispatches, setDispatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  const fetchDispatches = async () => {
    setLoading(true)
    try {
      const response = await dispatchService.getAllDispatches({
        page: pagination.page,
        size: pagination.size,
      })
      setDispatches(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      toast.error('Failed to load dispatches')
      console.error('Dispatch fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDispatches()
  }, [pagination.page])

  const getStatusBadgeClass = (status) => {
    const classes = {
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      DRIVER_ASSIGNED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      VEHICLE_ASSIGNED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      DRIVER_ACCEPTED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      IN_PROGRESS: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      DRIVER_REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      REASSIGNED: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    }
    return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: 'Pending',
      DRIVER_ASSIGNED: 'Driver Assigned',
      VEHICLE_ASSIGNED: 'Vehicle Assigned',
      DRIVER_ACCEPTED: 'Accepted',
      IN_PROGRESS: 'In Progress',
      DELIVERED: 'Delivered',
      DRIVER_REJECTED: 'Rejected',
      CANCELLED: 'Cancelled',
      FAILED: 'Failed',
      REASSIGNED: 'Reassigned',
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dispatch Management</h1>
        <button
          onClick={fetchDispatches}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          Refresh
        </button>
      </div>

      {dispatches.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No dispatches found
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
                  <TableHeaderCell>Created</TableHeaderCell>
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
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {dispatch.createdAt ? new Date(dispatch.createdAt).toLocaleString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {dispatches.length > 0 && pagination.totalPages > 1 && (
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
    </div>
  )
}

export default AdminDispatch
