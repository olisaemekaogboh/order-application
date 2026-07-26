import React, { useState, useEffect } from 'react'
import { driverService } from '../../services/driverService'
import DriverTable from '../DriverTable/DriverTable'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import toast from 'react-hot-toast'

export const DriverManagement = () => {
  const [drivers, setDrivers] = useState([])
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDrivers()
  }, [pagination.page])

  const fetchDrivers = async () => {
    setLoading(true)
    try {
      const response = await driverService.getAllDrivers({
        page: pagination.page,
        size: pagination.size,
      })
      setDrivers(response.content || [])
      setPagination((prev) => ({
        ...prev,
        total: response.totalElements || 0,
      }))
    } catch (error) {
      toast.error('Failed to load drivers')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Driver Management</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <DriverTable drivers={drivers} />
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

export default DriverManagement
