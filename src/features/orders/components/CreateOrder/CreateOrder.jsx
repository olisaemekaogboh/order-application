import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import OrderForm from '../OrderForm/OrderForm'
import PriceCalculator from '../PriceCalculator/PriceCalculator'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'
import { distanceService } from '@/shared/services/distanceService'
import { pricingService } from '@/shared/services/pricingService'
import { VEHICLE_TYPES } from '../../constants'
import { PaymentButton, PaymentGatewaySelector, PAYMENT_GATEWAYS } from '@/features/payments'

// Default values
const DEFAULT_WEIGHT = 1
const DEFAULT_VOLUME = 1

const CreateOrder = () => {
  const navigate = useNavigate()
  const { createOrder, loading } = useOrders()
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [distance, setDistance] = useState(null)
  const [isDistanceLoading, setIsDistanceLoading] = useState(false)
  const [vehicleOptions, setVehicleOptions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_TYPES.SEDAN)
  const [priceBreakdown, setPriceBreakdown] = useState(null)

  // Form field state for price sync - with default values
  const [formFields, setFormFields] = useState({
    weight: DEFAULT_WEIGHT,
    volume: DEFAULT_VOLUME,
    vehicleType: VEHICLE_TYPES.SEDAN,
    expressDelivery: false,
  })

  // Payment state
  const [showPayment, setShowPayment] = useState(false)
  const [createdOrder, setCreatedOrder] = useState(null)
  const [selectedGateway, setSelectedGateway] = useState(PAYMENT_GATEWAYS.FLUTTERWAVE)
  const [isOrderCreated, setIsOrderCreated] = useState(false)

  // Ref to access form methods
  const formRef = useRef(null)

  // Debounce timer ref
  const debounceTimerRef = useRef(null)

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const configs = await pricingService.getActivePricing()
        if (configs && configs.length > 0) {
          setVehicleOptions(configs)
          setSelectedVehicle(configs[0].vehicleType)
          setFormFields((prev) => ({
            ...prev,
            vehicleType: configs[0].vehicleType,
          }))
        } else {
          setVehicleOptions(
            Object.keys(VEHICLE_TYPES).map((key) => ({
              vehicleType: VEHICLE_TYPES[key],
            }))
          )
          setSelectedVehicle(VEHICLE_TYPES.SEDAN)
          setFormFields((prev) => ({
            ...prev,
            vehicleType: VEHICLE_TYPES.SEDAN,
          }))
        }
      } catch (err) {
        console.error('Failed to load pricing', err)
        setVehicleOptions(
          Object.keys(VEHICLE_TYPES).map((key) => ({
            vehicleType: VEHICLE_TYPES[key],
          }))
        )
        setSelectedVehicle(VEHICLE_TYPES.SEDAN)
        setFormFields((prev) => ({
          ...prev,
          vehicleType: VEHICLE_TYPES.SEDAN,
        }))
      }
    }
    fetchPricing()
  }, [])

  // Debounced address change handler
  const handleAddressChange = useCallback((pickup, delivery) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (pickup && delivery && pickup.length >= 3 && delivery.length >= 3) {
      setIsDistanceLoading(true)

      debounceTimerRef.current = setTimeout(() => {
        distanceService
          .calculateDistance(pickup, delivery)
          .then((dist) => {
            console.log('✅ Distance calculated:', dist)
            setDistance(dist)
            if (formRef.current && formRef.current.setValue) {
              formRef.current.setValue('distanceKm', dist)
            }
            setIsDistanceLoading(false)
          })
          .catch((error) => {
            console.error('❌ Failed to calculate distance:', error)
            toast.error('Failed to calculate distance')
            setIsDistanceLoading(false)
          })
      }, 800)
    } else {
      setDistance(null)
      if (formRef.current && formRef.current.setValue) {
        formRef.current.setValue('distanceKm', '')
      }
    }
  }, [])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Handle form field changes from OrderForm
  const handleFormChange = useCallback((fields) => {
    setFormFields((prev) => ({
      ...prev,
      ...fields,
    }))
  }, [])

  // Price calculation - syncs with form values
  useEffect(() => {
    const calculatePrice = async () => {
      if (distance && distance > 0) {
        try {
          // Use defaults if weight or volume are empty/zero
          const weight = formFields.weight || DEFAULT_WEIGHT
          const volume = formFields.volume || DEFAULT_VOLUME

          console.log('💰 Calculating price with:', {
            distanceKm: distance,
            vehicleType: formFields.vehicleType,
            weight: weight,
            volume: volume,
            expressDelivery: formFields.expressDelivery,
          })

          const price = await pricingService.calculatePrice({
            distanceKm: distance,
            vehicleType: formFields.vehicleType,
            weight: weight,
            volume: volume,
            expressDelivery: formFields.expressDelivery,
            nightDelivery: false,
          })

          console.log('💰 Price calculated:', price)
          setPriceBreakdown(price)
          setCalculatedPrice(price)
        } catch (err) {
          console.warn('Price calculation failed:', err)
          setPriceBreakdown(null)
          if (err.response?.status === 404) {
            toast.error('No pricing configuration found for this vehicle.')
          }
        }
      }
    }

    calculatePrice()
  }, [
    distance,
    formFields.vehicleType,
    formFields.weight,
    formFields.volume,
    formFields.expressDelivery,
  ])

  // Reset payment state when creating a new order
  const resetPaymentState = useCallback(() => {
    setShowPayment(false)
    setCreatedOrder(null)
    setIsOrderCreated(false)
  }, [])

  const handleSubmit = async (data) => {
    try {
      const finalDistance = distance || parseFloat(data.distanceKm) || 0

      if (finalDistance <= 0) {
        toast.error('Please calculate the distance first')
        return
      }

      const pickupDate = data.pickupDate
        ? new Date(data.pickupDate).toISOString()
        : new Date().toISOString()

      // Use defaults if weight or volume are empty/zero
      const weight = parseFloat(data.weight) || DEFAULT_WEIGHT
      const volume = parseFloat(data.volume) || DEFAULT_VOLUME

      const orderData = {
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        distanceKm: finalDistance,
        weight: weight,
        volume: volume,
        vehicleType: data.vehicleType || selectedVehicle,
        pickupDate: pickupDate,
        expressDelivery: data.expressDelivery === true || data.expressDelivery === 'true',
      }

      console.log('📦 Creating order with data:', orderData)

      const order = await createOrder(orderData)

      if (!order?.id) {
        throw new Error('Order ID not returned')
      }

      console.log('✅ Order created:', order)

      setCreatedOrder(order)
      setIsOrderCreated(true)
      setShowPayment(true)

      toast.success('Order created successfully! Please complete payment.')
    } catch (error) {
      console.error('Order creation failed:', error)
      const msg = error.response?.data?.message || 'Failed to create order'
      toast.error(msg)
    }
  }

  // Handle successful payment
  const handlePaymentSuccess = (paymentResult) => {
    console.log('✅ Payment successful:', paymentResult)
    toast.success('Payment completed! Redirecting to order tracking...')

    setTimeout(() => {
      navigate(`/client/order-tracking/${createdOrder?.id}`)
    }, 2000)
  }

  // Handle payment failure
  const handlePaymentFailure = (error) => {
    console.error('❌ Payment failed:', error)
    toast.error('Payment failed. Please try again or choose another payment method.')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm
            ref={formRef}
            onSubmit={handleSubmit}
            loading={loading || isOrderCreated}
            vehicleOptions={vehicleOptions}
            selectedVehicle={selectedVehicle}
            onVehicleChange={(vehicle) => {
              setSelectedVehicle(vehicle)
              setFormFields((prev) => ({ ...prev, vehicleType: vehicle }))
            }}
            onAddressChange={handleAddressChange}
            onFormChange={handleFormChange}
            initialDistance={distance}
            defaultWeight={DEFAULT_WEIGHT}
            defaultVolume={DEFAULT_VOLUME}
          />

          {/* Payment Section - Shows after order creation */}
          {showPayment && createdOrder && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Complete Payment
              </h3>

              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Order #: <span className="font-semibold">{createdOrder.orderNumber}</span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Amount:{' '}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ₦
                    {createdOrder.totalPrice?.toLocaleString() ||
                      priceBreakdown?.totalPrice?.toLocaleString() ||
                      0}
                  </span>
                </p>
              </div>

              {/* Gateway Selector */}
              <PaymentGatewaySelector
                selectedGateway={selectedGateway}
                onSelect={setSelectedGateway}
                showTestCards={true}
                className="mb-4"
              />

              {/* Payment Button */}
              <PaymentButton
                orderId={createdOrder.id}
                amount={createdOrder.totalPrice || priceBreakdown?.totalPrice || 0}
                gateway={selectedGateway}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
                className="w-full py-3 text-lg"
              />

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                You will be redirected to {selectedGateway} to complete your payment securely.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <PriceCalculator
            onPriceCalculated={setCalculatedPrice}
            initialDistance={distance}
            initialVehicle={selectedVehicle}
            initialWeight={formFields.weight || DEFAULT_WEIGHT}
            initialVolume={formFields.volume || DEFAULT_VOLUME}
            initialExpressDelivery={formFields.expressDelivery}
            vehicleOptions={vehicleOptions}
          />

          {isDistanceLoading && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Calculating distance...
            </div>
          )}

          {distance && !isDistanceLoading && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                📍 Distance: <span className="font-bold">{distance.toFixed(2)} km</span>
              </p>
            </div>
          )}

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
                    <p>Express Surcharge: ₦{priceBreakdown.expressSurcharge.toLocaleString()}</p>
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
