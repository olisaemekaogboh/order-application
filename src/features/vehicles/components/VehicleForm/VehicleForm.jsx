import React, { useState, useEffect } from 'react'
import { useVehicles } from '../../hooks/useVehicles'
import {
  VEHICLE_TYPES,
  VEHICLE_TYPES_LABELS,
  VEHICLE_STATUSES,
  VEHICLE_STATUSES_LABELS,
  FUEL_TYPES,
  FUEL_TYPES_LABELS,
  VEHICLE_ROUTES,
} from '../../constants'
import { validateVehicleForm } from '../../validations'
import Button from '@/shared/components/ui/Button/Button'
import Input from '@/shared/components/ui/Input/Input'
import Select from '@/shared/components/ui/Select/Select'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

export const VehicleForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createVehicle, updateVehicle, getVehicle, loading } = useVehicles()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    type: VEHICLE_TYPES.SEDAN,
    fuelType: FUEL_TYPES.PETROL,
    status: VEHICLE_STATUSES.AVAILABLE,
    mileage: '',
    color: '',
    capacity: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isEdit) {
      loadVehicle()
    }
  }, [id])

  const loadVehicle = async () => {
    try {
      const vehicle = await getVehicle(id)
      if (vehicle) {
        setFormData({
          plateNumber: vehicle.plateNumber || '',
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.year || '',
          type: vehicle.type || VEHICLE_TYPES.SEDAN,
          fuelType: vehicle.fuelType || FUEL_TYPES.PETROL,
          status: vehicle.status || VEHICLE_STATUSES.AVAILABLE,
          mileage: vehicle.mileage || '',
          color: vehicle.color || '',
          capacity: vehicle.capacity || '',
        })
      }
    } catch (error) {
      // error handled in hook
    }
  }

  const typeOptions = Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const statusOptions = Object.entries(VEHICLE_STATUSES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const fuelOptions = Object.entries(FUEL_TYPES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateVehicleForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors')
      return
    }
    setSubmitting(true)
    try {
      const data = {
        ...formData,
        year: parseInt(formData.year),
        mileage: formData.mileage ? parseFloat(formData.mileage) : null,
        capacity: formData.capacity ? parseFloat(formData.capacity) : null,
      }
      if (isEdit) {
        await updateVehicle(id, data)
      } else {
        await createVehicle(data)
      }
      navigate(VEHICLE_ROUTES.LIST)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Plate Number"
              value={formData.plateNumber}
              onChange={(e) => handleChange('plateNumber', e.target.value)}
              error={errors.plateNumber}
              disabled={submitting}
              placeholder="e.g., ABC-123-456"
            />
            <Input
              label="Color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              disabled={submitting}
              placeholder="e.g., Red, Blue, White"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Make"
              value={formData.make}
              onChange={(e) => handleChange('make', e.target.value)}
              error={errors.make}
              disabled={submitting}
              placeholder="e.g., Toyota, Honda, Ford"
            />
            <Input
              label="Model"
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              error={errors.model}
              disabled={submitting}
              placeholder="e.g., Camry, Civic, F-150"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Year"
              type="number"
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              error={errors.year}
              disabled={submitting}
              placeholder="2024"
            />
            <Input
              label="Mileage (km)"
              type="number"
              value={formData.mileage}
              onChange={(e) => handleChange('mileage', e.target.value)}
              error={errors.mileage}
              disabled={submitting}
              placeholder="0"
            />
            <Input
              label="Capacity (kg)"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', e.target.value)}
              disabled={submitting}
              placeholder="1000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Vehicle Type"
              options={typeOptions}
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              error={errors.type}
              disabled={submitting}
            />
            <Select
              label="Fuel Type"
              options={fuelOptions}
              value={formData.fuelType}
              onChange={(e) => handleChange('fuelType', e.target.value)}
              error={errors.fuelType}
              disabled={submitting}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              error={errors.status}
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(VEHICLE_ROUTES.LIST)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : isEdit ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
