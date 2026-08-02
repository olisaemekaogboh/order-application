import React, { useState, useEffect } from 'react'
import { useVehicles } from '../../hooks/useVehicles'
import {
  VEHICLE_STATUSES,
  VEHICLE_TYPES,
  VEHICLE_STATUSES_LABELS,
  VEHICLE_TYPES_LABELS,
  VEHICLE_ROUTES,
} from '../../constants'
import { getVehicleTypeIcon, formatMileage } from '../../utils'
import Button from '@/shared/components/ui/Button/Button'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Select from '@/shared/components/ui/Select/Select'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import { useNavigate } from 'react-router-dom'

export const VehicleList = () => {
  const { vehicles, loading, pagination, fetchVehicles, changePage } = useVehicles()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    fetchVehicles({
      search: search || undefined,
      status: statusFilter || undefined,
      type: typeFilter || undefined,
    })
  }, [search, statusFilter, typeFilter, pagination.page])

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(VEHICLE_STATUSES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const typeOptions = [
    { value: '', label: 'All Types' },
    ...Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  if (loading && vehicles.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Management</h1>
        <Button onClick={() => navigate(VEHICLE_ROUTES.CREATE)}>Add Vehicle</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Search vehicles..."
          value={search}
          onChange={setSearch}
          className="flex-1"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40"
        />
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full sm:w-40"
        />
      </div>

      {vehicles.length === 0 ? (
        <EmptyState
          icon="🚗"
          title="No Vehicles"
          description="No vehicles found matching your criteria."
          action={<Button onClick={() => navigate(VEHICLE_ROUTES.CREATE)}>Add Vehicle</Button>}
        />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Vehicle Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Plate Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Year
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {getVehicleTypeIcon(vehicle.vehicleType || vehicle.type)}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {vehicle.brand || vehicle.make} {vehicle.model}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {vehicle.manufacturer || ''}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {vehicle.vehicleNumber || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {vehicle.plateNumber || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {VEHICLE_TYPES_LABELS[vehicle.vehicleType || vehicle.type] ||
                          vehicle.vehicleType ||
                          vehicle.type ||
                          'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {vehicle.year || 'N/A'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            vehicle.status === 'AVAILABLE'
                              ? 'success'
                              : vehicle.status === 'ASSIGNED' || vehicle.status === 'IN_USE'
                                ? 'info'
                                : vehicle.status === 'UNDER_MAINTENANCE' ||
                                    vehicle.status === 'MAINTENANCE'
                                  ? 'warning'
                                  : vehicle.status === 'RETIRED'
                                    ? 'danger'
                                    : 'default'
                          }
                        >
                          {VEHICLE_STATUSES_LABELS[vehicle.status] || vehicle.status || 'AVAILABLE'}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/vehicles/${vehicle.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/vehicles/${vehicle.id}/edit`)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {pagination.page * pagination.size + 1} to{' '}
              {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
              {pagination.total} vehicles
            </div>
            <Pagination
              currentPage={pagination.page + 1}
              totalPages={pagination.totalPages}
              onPageChange={(page) => changePage(page - 1)}
            />
          </div>
        </>
      )}
    </div>
  )
}
