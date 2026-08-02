import React, { useEffect, useState } from 'react'
import { vehicleService } from '@/features/vehicles/services/vehicleService'
import Table from '@/shared/components/ui/Table/Table'
import TableHead from '@/shared/components/ui/Table/TableHead'
import TableBody from '@/shared/components/ui/Table/TableBody'
import TableRow from '@/shared/components/ui/Table/TableRow'
import TableCell from '@/shared/components/ui/Table/TableCell'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import Modal from '@/shared/components/ui/Modal/Modal'
import Input from '@/shared/components/ui/Input/Input'
import Select from '@/shared/components/ui/Select/Select'
import { VEHICLE_TYPES_LABELS } from '@/features/vehicles/constants'
import toast from 'react-hot-toast'

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })
  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    registrationNumber: '',
    plateNumber: '',
    manufacturer: '',
    brand: '',
    model: '',
    year: '',
    vehicleType: '',
    fuelType: 'PETROL',
    transmission: 'MANUAL',
    color: '',
    capacityKg: '',
    maxPassengers: '',
    status: 'AVAILABLE',
  })

  const fetchVehicles = async (page = 0) => {
    setLoading(true)
    try {
      const response = await vehicleService.getVehicles({
        page,
        size: pagination.size,
      })

      const content = response.content || []
      const total = response.totalElements || response.total || content.length
      const totalPages = response.totalPages || Math.ceil(total / pagination.size)

      setVehicles(content)
      setPagination({
        page: page,
        size: pagination.size,
        total: total,
        totalPages: totalPages,
      })
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles(0)
  }, [])

  const resetForm = () => {
    setFormData({
      vehicleNumber: '',
      registrationNumber: '',
      plateNumber: '',
      manufacturer: '',
      brand: '',
      model: '',
      year: '',
      vehicleType: '',
      fuelType: 'PETROL',
      transmission: 'MANUAL',
      color: '',
      capacityKg: '',
      maxPassengers: '',
      status: 'AVAILABLE',
    })
    setEditingVehicle(null)
  }

  const handleSave = async () => {
    try {
      if (!formData.vehicleNumber || !formData.vehicleType) {
        toast.error('Vehicle Number and Type are required')
        return
      }

      const data = {
        vehicleNumber: formData.vehicleNumber,
        registrationNumber: formData.registrationNumber || formData.vehicleNumber,
        plateNumber: formData.plateNumber || formData.vehicleNumber,
        manufacturer: formData.manufacturer || '',
        brand: formData.brand || '',
        model: formData.model || '',
        year: formData.year ? parseInt(formData.year) : null,
        vehicleType: formData.vehicleType,
        fuelType: formData.fuelType || 'PETROL',
        transmission: formData.transmission || 'MANUAL',
        color: formData.color || '',
        capacityKg: formData.capacityKg ? parseFloat(formData.capacityKg) : null,
        maxPassengers: formData.maxPassengers ? parseInt(formData.maxPassengers) : null,
        status: formData.status || 'AVAILABLE',
      }

      if (editingVehicle) {
        const updated = await vehicleService.updateVehicle(editingVehicle.id, data)
        toast.success('Vehicle updated successfully')
        setVehicles((prev) => prev.map((v) => (v.id === editingVehicle.id ? updated : v)))
      } else {
        const newVehicle = await vehicleService.createVehicle(data)
        toast.success('Vehicle created successfully')
        setVehicles((prev) => [newVehicle, ...prev])
        setPagination((prev) => ({
          ...prev,
          total: prev.total + 1,
          totalPages: Math.ceil((prev.total + 1) / prev.size),
        }))
      }

      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Save error:', error)
      toast.error(error.response?.data?.message || 'Save failed')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vehicle?')) {
      try {
        await vehicleService.deleteVehicle(id)
        toast.success('Vehicle deleted')
        setVehicles((prev) => prev.filter((v) => v.id !== id))
        setPagination((prev) => ({
          ...prev,
          total: prev.total - 1,
          totalPages: Math.ceil((prev.total - 1) / prev.size),
        }))
      } catch (error) {
        console.error('Delete error:', error)
        toast.error('Delete failed')
      }
    }
  }

  const handleEdit = (row) => {
    setEditingVehicle(row)
    setFormData({
      vehicleNumber: row.vehicleNumber || '',
      registrationNumber: row.registrationNumber || '',
      plateNumber: row.plateNumber || '',
      manufacturer: row.manufacturer || '',
      brand: row.brand || '',
      model: row.model || '',
      year: row.year || '',
      vehicleType: row.vehicleType || '',
      fuelType: row.fuelType || 'PETROL',
      transmission: row.transmission || 'MANUAL',
      color: row.color || '',
      capacityKg: row.capacityKg || '',
      maxPassengers: row.maxPassengers || '',
      status: row.status || 'AVAILABLE',
    })
    setShowModal(true)
  }

  const handlePageChange = (page) => {
    fetchVehicles(page)
  }

  const typeOptions = Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const fuelOptions = [
    { value: 'PETROL', label: 'Petrol' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'ELECTRIC', label: 'Electric' },
    { value: 'HYBRID', label: 'Hybrid' },
    { value: 'CNG', label: 'CNG' },
  ]

  const transmissionOptions = [
    { value: 'MANUAL', label: 'Manual' },
    { value: 'AUTOMATIC', label: 'Automatic' },
    { value: 'CVT', label: 'CVT' },
  ]

  const statusOptions = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'UNDER_MAINTENANCE', label: 'Under Maintenance' },
    { value: 'RETIRED', label: 'Retired' },
    { value: 'INSPECTION_DUE', label: 'Inspection Due' },
  ]

  if (loading && vehicles.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
        >
          Add Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No vehicles found. Click "Add Vehicle" to create one.
        </div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell as="th">Vehicle Number</TableCell>
                <TableCell as="th">Plate Number</TableCell>
                <TableCell as="th">Brand</TableCell>
                <TableCell as="th">Model</TableCell>
                <TableCell as="th">Year</TableCell>
                <TableCell as="th">Type</TableCell>
                <TableCell as="th">Status</TableCell>
                <TableCell as="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.vehicleNumber || 'N/A'}</TableCell>
                  <TableCell>{vehicle.plateNumber || 'N/A'}</TableCell>
                  <TableCell>{vehicle.brand || vehicle.manufacturer || 'N/A'}</TableCell>
                  <TableCell>{vehicle.model || 'N/A'}</TableCell>
                  <TableCell>{vehicle.year || 'N/A'}</TableCell>
                  <TableCell>
                    {VEHICLE_TYPES_LABELS[vehicle.vehicleType] || vehicle.vehicleType || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : vehicle.status === 'ASSIGNED' || vehicle.status === 'IN_USE'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : vehicle.status === 'UNDER_MAINTENANCE' ||
                                vehicle.status === 'MAINTENANCE'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : vehicle.status === 'RETIRED'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {vehicle.status || 'AVAILABLE'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded-md transition-colors dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {pagination.total > 0 ? pagination.page * pagination.size + 1 : 0} to{' '}
              {pagination.total > 0
                ? Math.min((pagination.page + 1) * pagination.size, pagination.total)
                : 0}{' '}
              of {pagination.total} vehicles
            </div>
            <Pagination
              currentPage={pagination.page + 1}
              totalPages={pagination.totalPages}
              onPageChange={(page) => handlePageChange(page - 1)}
            />
          </div>
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{editingVehicle ? 'Edit' : 'New'} Vehicle</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Vehicle Number *"
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                placeholder="e.g., VEH-001"
                required
              />
              <Input
                label="Plate Number"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                placeholder="e.g., ABC-123-XY"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="e.g., Toyota"
              />
              <Input
                label="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g., Toyota"
              />
              <Input
                label="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g., Hiace"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024"
              />
              <Select
                label="Vehicle Type *"
                options={typeOptions}
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Fuel Type"
                options={fuelOptions}
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
              />
              <Select
                label="Transmission"
                options={transmissionOptions}
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g., Red"
              />
              <Input
                label="Capacity (kg)"
                type="number"
                value={formData.capacityKg}
                onChange={(e) => setFormData({ ...formData, capacityKg: e.target.value })}
                placeholder="1000"
              />
            </div>

            <Input
              label="Max Passengers"
              type="number"
              value={formData.maxPassengers}
              onChange={(e) => setFormData({ ...formData, maxPassengers: e.target.value })}
              placeholder="5"
            />

            <Select
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : editingVehicle ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminVehicles
