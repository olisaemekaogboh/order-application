import React, { useState, useEffect } from 'react'
import { useDrivers } from '../../hooks/useDrivers'
import DriverTable from '../DriverTable/DriverTable'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Button from '@/shared/components/ui/Button/Button'
import { VEHICLE_TYPES_LABELS, VEHICLE_TYPES } from '../../../vehicles/constants'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { driverService } from '../../services/driverService' // ✅ Import driverService

export const DriverManagement = () => {
  const {
    drivers,
    loading,
    pagination,
    fetchDrivers,
    changePage,
    deleteDriver,
    updateAvailability,
    registerDriver,
  } = useDrivers()

  const [search, setSearch] = useState('')
  const [filterAvailable, setFilterAvailable] = useState(null)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Fetch drivers on mount and when filters change
  useEffect(() => {
    fetchDrivers({
      search: search || undefined,
      available: filterAvailable,
    })
  }, [search, filterAvailable, pagination.page])

  // Handle driver registration
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const driverData = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        licenseNumber: data.licenseNumber,
        vehicleType: data.vehicleType,
        vehiclePlateNumber: data.vehiclePlateNumber,
        vehicleModel: data.vehicleModel || '',
        bankName: data.bankName || '',
        accountNumber: data.accountNumber || '',
        accountName: data.accountName || '',
        verified: true,
        available: true,
      }

      await registerDriver(driverData)
      reset()
      setShowRegisterForm(false)
      fetchDrivers({
        search: search || undefined,
        available: filterAvailable,
      })
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      await deleteDriver(id)
      fetchDrivers({
        search: search || undefined,
        available: filterAvailable,
      })
    }
  }

  const handleToggleAvailability = async (id, currentStatus) => {
    await updateAvailability(id, !currentStatus)
    fetchDrivers({
      search: search || undefined,
      available: filterAvailable,
    })
  }

  // ✅ New handler for verifying drivers
  const handleVerifyDriver = async (id) => {
    try {
      await driverService.verifyDriverAdmin(id)
      toast.success('Driver verified successfully')
      fetchDrivers({
        search: search || undefined,
        available: filterAvailable,
      })
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to verify driver'
      toast.error(message)
    }
  }

  if (loading && drivers.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Management</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            placeholder="Search drivers..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-64"
          />
          <select
            value={filterAvailable ?? ''}
            onChange={(e) =>
              setFilterAvailable(e.target.value === '' ? null : e.target.value === 'true')
            }
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Drivers</option>
            <option value="true">Available</option>
            <option value="false">Busy</option>
          </select>
          <Button onClick={() => setShowRegisterForm(!showRegisterForm)} variant="primary">
            {showRegisterForm ? 'Cancel' : 'Register Driver'}
          </Button>
        </div>
      </div>

      {/* Registration Form */}
      {showRegisterForm && (
        <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Register New Driver
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="driver@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber', { required: 'Phone number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+2348012345678"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  License Number *
                </label>
                <input
                  type="text"
                  {...register('licenseNumber', { required: 'License number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="LIC-2024-001"
                />
                {errors.licenseNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vehicle Type *
                </label>
                <select
                  {...register('vehicleType', { required: 'Vehicle type is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Vehicle Type</option>
                  {Object.entries(VEHICLE_TYPES).map(([key, value]) => (
                    <option key={value} value={value}>
                      {VEHICLE_TYPES_LABELS[value] || value}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && (
                  <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vehicle Plate Number *
                </label>
                <input
                  type="text"
                  {...register('vehiclePlateNumber', { required: 'Plate number is required' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="ABC-123-XY"
                />
                {errors.vehiclePlateNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.vehiclePlateNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  {...register('vehicleModel')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Toyota Hiace"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  {...register('bankName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="GTBank"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  {...register('accountNumber')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  {...register('accountName')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="px-6">
                {isSubmitting ? 'Registering...' : 'Register Driver'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  reset()
                  setShowRegisterForm(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <DriverTable
        drivers={drivers}
        showActions
        onDelete={handleDelete}
        onToggleAvailability={handleToggleAvailability}
        onVerifyDriver={handleVerifyDriver} // ✅ Now passing the handler
      />

      {pagination.total > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {pagination.page * pagination.size + 1} to{' '}
            {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
            {pagination.total} drivers
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

export default DriverManagement
