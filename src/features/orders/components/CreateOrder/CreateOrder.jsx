import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import OrderForm from '../../../orders/components/OrderForm/OrderForm'
import PriceCalculator from '../../../orders/components/PriceCalculator/PriceCalculator'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'
import { distanceService } from '@/shared/services/distanceService'
import { pricingService } from '@/shared/services/pricingService'
import { VEHICLE_TYPES_LABELS } from '../../../orders/constants'

const CreateOrder = () => {
  const navigate = useNavigate()
  const { createOrder, loading } = useOrders()
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isDistanceLoading, setIsDistanceLoading] = useState(false)
  const [vehicleOptions, setVehicleOptions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [priceBreakdown, setPriceBreakdown] = useState(null)

  // Fetch active pricing on mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const configs = await pricingService.getActivePricing()
        // configs is array of { vehicleType, basePrice, ... }
        setVehicleOptions(configs)
        if (configs.length > 0) {
          setSelectedVehicle(configs[0].vehicleType)
        }
      } catch (err) {
        console.error('Failed to load pricing', err)
      }
    }
    fetchPricing()
  }, [])

  const handleAddressBlur = async (field, value) => {
    if (value && value.length > 3) {
      try {
        const isValid = await distanceService.validateAddress(value)
        if (!isValid) {
          toast.error(`Invalid ${field} address. Please check and try again.`)
        }
      } catch (err) {
        console.error('Address validation failed', err)
      }
    }
  }

  const handleAddressChange = (pickup, delivery) => {
    if (pickup && delivery) {
      setIsDistanceLoading(true)
      distanceService
        .calculateDistance(pickup, delivery)
        .then((dist) => {
          setDistance(dist)
          // Optionally auto-update the form's distance field
        })
        .catch(() => toast.error('Failed to calculate distance'))
        .finally(() => setIsDistanceLoading(false))
    }
  }

  // When distance or vehicle changes, recalc price
  useEffect(() => {
    if (distance && selectedVehicle) {
      pricingService
        .calculatePrice({
          distanceKm: distance,
          vehicleType: selectedVehicle,
          // weight, volume, expressDelivery from form state
        })
        .then((price) => setPriceBreakdown(price))
        .catch(() => toast.error('Price calculation failed'))
    }
  }, [distance, selectedVehicle])

  const handleSubmit = async (data) => {
    try {
      const order = await createOrder({
        ...data,
        distanceKm: distance || parseFloat(data.distanceKm) || 0,
        weight: parseFloat(data.weight) || 0,
        volume: parseFloat(data.volume) || 0,
        expressDelivery: data.expressDelivery === 'true',
        pickupDate: new Date(data.pickupDate).toISOString(),
        vehicleType: selectedVehicle,
      })
      navigate(`/client/order-tracking/${order.id}`)
    } catch (error) {
      // error handled in hook
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm
            onSubmit={handleSubmit}
            loading={loading}
            onAddressChange={handleAddressChange}
            onAddressBlur={handleAddressBlur}
            distance={distance}
            isDistanceLoading={isDistanceLoading}
            vehicleOptions={vehicleOptions}
            selectedVehicle={selectedVehicle}
            onVehicleChange={setSelectedVehicle}
          />
        </div>
        <div className="lg:col-span-1">
          <PriceCalculator
            onPriceCalculated={setCalculatedPrice}
            initialDistance={distance}
            initialVehicle={selectedVehicle}
          />
          {priceBreakdown && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Estimated Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₦{priceBreakdown.totalPrice?.toLocaleString()}
                </p>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Base: ₦{priceBreakdown.basePrice?.toLocaleString()}</p>
                  {priceBreakdown.weightSurcharge > 0 && (
                    <p>Weight Surcharge: ₦{priceBreakdown.weightSurcharge.toLocaleString()}</p>
                  )}
                  {priceBreakdown.volumeSurcharge > 0 && (
                    <p>Volume Surcharge: ₦{priceBreakdown.volumeSurcharge.toLocaleString()}</p>
                  )}
                  {priceBreakdown.expressSurcharge > 0 && (
                    <p>Express: ₦{priceBreakdown.expressSurcharge.toLocaleString()}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateOrder
