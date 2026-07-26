import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PricingConfigForm = ({ onSave, editingId, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (editingId) {
      // Fetch config details and reset form
      // For now, just reset to empty
      reset()
    }
  }, [editingId, reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await onSave(data)
      reset()
    } catch (error) {
      toast.error('Failed to save')
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
              Vehicle Type
            </label>
            <select
              {...register('vehicleType', { required: 'Vehicle type is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="MOTORCYCLE">Motorcycle</option>
              <option value="MINI_VAN">Mini Van</option>
              <option value="STANDARD">Standard</option>
              <option value="TRUCK">Truck</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Base Rate per Km (₦)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('baseRatePerKm', { required: true, min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Minimum Charge (₦)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('minimumCharge', { required: true, min: 0 })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
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
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
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
