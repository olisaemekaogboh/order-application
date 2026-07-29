import React, { useEffect, useState } from 'react'
import { trackingService } from '../../../tracking/services/trackingService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const AdminTracking = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  // Use admin endpoint: /admin/tracking
  // We'll add a method in trackingService for admin
  // Assuming trackingService.getAllTracking exists
  const fetchSessions = async () => {
    setLoading(true)
    try {
      // We'll assume trackingService has getAllTracking(params)
      const response = await trackingService.getAllTracking({
        page: pagination.page,
        size: pagination.size,
      })
      setSessions(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      console.error('Failed to load tracking', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [pagination.page])

  const columns = [
    { key: 'id', label: 'ID', render: (val) => val.slice(0, 8) },
    { key: 'orderId', label: 'Order' },
    { key: 'status', label: 'Status' },
    { key: 'driverId', label: 'Driver' },
    { key: 'updatedAt', label: 'Last Update', render: (val) => new Date(val).toLocaleString() },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tracking Sessions</h1>
      {loading ? <Spinner /> : <Table data={sessions} columns={columns} />}
      <Pagination
        currentPage={pagination.page + 1}
        totalPages={pagination.totalPages}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
      />
    </div>
  )
}

export default AdminTracking
