import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PricingConfigForm = ({ onSave, editingId, onCancel, initialData = null }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currency: 'NGN',
      active: true,
      weightSurchargePerKg: 0,
      volumeSurchargePerCubicMeter: 0,
      expressSurcharge: 0,
      nightSurcharge: 0,
      maxDistanceKm: 0,
      maxWeightKg: 0,
      maxVolumeCubicMeters: 0,
    },
  })

  // Populate form when editing
  useEffect(() => {
    if (editingId && initialData) {
      setValue('vehicleType', initialData.vehicleType || '')
      setValue('baseRatePerKm', initialData.baseRatePerKm || '')
      setValue('minimumCharge', initialData.minimumCharge || '')
      setValue('weightSurchargePerKg', initialData.weightSurchargePerKg || 0)
      setValue('volumeSurchargePerCubicMeter', initialData.volumeSurchargePerCubicMeter || 0)
      setValue('expressSurcharge', initialData.expressSurcharge || 0)
      setValue('nightSurcharge', initialData.nightSurcharge || 0)
      setValue('currency', initialData.currency || 'NGN')
      setValue('active', initialData.active !== undefined ? initialData.active : true)
      setValue('maxDistanceKm', initialData.maxDistanceKm || 0)
      setValue('maxWeightKg', initialData.maxWeightKg || 0)
      setValue('maxVolumeCubicMeters', initialData.maxVolumeCubicMeters || 0)
      setValue('description', initialData.description || '')
    } else if (!editingId) {
      reset({
        currency: 'NGN',
        active: true,
        weightSurchargePerKg: 0,
        volumeSurchargePerCubicMeter: 0,
        expressSurcharge: 0,
        nightSurcharge: 0,
        maxDistanceKm: 0,
        maxWeightKg: 0,
        maxVolumeCubicMeters: 0,
      })
    }
  }, [editingId, initialData, setValue, reset])

  const onSubmit = async (data) => {
    if (!onSave) {
      toast.error('Save function not provided')
      return
    }

    setLoading(true)
    try {
      const formattedData = {
        vehicleType: data.vehicleType,
        baseRatePerKm: parseFloat(data.baseRatePerKm) || 0,
        minimumCharge: parseFloat(data.minimumCharge) || 0,
        weightSurchargePerKg: data.weightSurchargePerKg ? parseFloat(data.weightSurchargePerKg) : 0,
        volumeSurchargePerCubicMeter: data.volumeSurchargePerCubicMeter
          ? parseFloat(data.volumeSurchargePerCubicMeter)
          : 0,
        expressSurcharge: data.expressSurcharge ? parseFloat(data.expressSurcharge) : 0,
        nightSurcharge: data.nightSurcharge ? parseFloat(data.nightSurcharge) : 0,
        currency: data.currency || 'NGN',
        active: data.active !== undefined ? data.active : true,
        maxDistanceKm: data.maxDistanceKm ? parseFloat(data.maxDistanceKm) : 0,
        maxWeightKg: data.maxWeightKg ? parseFloat(data.maxWeightKg) : 0,
        maxVolumeCubicMeters: data.maxVolumeCubicMeters ? parseFloat(data.maxVolumeCubicMeters) : 0,
        description: data.description || '',
      }

      console.log('Sending data to backend:', JSON.stringify(formattedData, null, 2))

      await onSave(formattedData)

      if (!editingId) {
        reset({
          currency: 'NGN',
          active: true,
          weightSurchargePerKg: 0,
          volumeSurchargePerCubicMeter: 0,
          expressSurcharge: 0,
          nightSurcharge: 0,
          maxDistanceKm: 0,
          maxWeightKg: 0,
          maxVolumeCubicMeters: 0,
        })
      }
    } catch (error) {
      console.error('Save error:', error)
      console.error('Error response:', error.response?.data)

      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || 'Failed to save'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {editingId ? 'Edit Pricing Configuration' : 'New Pricing Configuration'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Vehicle Type *
            </label>
            <select
              {...register('vehicleType', { required: 'Vehicle type is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="MOTORCYCLE">Motorcycle</option>
              <option value="VAN">Van</option>
              <option value="SUV">SUV</option>
              <option value="SEDAN">Sedan</option>
              <option value="PICKUP">Pickup</option>
              <option value="MINI_TRUCK">Mini Truck</option>
              <option value="TRUCK">Truck</option>
              <option value="TRAILER">Trailer</option>
              <option value="TANKER">Tanker</option>
              <option value="TRICYCLE">Tricycle</option>
              <option value="REFRIGERATED_TRUCK">Refrigerated Truck</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Base Rate per Km (₦) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register('baseRatePerKm', {
                required: 'Base rate is required',
                min: { value: 0.01, message: 'Must be greater than 0' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.baseRatePerKm && (
              <p className="text-red-500 text-xs mt-1">{errors.baseRatePerKm.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum Charge (₦) *
            </label>
            <input
              type="number"
              step="0.01"
              {...register('minimumCharge', {
                required: 'Minimum charge is required',
                min: { value: 0.01, message: 'Must be greater than 0' },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.minimumCharge && (
              <p className="text-red-500 text-xs mt-1">{errors.minimumCharge.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Currency
            </label>
            <select
              {...register('currency')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight Surcharge per Kg
            </label>
            <input
              type="number"
              step="0.01"
              {...register('weightSurchargePerKg')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume Surcharge per m³
            </label>
            <input
              type="number"
              step="0.01"
              {...register('volumeSurchargePerCubicMeter')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Express Surcharge
            </label>
            <input
              type="number"
              step="0.01"
              {...register('expressSurcharge')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Night Surcharge
            </label>
            <input
              type="number"
              step="0.01"
              {...register('nightSurcharge')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Distance (km)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('maxDistanceKm')}
              placeholder="0 for unlimited"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Weight (kg)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('maxWeightKg')}
              placeholder="0 for unlimited"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Volume (m³)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('maxVolumeCubicMeters')}
              placeholder="0 for unlimited"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              rows="2"
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              {...register('active')}
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            Active
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                reset()
                onCancel()
              }}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-md font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default PricingConfigForm
