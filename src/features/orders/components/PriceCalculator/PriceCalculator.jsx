import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { pricingService } from '@/shared/services/pricingService'
import { VEHICLE_TYPES_LABELS, VEHICLE_TYPES } from '../../constants'
import toast from 'react-hot-toast'

const DEFAULT_WEIGHT = 1
const DEFAULT_VOLUME = 1

const PriceCalculator = React.memo(
  ({
    initialDistance,
    initialVehicle,
    initialWeight = DEFAULT_WEIGHT,
    initialVolume = DEFAULT_VOLUME,
    initialExpressDelivery = false,
    vehicleOptions = [],
  }) => {
    const [form, setForm] = useState({
      distanceKm: initialDistance || '',
      weight: initialWeight || DEFAULT_WEIGHT,
      volume: initialVolume || DEFAULT_VOLUME,
      vehicleType: initialVehicle || VEHICLE_TYPES.SEDAN,
      expressDelivery: initialExpressDelivery || false,
    })
    const [price, setPrice] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isCalculating, setIsCalculating] = useState(false)

    // Track previous values to prevent unnecessary updates
    const prevInitialDistanceRef = useRef(initialDistance)
    const prevInitialVehicleRef = useRef(initialVehicle)
    const prevInitialWeightRef = useRef(initialWeight)
    const prevInitialVolumeRef = useRef(initialVolume)
    const prevInitialExpressRef = useRef(initialExpressDelivery)

    // Update form when props change (sync with OrderForm)
    useEffect(() => {
      let shouldUpdate = false
      const updates = {}

      if (
        initialDistance !== prevInitialDistanceRef.current &&
        initialDistance !== form.distanceKm
      ) {
        updates.distanceKm = initialDistance || ''
        prevInitialDistanceRef.current = initialDistance
        shouldUpdate = true
      }

      if (initialVehicle !== prevInitialVehicleRef.current && initialVehicle !== form.vehicleType) {
        updates.vehicleType = initialVehicle || VEHICLE_TYPES.SEDAN
        prevInitialVehicleRef.current = initialVehicle
        shouldUpdate = true
      }

      if (initialWeight !== prevInitialWeightRef.current && initialWeight !== form.weight) {
        updates.weight = initialWeight || DEFAULT_WEIGHT
        prevInitialWeightRef.current = initialWeight
        shouldUpdate = true
      }

      if (initialVolume !== prevInitialVolumeRef.current && initialVolume !== form.volume) {
        updates.volume = initialVolume || DEFAULT_VOLUME
        prevInitialVolumeRef.current = initialVolume
        shouldUpdate = true
      }

      if (
        initialExpressDelivery !== prevInitialExpressRef.current &&
        initialExpressDelivery !== form.expressDelivery
      ) {
        updates.expressDelivery = initialExpressDelivery || false
        prevInitialExpressRef.current = initialExpressDelivery
        shouldUpdate = true
      }

      if (shouldUpdate) {
        setForm((prev) => ({ ...prev, ...updates }))
      }
    }, [
      initialDistance,
      initialVehicle,
      initialWeight,
      initialVolume,
      initialExpressDelivery,
      form,
    ])

    // Auto-calculate when form changes (with debounce)
    const debounceTimerRef = useRef(null)

    useEffect(() => {
      // Clear any pending debounce
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Don't auto-calculate if distance is empty or loading
      if (!form.distanceKm || isCalculating) {
        return
      }

      // Debounce the auto-calculation
      debounceTimerRef.current = setTimeout(() => {
        handleCalculate()
      }, 600)

      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.distanceKm, form.vehicleType, form.expressDelivery, form.weight, form.volume])

    const handleChange = useCallback((e) => {
      const { name, value, type, checked } = e.target
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }, [])

    const handleCalculate = useCallback(async () => {
      // Prevent multiple simultaneous calculations
      if (isCalculating) return

      if (!form.distanceKm) {
        toast.error('Please enter distance')
        return
      }

      setIsCalculating(true)
      setLoading(true)

      try {
        // Use defaults if weight or volume are empty/zero
        const weight = parseFloat(form.weight) || DEFAULT_WEIGHT
        const volume = parseFloat(form.volume) || DEFAULT_VOLUME

        const data = {
          distanceKm: parseFloat(form.distanceKm),
          weight: weight,
          volume: volume,
          vehicleType: form.vehicleType,
          expressDelivery: form.expressDelivery,
          nightDelivery: form.nightDelivery || false,
        }

        const result = await pricingService.calculatePrice(data)
        setPrice(result)
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
        setIsCalculating(false)
      }
    }, [form, isCalculating])

    // Memoize vehicle options to prevent re-renders
    const vehicleSelectOptions = useMemo(() => {
      if (vehicleOptions.length > 0) {
        return vehicleOptions.map((opt) => ({
          value: opt.vehicleType,
          label: VEHICLE_TYPES_LABELS[opt.vehicleType] || opt.vehicleType,
        }))
      }
      return Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({
        value,
        label,
      }))
    }, [vehicleOptions])

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Price Calculator
          {loading && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">(calculating...)</span>
          )}
        </h2>

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
              min="0"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter distance"
              readOnly={!!initialDistance}
            />
            {initialDistance && (
              <p className="text-green-500 text-xs mt-1">✓ Auto-synced from order form</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Weight (kg) <span className="text-gray-400 text-xs">(default: 1kg)</span>
              </label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Volume (m³) <span className="text-gray-400 text-xs">(default: 1m³)</span>
              </label>
              <input
                type="number"
                name="volume"
                value={form.volume}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="1"
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
              {vehicleSelectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
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
            disabled={loading || !form.distanceKm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Calculating...' : 'Calculate Price'}
          </button>

          {price && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-lg font-bold text-green-700 dark:text-green-300">
                Estimated Price: ₦{price.totalPrice?.toLocaleString() || 0}
              </p>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-0.5">
                <p>Base: ₦{price.basePrice?.toLocaleString() || 0}</p>
                {price.weightSurcharge > 0 && (
                  <p>Weight Surcharge: ₦{price.weightSurcharge.toLocaleString()}</p>
                )}
                {price.volumeSurcharge > 0 && (
                  <p>Volume Surcharge: ₦{price.volumeSurcharge.toLocaleString()}</p>
                )}
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
)

PriceCalculator.displayName = 'PriceCalculator'

export default PriceCalculator
