import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { VEHICLE_TYPES, VEHICLE_TYPES_LABELS } from '../../constants'

const DEFAULT_WEIGHT = 1
const DEFAULT_VOLUME = 1

const OrderForm = forwardRef(
  (
    {
      onSubmit,
      loading,
      initialData = {},
      vehicleOptions = [],
      selectedVehicle = '',
      onVehicleChange,
      onAddressChange,
      onFormChange,
      initialDistance = null,
      defaultWeight = DEFAULT_WEIGHT,
      defaultVolume = DEFAULT_VOLUME,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
      getValues,
    } = useForm({
      defaultValues: {
        pickupLocation: initialData.pickupLocation || '',
        deliveryLocation: initialData.deliveryLocation || '',
        distanceKm: initialDistance || initialData.distanceKm || '',
        weight: initialData.weight || defaultWeight,
        volume: initialData.volume || defaultVolume,
        vehicleType: selectedVehicle || initialData.vehicleType || VEHICLE_TYPES.SEDAN,
        pickupDate: initialData.pickupDate || '',
        expressDelivery: initialData.expressDelivery || false,
      },
    })

    // Watch all form fields for changes
    const watchWeight = watch('weight')
    const watchVolume = watch('volume')
    const watchVehicleType = watch('vehicleType')
    const watchExpressDelivery = watch('expressDelivery')
    const watchPickupLocation = watch('pickupLocation')
    const watchDeliveryLocation = watch('deliveryLocation')

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      setValue,
      getValues,
      reset: (values) => {
        Object.keys(values).forEach((key) => {
          setValue(key, values[key])
        })
      },
    }))

    const addressDebounceRef = useRef(null)

    // Update distance field when initialDistance changes
    useEffect(() => {
      if (initialDistance !== null && initialDistance !== undefined) {
        console.log('📝 Setting distance field to:', initialDistance)
        setValue('distanceKm', initialDistance)
      }
    }, [initialDistance, setValue])

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (addressDebounceRef.current) {
          clearTimeout(addressDebounceRef.current)
        }
      }
    }, [])

    // Handle vehicle type change
    useEffect(() => {
      if (onVehicleChange && watchVehicleType) {
        onVehicleChange(watchVehicleType)
      }
    }, [watchVehicleType, onVehicleChange])

    // Update form when selectedVehicle prop changes
    useEffect(() => {
      if (selectedVehicle) {
        setValue('vehicleType', selectedVehicle)
      }
    }, [selectedVehicle, setValue])

    // Notify parent when form fields change (for price sync)
    useEffect(() => {
      if (onFormChange) {
        onFormChange({
          weight: parseFloat(watchWeight) || defaultWeight,
          volume: parseFloat(watchVolume) || defaultVolume,
          vehicleType: watchVehicleType,
          expressDelivery: watchExpressDelivery,
        })
      }
    }, [
      watchWeight,
      watchVolume,
      watchVehicleType,
      watchExpressDelivery,
      onFormChange,
      defaultWeight,
      defaultVolume,
    ])

    // Trigger address change with debouncing when both locations are filled
    useEffect(() => {
      if (addressDebounceRef.current) {
        clearTimeout(addressDebounceRef.current)
      }

      if (
        watchPickupLocation &&
        watchDeliveryLocation &&
        watchPickupLocation.length >= 3 &&
        watchDeliveryLocation.length >= 3 &&
        onAddressChange
      ) {
        console.log('📍 OrderForm - Triggering address change:', {
          pickupLocation: watchPickupLocation,
          deliveryLocation: watchDeliveryLocation,
        })

        addressDebounceRef.current = setTimeout(() => {
          onAddressChange(watchPickupLocation, watchDeliveryLocation)
        }, 700)
      }
    }, [watchPickupLocation, watchDeliveryLocation, onAddressChange])

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pickup Location
          </label>
          <input
            {...register('pickupLocation', { required: 'Pickup location is required' })}
            placeholder="e.g., Onitsha, Nigeria"
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
            placeholder="e.g., Asaba, Nigeria"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          {errors.deliveryLocation && (
            <p className="text-red-500 text-xs mt-1">{errors.deliveryLocation.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Distance (km) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              {...register('distanceKm', {
                required: 'Distance is required',
                min: { value: 1, message: 'Distance must be at least 1 km' },
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              readOnly={!!initialDistance}
            />
            {errors.distanceKm && (
              <p className="text-red-500 text-xs mt-1">{errors.distanceKm.message}</p>
            )}
            {initialDistance && (
              <p className="text-green-500 text-xs mt-1">✓ Auto-calculated from addresses</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (kg) <span className="text-gray-400 text-xs">(default: 1kg)</span>
            </label>
            <input
              type="number"
              step="0.1"
              {...register('weight', {
                min: { value: 0, message: 'Weight cannot be negative' },
                valueAsNumber: true,
              })}
              placeholder="1"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume (m³) <span className="text-gray-400 text-xs">(default: 1m³)</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register('volume', {
                min: { value: 0, message: 'Volume cannot be negative' },
                valueAsNumber: true,
              })}
              placeholder="1"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.volume && <p className="text-red-500 text-xs mt-1">{errors.volume.message}</p>}
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
)

OrderForm.displayName = 'OrderForm'

export default OrderForm
