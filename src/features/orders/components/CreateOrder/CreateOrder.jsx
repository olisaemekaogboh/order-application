import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../../orders/hooks/useOrders'
import OrderForm from '../../../orders/components/OrderForm/OrderForm'
import PriceCalculator from '../../../orders/components/PriceCalculator/PriceCalculator'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

const CreateOrder = () => {
  const navigate = useNavigate()
  const { createOrder, loading } = useOrders()
  const [calculatedPrice, setCalculatedPrice] = useState(null)

  const handleSubmit = async (data) => {
    try {
      const order = await createOrder({
        ...data,
        distanceKm: parseFloat(data.distanceKm),
        weight: parseFloat(data.weight) || 0,
        volume: parseFloat(data.volume) || 0,
        expressDelivery: data.expressDelivery === 'true',
        pickupDate: new Date(data.pickupDate).toISOString(),
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
          <OrderForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <PriceCalculator onPriceCalculated={setCalculatedPrice} />
          {calculatedPrice && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Estimated Price</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₦{calculatedPrice.totalPrice?.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateOrder
