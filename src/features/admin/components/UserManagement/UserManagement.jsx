import React, { useState, useEffect } from 'react'
import { useCustomers } from '../../../customers/hooks/useCustomers'
import CustomerTable from '../../../customers/components/CustomerTable/CustomerTable'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Select from '@/shared/components/ui/Select/Select'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { CUSTOMER_ROLES_LABELS } from '../../../customers/constants'

const UserManagement = () => {
  const { customers, loading, pagination, fetchCustomers, changePage } = useCustomers()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  useEffect(() => {
    fetchCustomers({
      search: search || undefined,
      role: roleFilter || undefined,
    })
  }, [search, roleFilter, pagination.page])

  const roleOptions = [
    { value: '', label: 'All Roles' },
    ...Object.entries(CUSTOMER_ROLES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  if (loading && customers.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  // Calculate the range of items being displayed
  const startItem = pagination.total > 0 ? pagination.page * pagination.size + 1 : 0
  const endItem =
    pagination.total > 0 ? Math.min((pagination.page + 1) * pagination.size, pagination.total) : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            placeholder="Search users..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-64"
          />
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      <CustomerTable customers={customers} showActions />

      {pagination.total > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startItem} to {endItem} of {pagination.total} users
          </div>
          <Pagination
            currentPage={pagination.page + 1}
            totalPages={pagination.totalPages}
            onPageChange={(page) => changePage(page - 1)}
          />
        </div>
      )}
    </div>
  )
}

export default UserManagement
