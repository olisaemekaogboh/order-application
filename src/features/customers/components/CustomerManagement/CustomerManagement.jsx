import React, { useState, useEffect } from 'react'
import { adminService } from '../../../admin/services/adminService'
import CustomerTable from '../CustomerTable/CustomerTable'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import toast from 'react-hot-toast'

const CustomerManagement = () => {
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [pagination.page])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await adminService.getAllUsers({
        page: pagination.page,
        size: pagination.size,
      })
      setUsers(response.content || [])
      setPagination((prev) => ({
        ...prev,
        total: response.totalElements || 0,
      }))
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Management</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <CustomerTable users={users} />
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPages={Math.ceil(pagination.total / pagination.size)}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default CustomerManagement
