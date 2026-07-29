import React, { useEffect, useState } from 'react'
import { userService } from '../../../customers/services/userService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })
  const [search, setSearch] = useState('')

  const fetchCustomers = async (params = {}) => {
    setLoading(true)
    try {
      // Use userService to get users with role CLIENT
      const response = await userService.getUsers({
        role: 'CLIENT',
        page: pagination.page,
        size: pagination.size,
        search: search || undefined,
        ...params,
      })
      setCustomers(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      console.error('Failed to fetch customers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [pagination.page, pagination.size, search])

  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'createdAt', label: 'Joined', render: (val) => new Date(val).toLocaleDateString() },
    { key: 'enabled', label: 'Status', render: (val) => (val ? 'Active' : 'Inactive') },
  ]

  if (loading && customers.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {customers.length === 0 ? (
        <EmptyState icon="👥" title="No customers found" />
      ) : (
        <>
          <Table data={customers} columns={columns} />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Showing {pagination.page * pagination.size + 1} to{' '}
              {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
              {pagination.total}
            </span>
            <Pagination
              currentPage={pagination.page + 1}
              totalPages={pagination.totalPages}
              onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default AdminCustomers
