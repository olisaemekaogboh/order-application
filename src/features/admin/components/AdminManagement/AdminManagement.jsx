import React, { useState, useEffect } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import CustomerTable from '../../../customers/components/CustomerTable/CustomerTable'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const AdminManagement = () => {
  const { users, loading, pagination, fetchUsersByRole, changePage } = useAdmin()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsersByRole('ADMIN', {
      search: search || undefined,
    })
  }, [search, pagination.page])

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Management</h1>
        <SearchBar
          placeholder="Search admins..."
          value={search}
          onChange={setSearch}
          className="w-full sm:w-64"
        />
      </div>

      <CustomerTable customers={users} showActions />

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {pagination.page * pagination.size + 1} to{' '}
          {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
          {pagination.total} admins
        </div>
        <Pagination
          currentPage={pagination.page + 1}
          totalPages={pagination.totalPages}
          onPageChange={(page) => changePage(page - 1)}
        />
      </div>
    </div>
  )
}

export default AdminManagement
