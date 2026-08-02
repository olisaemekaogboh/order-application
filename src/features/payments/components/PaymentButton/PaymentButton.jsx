// features/payments/components/PaymentButton/PaymentButton.jsx
import React, { useState } from 'react'
import { usePayments } from '../../hooks/usePayments'
import Button from '@/shared/components/ui/Button/Button'
import toast from 'react-hot-toast'

const PaymentButton = ({ orderId, amount, onSuccess, onFailure }) => {
  const [loading, setLoading] = useState(false)
  const { initializePayment, verifyPayment } = usePayments()

  const handlePayment = async () => {
    setLoading(true)
    try {
      // 1. Initialize payment
      const initResult = await initializePayment({
        orderId: orderId,
        amount: amount,
        paymentMethod: 'PAYSTACK',
        currency: 'NGN',
      })

      // 2. Redirect to payment gateway or handle payment
      if (initResult.authorizationUrl) {
        // Redirect to payment page
        window.location.href = initResult.authorizationUrl
      } else if (initResult.accessCode) {
        // Handle Paystack inline
        // You would integrate Paystack inline here
        toast.info('Redirecting to payment...')
      }

      // 3. After payment, verify
      // This would be handled by the callback/webhook
      if (onSuccess) onSuccess(initResult)
    } catch (error) {
      console.error('Payment failed:', error)
      toast.error(error.response?.data?.message || 'Payment failed')
      if (onFailure) onFailure(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </Button>
  )
}

export default PaymentButton
