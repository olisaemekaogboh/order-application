import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import OrderForm from '../OrderForm/OrderForm'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'
import { distanceService } from '@/shared/services/distanceService'
import { pricingService } from '@/shared/services/pricingService'
import { VEHICLE_TYPES } from '../../constants'

const CreateOrder = () => {
  const navigate = useNavigate()
  const { createOrder, loading } = useOrders()
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isDistanceLoading, setIsDistanceLoading] = useState(false)
  const [vehicleOptions, setVehicleOptions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES.SEDAN)
  const [priceBreakdown, setPriceBreakdown] = useState(null)

  // Fetch active pricing on mount
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const configs = await pricingService.getActivePricing()
        if (configs && configs.length > 0) {
          setVehicleOptions(configs)
          setSelectedVehicle(configs[0].vehicleType)
        } else {
          // Fallback to all enum values
          setVehicleOptions(
            Object.keys(VEHICLE_TYPES).map((key) => ({
              vehicleType: VEHICLE_TYPES[key],
            }))
          )
          setSelectedVehicle(VEHICLE_TYPES.SEDAN)
        }
      } catch (err) {
        console.error('Failed to load pricing', err)
        // Fallback to all enum values
        setVehicleOptions(
          Object.keys(VEHICLE_TYPES).map((key) => ({
            vehicleType: VEHICLE_TYPES[key],
          }))
        )
        setSelectedVehicle(VEHICLE_TYPES.SEDAN)
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
        .then((dist) => setDistance(dist))
        .catch(() => toast.error('Failed to calculate distance'))
        .finally(() => setIsDistanceLoading(false))
    }
  }

  // Recalculate price when distance or vehicle changes
  useEffect(() => {
    if (distance && selectedVehicle) {
      pricingService
        .calculatePrice({
          distanceKm: distance,
          vehicleType: selectedVehicle,
        })
        .then((price) => setPriceBreakdown(price))
        .catch((err) => {
          console.warn('Price calculation failed:', err)
          setPriceBreakdown(null)
          // Show a gentle warning but don't block user
          if (err.response?.status === 404) {
            toast.error('No pricing configuration found for this vehicle. Please contact admin.')
          }
        })
    }
  }, [distance, selectedVehicle])

  const handleSubmit = async (data) => {
    try {
      const pickupDate = data.pickupDate
        ? new Date(data.pickupDate).toISOString()
        : new Date().toISOString()

      const orderData = {
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        distanceKm: distance || parseFloat(data.distanceKm) || 0,
        weight: parseFloat(data.weight) || 0,
        volume: parseFloat(data.volume) || 0,
        vehicleType: data.vehicleType || selectedVehicle,
        pickupDate,
        expressDelivery: data.expressDelivery === true || data.expressDelivery === 'true',
      }

      const order = await createOrder(orderData)
      if (order && order.id) {
        navigate(`/client/order-tracking/${order.id}`)
      } else {
        // This should not happen if createOrder throws on error
        toast.error('Order created but no ID returned')
      }
    } catch (error) {
      console.error('Order creation failed:', error)
      const msg = error.response?.data?.message || 'Failed to create order'
      toast.error(msg)
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
            vehicleOptions={vehicleOptions}
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
