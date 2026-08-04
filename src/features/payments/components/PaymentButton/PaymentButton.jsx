// features/payments/components/PaymentButton/PaymentButton.jsx
import React, { useState } from 'react'
import { usePayments } from '../../hooks/usePayments'
import Button from '@/shared/components/ui/Button/Button'
import { PAYMENT_GATEWAYS, PAYMENT_GATEWAYS_LABELS, PAYMENT_GATEWAYS_COLORS } from '../../constants'
import toast from 'react-hot-toast'

const PaymentButton = ({
  orderId,
  amount,
  gateway = PAYMENT_GATEWAYS.FLUTTERWAVE,
  onSuccess,
  onFailure,
  className = '',
  children,
}) => {
  const [loading, setLoading] = useState(false)
  const { initializePayment } = usePayments()

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Determine callback URL based on gateway
      const callbackUrl = `${window.location.origin}/payment/callback`

      // Initialize payment with selected gateway
      const initResult = await initializePayment({
        orderId: orderId,
        amount: amount,
        gateway: gateway,
        currency: 'NGN',
        callbackUrl: callbackUrl,
        metadata: {
          orderNumber: orderId,
          gateway: gateway,
          timestamp: new Date().toISOString(),
        },
      })

      // Redirect to payment gateway
      if (initResult.authorizationUrl) {
        // Store transaction reference for verification after callback
        sessionStorage.setItem('pendingPaymentRef', initResult.transactionReference)
        sessionStorage.setItem('pendingGateway', gateway)
        // Redirect to payment gateway
        window.location.href = initResult.authorizationUrl
      } else {
        toast.error('No payment link received from gateway')
      }

      if (onSuccess) onSuccess(initResult)
    } catch (error) {
      console.error('Payment failed:', error)
      const message = error.response?.data?.message || 'Payment failed. Please try again.'
      toast.error(message)
      if (onFailure) onFailure(error)
    } finally {
      setLoading(false)
    }
  }

  const getGatewayLabel = () => {
    return PAYMENT_GATEWAYS_LABELS[gateway] || gateway
  }

  const getButtonColor = () => {
    return PAYMENT_GATEWAYS_COLORS[gateway] || 'bg-blue-600 hover:bg-blue-700'
  }

  // Payment method icons
  const getGatewayIcon = () => {
    const icons = {
      [PAYMENT_GATEWAYS.PAYSTACK]: '🔷',
      [PAYMENT_GATEWAYS.FLUTTERWAVE]: '🟣',
      [PAYMENT_GATEWAYS.MOCK]: '🧪',
    }
    return icons[gateway] || '💳'
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={`${getButtonColor()} text-white ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <span className="mr-2">{getGatewayIcon()}</span>
          {children || `Pay with ${getGatewayLabel()}`}
        </span>
      )}
    </Button>
  )
}

export default PaymentButton
