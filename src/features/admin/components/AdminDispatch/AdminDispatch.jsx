import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import toast from 'react-hot-toast'

const AdminDispatch = () => {
  const [dispatches, setDispatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  const fetchDispatches = async () => {
    setLoading(true)
    try {
      // Note: You'll need to add this method to adminService
      // For now, using a placeholder - you'll need to implement the actual endpoint
      const response = await adminService.getDispatches({
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDispatches()
  }, [pagination.page])

  const columns = [
    { key: 'id', label: 'ID', render: (val) => val.slice(0, 8) },
    { key: 'orderId', label: 'Order' },
    { key: 'status', label: 'Status' },
    { key: 'driverId', label: 'Driver', render: (val) => val?.slice(0, 8) || 'N/A' },
    { key: 'vehicleId', label: 'Vehicle', render: (val) => val?.slice(0, 8) || 'N/A' },
    { key: 'createdAt', label: 'Created', render: (val) => new Date(val).toLocaleString() },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dispatch Management</h1>
      {loading ? <Spinner /> : <Table data={dispatches} columns={columns} />}
      {dispatches.length > 0 && (
        <Pagination
          currentPage={pagination.page + 1}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
        />
      )}
    </div>
  )
}

export default AdminDispatch
