// OrderForm.jsx - Add the onAddressChange prop and use it
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { VEHICLE_TYPES, VEHICLE_TYPES_LABELS } from '../../constants'

const OrderForm = ({
  onSubmit,
  loading,
  initialData = {},
  vehicleOptions = [],
  selectedVehicle = '',
  onVehicleChange,
  onAddressChange, // Add this prop
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      pickupLocation: initialData.pickupLocation || '',
      deliveryLocation: initialData.deliveryLocation || '',
      distanceKm: initialData.distanceKm || '',
      weight: initialData.weight || '',
      volume: initialData.volume || '',
      vehicleType: selectedVehicle || initialData.vehicleType || VEHICLE_TYPES.SEDAN,
      pickupDate: initialData.pickupDate || '',
      expressDelivery: initialData.expressDelivery || false,
    },
  })

  const vehicleType = watch('vehicleType')
  const pickupLocation = watch('pickupLocation')
  const deliveryLocation = watch('deliveryLocation')

  useEffect(() => {
    if (onVehicleChange && vehicleType) {
      onVehicleChange(vehicleType)
    }
  }, [vehicleType, onVehicleChange])

  useEffect(() => {
    if (selectedVehicle) {
      setValue('vehicleType', selectedVehicle)
    }
  }, [selectedVehicle, setValue])

  // Trigger address change when both locations are filled
  useEffect(() => {
    if (pickupLocation && deliveryLocation && onAddressChange) {
      const debounce = setTimeout(() => {
        onAddressChange(pickupLocation, deliveryLocation)
      }, 500)
      return () => clearTimeout(debounce)
    }
  }, [pickupLocation, deliveryLocation, onAddressChange])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Pickup Location
        </label>
        <input
          {...register('pickupLocation', { required: 'Pickup location is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {errors.pickupLocation && (
          <p className="text-red-500 text-xs mt-1">{errors.pickupLocation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Delivery Location
        </label>
        <input
          {...register('deliveryLocation', { required: 'Delivery location is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {errors.deliveryLocation && (
          <p className="text-red-500 text-xs mt-1">{errors.deliveryLocation.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Distance (km)
          </label>
          <input
            type="number"
            step="0.1"
            {...register('distanceKm', { required: 'Distance is required', min: 1 })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.distanceKm && (
            <p className="text-red-500 text-xs mt-1">{errors.distanceKm.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            {...register('weight')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Volume (m³)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('volume')}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Vehicle Type
          </label>
          <select
            {...register('vehicleType', { required: 'Vehicle type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {vehicleOptions.length > 0
              ? vehicleOptions.map((opt) => (
                  <option key={opt.vehicleType} value={opt.vehicleType}>
                    {VEHICLE_TYPES_LABELS[opt.vehicleType] || opt.vehicleType}
                  </option>
                ))
              : Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
          </select>
          {errors.vehicleType && (
            <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Pickup Date & Time
        </label>
        <input
          type="datetime-local"
          {...register('pickupDate', { required: 'Pickup date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        {errors.pickupDate && (
          <p className="text-red-500 text-xs mt-1">{errors.pickupDate.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('expressDelivery')}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Express Delivery
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  )
}

export default OrderForm
