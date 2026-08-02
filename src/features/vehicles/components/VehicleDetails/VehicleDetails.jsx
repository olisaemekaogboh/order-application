import React, { useState, useEffect } from 'react'
import { useVehicles } from '../../hooks/useVehicles'
import {
  VEHICLE_STATUSES,
  VEHICLE_STATUSES_LABELS,
  VEHICLE_TYPES_LABELS,
  VEHICLE_TYPES_ICONS,
  FUEL_TYPES_LABELS,
  MAINTENANCE_TYPES_LABELS,
  VEHICLE_ROUTES,
} from '../../constants'
import { formatMileage, formatVehicleYear } from '../../utils'
import Button from '@/shared/components/ui/Button/Button'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import Tabs from '@/shared/components/ui/Tabs/Tabs'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const VehicleDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentVehicle,
    maintenanceHistory,
    loading,
    getVehicle,
    getMaintenanceHistory,
    updateVehicleStatus,
    deleteVehicle,
  } = useVehicles()

  const [activeTab, setActiveTab] = useState(0)
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false)

  useEffect(() => {
    if (id) {
      getVehicle(id)
      getMaintenanceHistory(id)
    }
  }, [id])

  const handleStatusChange = async (newStatus) => {
    if (window.confirm(`Change vehicle status to "${VEHICLE_STATUSES_LABELS[newStatus]}"?`)) {
      setStatusUpdateLoading(true)
      try {
        // ✅ Call the fixed service
        const result = await updateVehicleStatus(id, newStatus)
        toast.success(`Vehicle status updated to ${VEHICLE_STATUSES_LABELS[newStatus]}`)
        // ✅ Update local state
        setCurrentVehicle(result)
        // ✅ Refresh from server
        await getVehicle(id)
      } catch (error) {
        console.error('Status update error:', error)
        toast.error(error.response?.data?.message || 'Failed to update status')
      } finally {
        setStatusUpdateLoading(false)
      }
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this vehicle?')) {
      await deleteVehicle(id)
      navigate(VEHICLE_ROUTES.LIST)
    }
  }

  if (loading && !currentVehicle) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!currentVehicle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Vehicle not found</p>
        <Button onClick={() => navigate(VEHICLE_ROUTES.LIST)} className="mt-4">
          Back to Vehicles
        </Button>
      </div>
    )
  }

  const tabs = [
    {
      label: 'Details',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentVehicle.make} {currentVehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Plate Number</p>
                <p className="text-gray-900 dark:text-white">{currentVehicle.plateNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                <p className="text-gray-900 dark:text-white">
                  {formatVehicleYear(currentVehicle.year)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <p className="text-gray-900 dark:text-white">
                  {VEHICLE_TYPES_LABELS[currentVehicle.type] || currentVehicle.type}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                <p className="text-gray-900 dark:text-white">
                  {FUEL_TYPES_LABELS[currentVehicle.fuelType] || currentVehicle.fuelType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mileage</p>
                <p className="text-gray-900 dark:text-white">
                  {formatMileage(currentVehicle.mileage)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
                <p className="text-gray-900 dark:text-white">{currentVehicle.color || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                <p className="text-gray-900 dark:text-white">
                  {currentVehicle.capacity ? `${currentVehicle.capacity} kg` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <div className="flex items-center gap-3 mt-1">
              <Badge
                variant={
                  currentVehicle.status === 'AVAILABLE'
                    ? 'success'
                    : currentVehicle.status === 'IN_USE'
                      ? 'info'
                      : currentVehicle.status === 'MAINTENANCE'
                        ? 'warning'
                        : 'danger'
                }
              >
                {VEHICLE_STATUSES_LABELS[currentVehicle.status] || currentVehicle.status}
              </Badge>
              <div className="flex flex-wrap gap-2">
                {Object.values(VEHICLE_STATUSES).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={currentVehicle.status === status ? 'primary' : 'outline'}
                    onClick={() => handleStatusChange(status)}
                    disabled={statusUpdateLoading}
                  >
                    Set {VEHICLE_STATUSES_LABELS[status]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {currentVehicle.driver && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Driver</p>
              <p className="text-gray-900 dark:text-white">{currentVehicle.driver.name}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      label: `Maintenance (${maintenanceHistory.length})`,
      content: (
        <div className="space-y-4">
          {maintenanceHistory.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No maintenance records</p>
          ) : (
            maintenanceHistory.map((record, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {MAINTENANCE_TYPES_LABELS[record.type] || record.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{record.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ₦{record.cost?.toLocaleString() || '0'}
                    </p>
                    <Badge variant={record.status === 'COMPLETED' ? 'success' : 'warning'}>
                      {record.status || 'Scheduled'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{VEHICLE_TYPES_ICONS[currentVehicle.type]}</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentVehicle.make} {currentVehicle.model}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/vehicles/${id}/edit`)}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={() => navigate(VEHICLE_ROUTES.LIST)}>
            Back
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab={0} onChange={setActiveTab} />
    </div>
  )
}
