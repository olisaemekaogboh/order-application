import React, { useState, useEffect } from 'react'
import { pricingService } from '@/shared/services/pricingService'
import { VEHICLE_TYPES_LABELS, VEHICLE_TYPES } from '../../constants'
import toast from 'react-hot-toast'

const PriceCalculator = ({ initialDistance, initialVehicle, vehicleOptions = [] }) => {
  const [form, setForm] = useState({
    distanceKm: initialDistance || '',
    weight: '',
    volume: '',
    vehicleType: initialVehicle || VEHICLE_TYPES.SEDAN,
    expressDelivery: false,
  })
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      distanceKm: initialDistance || prev.distanceKm,
      vehicleType: initialVehicle || prev.vehicleType,
    }))
  }, [initialDistance, initialVehicle])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCalculate = async () => {
    if (!form.distanceKm) {
      toast.error('Please enter distance')
      return
    }
    setLoading(true)
    try {
      const data = {
        distanceKm: parseFloat(form.distanceKm),
        weight: parseFloat(form.weight) || 0,
        volume: parseFloat(form.volume) || 0,
        vehicleType: form.vehicleType,
        expressDelivery: form.expressDelivery,
      }
      const result = await pricingService.calculatePrice(data)
      setPrice(result)
      toast.success('Price calculated')
    } catch (error) {
      console.error('Price calculation error:', error)
      let msg = 'Failed to calculate price'
      if (error.response?.status === 404) {
        msg = 'No active pricing configuration found for this vehicle. Please contact admin.'
      } else if (error.response?.data?.message) {
        msg = error.response.data.message
      }
      toast.error(msg)
      setPrice(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Price Calculator</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Distance (km)
          </label>
          <input
            type="number"
            name="distanceKm"
            value={form.distanceKm}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Volume (m³)
            </label>
            <input
              type="number"
              name="volume"
              value={form.volume}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
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
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="expressDelivery"
            checked={form.expressDelivery}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Express Delivery
          </label>
        </div>
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 transition-colors"
        >
          {loading ? 'Calculating...' : 'Calculate Price'}
        </button>
        {price && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-bold text-green-700 dark:text-green-300">
              Estimated Price: ₦{price.totalPrice.toLocaleString()}
            </p>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Base: ₦{price.basePrice.toLocaleString()}</p>
              <p>Weight Surcharge: ₦{price.weightSurcharge.toLocaleString()}</p>
              <p>Volume Surcharge: ₦{price.volumeSurcharge.toLocaleString()}</p>
              {price.expressSurcharge > 0 && (
                <p>Express Surcharge: ₦{price.expressSurcharge.toLocaleString()}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PriceCalculator
