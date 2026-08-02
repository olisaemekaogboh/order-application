import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'

const AdminTracking = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const response = await adminService.getAllTracking({
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
    { key: 'driverId', label: 'Driver', render: (val) => val?.slice(0, 8) || 'N/A' },
    { key: 'updatedAt', label: 'Last Update', render: (val) => new Date(val).toLocaleString() },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tracking Sessions</h1>
      {loading ? (
        <Spinner />
      ) : sessions.length === 0 ? (
        <EmptyState icon="📍" title="No tracking sessions found" />
      ) : (
        <>
          <Table data={sessions} columns={columns} />
          <Pagination
            currentPage={pagination.page + 1}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
          />
        </>
      )}
    </div>
  )
}

export default AdminTracking
