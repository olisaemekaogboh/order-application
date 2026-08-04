// features/payments/components/PaymentGatewaySelector/PaymentGatewaySelector.jsx
import React, { useState } from 'react'
import {
  PAYMENT_GATEWAYS,
  PAYMENT_GATEWAYS_LABELS,
  PAYMENT_GATEWAYS_ICONS,
  PAYMENT_GATEWAYS_COLORS,
  PAYMENT_GATEWAYS_LOGOS,
  TEST_CARDS,
} from '../../constants'

const PaymentGatewaySelector = ({
  selectedGateway = PAYMENT_GATEWAYS.FLUTTERWAVE,
  onSelect,
  className = '',
  showTestCards = false,
}) => {
  const [showTestInfo, setShowTestInfo] = useState(false)

  const gateways = [
    {
      id: PAYMENT_GATEWAYS.FLUTTERWAVE,
      label: PAYMENT_GATEWAYS_LABELS[PAYMENT_GATEWAYS.FLUTTERWAVE],
      icon: PAYMENT_GATEWAYS_ICONS[PAYMENT_GATEWAYS.FLUTTERWAVE],
      color: PAYMENT_GATEWAYS_COLORS[PAYMENT_GATEWAYS.FLUTTERWAVE],
      description: 'Pay with Flutterwave - Cards, Bank Transfer, USSD',
      logo: PAYMENT_GATEWAYS_LOGOS[PAYMENT_GATEWAYS.FLUTTERWAVE],
    },
    {
      id: PAYMENT_GATEWAYS.PAYSTACK,
      label: PAYMENT_GATEWAYS_LABELS[PAYMENT_GATEWAYS.PAYSTACK],
      icon: PAYMENT_GATEWAYS_ICONS[PAYMENT_GATEWAYS.PAYSTACK],
      color: PAYMENT_GATEWAYS_COLORS[PAYMENT_GATEWAYS.PAYSTACK],
      description: 'Pay with Paystack - Cards, Bank Transfer, QR Code',
      logo: PAYMENT_GATEWAYS_LOGOS[PAYMENT_GATEWAYS.PAYSTACK],
    },
    {
      id: PAYMENT_GATEWAYS.MOCK,
      label: PAYMENT_GATEWAYS_LABELS[PAYMENT_GATEWAYS.MOCK],
      icon: PAYMENT_GATEWAYS_ICONS[PAYMENT_GATEWAYS.MOCK],
      color: PAYMENT_GATEWAYS_COLORS[PAYMENT_GATEWAYS.MOCK],
      description: 'Test Mode - No real payment processed',
    },
  ]

  // Get test card details for selected gateway
  const getTestCardDetails = () => {
    if (selectedGateway === PAYMENT_GATEWAYS.FLUTTERWAVE) {
      return TEST_CARDS.FLUTTERWAVE
    } else if (selectedGateway === PAYMENT_GATEWAYS.PAYSTACK) {
      return TEST_CARDS.PAYSTACK
    }
    return null
  }

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Payment Method
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {gateways.map((gateway) => (
          <div
            key={gateway.id}
            onClick={() => onSelect(gateway.id)}
            className={`
              cursor-pointer rounded-lg border-2 p-4 transition-all
              ${
                selectedGateway === gateway.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{gateway.icon}</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{gateway.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {gateway.description}
                </div>
              </div>
            </div>
            {selectedGateway === gateway.id && (
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                ✓ Selected
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Test Cards Info */}
      {showTestCards && (
        <div className="mt-4">
          <button
            onClick={() => setShowTestInfo(!showTestInfo)}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
          >
            <span className="mr-1">{showTestInfo ? '▼' : '▶'}</span>
            {showTestInfo ? 'Hide Test Cards' : 'Show Test Cards'}
          </button>

          {showTestInfo && (
            <div className="mt-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                🧪 Test Payment Details
              </h4>

              {getTestCardDetails() && (
                <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-medium">Card:</span> {getTestCardDetails().cardNumber}
                  </div>
                  <div>
                    <span className="font-medium">Expiry:</span> {getTestCardDetails().expiry}
                  </div>
                  <div>
                    <span className="font-medium">CVV:</span> {getTestCardDetails().cvv}
                  </div>
                  <div>
                    <span className="font-medium">PIN:</span> {getTestCardDetails().pin}
                  </div>
                  <div>
                    <span className="font-medium">OTP:</span> {getTestCardDetails().otp}
                  </div>
                </div>
              )}

              {selectedGateway === PAYMENT_GATEWAYS.MOCK && (
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <p>
                    Mock mode - no real payment will be processed. Click "Pay" to simulate a
                    successful payment.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentGatewaySelector
