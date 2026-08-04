// features/payments/pages/PaymentCallback/PaymentCallback.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePayments } from '../../hooks/usePayments'
import { PAYMENT_GATEWAYS } from '../../constants'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import toast from 'react-hot-toast'

const PaymentCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { verifyPayment, loading } = usePayments()
  const [status, setStatus] = useState('verifying')
  const [error, setError] = useState(null)
  const [paymentDetails, setPaymentDetails] = useState(null)

  useEffect(() => {
    const verify = async () => {
      // Get stored gateway
      const storedGateway = sessionStorage.getItem('pendingGateway') || PAYMENT_GATEWAYS.FLUTTERWAVE

      // Get references from URL params
      // Flutterwave uses: tx_ref, transaction_id, status
      // Paystack uses: trxref, reference
      const txRef = searchParams.get('tx_ref')
      const trxRef = searchParams.get('trxref') // Paystack's parameter
      const reference = searchParams.get('reference')
      const transactionId = searchParams.get('transaction_id')
      const statusParam = searchParams.get('status')

      // Determine which gateway and get the reference
      let transactionRef = null
      let gatewayRef = null

      if (storedGateway === PAYMENT_GATEWAYS.FLUTTERWAVE) {
        // Flutterwave uses tx_ref
        transactionRef = txRef || sessionStorage.getItem('pendingPaymentRef')
        gatewayRef = transactionId || transactionRef
      } else if (storedGateway === PAYMENT_GATEWAYS.PAYSTACK) {
        // Paystack uses trxref or reference
        transactionRef = trxRef || reference || sessionStorage.getItem('pendingPaymentRef')
        gatewayRef = reference || trxRef || transactionRef
      } else {
        transactionRef = sessionStorage.getItem('pendingPaymentRef')
        gatewayRef = reference || transactionId || transactionRef
      }

      // Check if payment was cancelled
      if (statusParam === 'cancelled') {
        setStatus('cancelled')
        setError('Payment was cancelled')
        toast.error('Payment was cancelled')
        return
      }

      if (!transactionRef) {
        setStatus('error')
        setError('Missing payment reference')
        return
      }

      try {
        // Verify with the backend
        const result = await verifyPayment(transactionRef, gatewayRef || transactionRef)

        if (result.successful) {
          setStatus('success')
          setPaymentDetails(result)
          toast.success('Payment verified! Redirecting...')

          // Clear stored data
          sessionStorage.removeItem('pendingPaymentRef')
          sessionStorage.removeItem('pendingGateway')

          setTimeout(() => {
            // Redirect to order tracking with the order ID
            const orderId = result.orderId
            if (orderId) {
              navigate(`/client/order-tracking/${orderId}`)
            } else {
              navigate('/client/orders')
            }
          }, 3000)
        } else {
          setStatus('failed')
          setError(result.message || 'Payment verification failed')
          toast.error(result.message || 'Payment verification failed')
        }
      } catch (err) {
        console.error('Payment verification error:', err)
        setStatus('error')
        const message = err.response?.data?.message || 'Failed to verify payment'
        setError(message)
        toast.error(message)
      }
    }

    // Wait a moment for the page to load
    const timer = setTimeout(verify, 500)
    return () => clearTimeout(timer)
  }, [searchParams, navigate, verifyPayment])

  // ===== Loading State =====
  if (loading || status === 'verifying') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying your payment...</p>
      </div>
    )
  }

  // ===== Success State =====
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 mb-4">
          <svg
            className="w-12 h-12 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your payment has been confirmed.</p>
        {paymentDetails && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Reference: <span className="font-mono">{paymentDetails.transactionReference}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Amount: <span className="font-semibold">₦{paymentDetails.amount}</span>
            </p>
          </div>
        )}
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
          Redirecting to order tracking...
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate('/client/orders')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // ===== Failed / Error / Cancelled State =====
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div
        className={`rounded-full p-4 mb-4 ${
          status === 'cancelled'
            ? 'bg-yellow-100 dark:bg-yellow-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}
      >
        {status === 'cancelled' ? (
          <svg
            className="w-12 h-12 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {status === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
        {error || 'Unable to verify your payment. Please try again.'}
      </p>
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={() => navigate('/client/orders')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => (window.location.href = '/contact')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default PaymentCallback
