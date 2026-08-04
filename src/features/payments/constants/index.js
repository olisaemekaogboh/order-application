// features/payments/constants/index.js
/**
 * Payments Constants
 * All payment-related constants in one place
 */

// ===== Payment Statuses =====
export const PAYMENT_STATUSES = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
}

export const PAYMENT_STATUSES_LABELS = {
  [PAYMENT_STATUSES.PENDING]: 'Pending',
  [PAYMENT_STATUSES.PROCESSING]: 'Processing',
  [PAYMENT_STATUSES.PAID]: 'Paid',
  [PAYMENT_STATUSES.FAILED]: 'Failed',
  [PAYMENT_STATUSES.REFUNDED]: 'Refunded',
  [PAYMENT_STATUSES.CANCELLED]: 'Cancelled',
  [PAYMENT_STATUSES.PARTIALLY_REFUNDED]: 'Partially Refunded',
}

export const PAYMENT_STATUSES_COLORS = {
  [PAYMENT_STATUSES.PENDING]:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [PAYMENT_STATUSES.PROCESSING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [PAYMENT_STATUSES.PAID]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [PAYMENT_STATUSES.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [PAYMENT_STATUSES.REFUNDED]:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [PAYMENT_STATUSES.CANCELLED]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [PAYMENT_STATUSES.PARTIALLY_REFUNDED]:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
}

// ===== Payment Methods =====
export const PAYMENT_METHODS = {
  CASH: 'CASH',
  CARD: 'CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  PAYSTACK: 'PAYSTACK',
  FLUTTERWAVE: 'FLUTTERWAVE',
  WALLET: 'WALLET',
}

export const PAYMENT_METHODS_LABELS = {
  [PAYMENT_METHODS.CASH]: 'Cash',
  [PAYMENT_METHODS.CARD]: 'Card',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_METHODS.PAYSTACK]: 'Paystack',
  [PAYMENT_METHODS.FLUTTERWAVE]: 'Flutterwave',
  [PAYMENT_METHODS.WALLET]: 'Wallet',
}

export const PAYMENT_METHODS_ICONS = {
  [PAYMENT_METHODS.CASH]: '💵',
  [PAYMENT_METHODS.CARD]: '💳',
  [PAYMENT_METHODS.BANK_TRANSFER]: '🏦',
  [PAYMENT_METHODS.PAYSTACK]: '🔷',
  [PAYMENT_METHODS.FLUTTERWAVE]: '🟣',
  [PAYMENT_METHODS.WALLET]: '👛',
}

// ===== Payment Gateways =====
export const PAYMENT_GATEWAYS = {
  PAYSTACK: 'PAYSTACK',
  FLUTTERWAVE: 'FLUTTERWAVE',
  MOCK: 'MOCK',
}

export const PAYMENT_GATEWAYS_LABELS = {
  [PAYMENT_GATEWAYS.PAYSTACK]: 'Paystack',
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: 'Flutterwave',
  [PAYMENT_GATEWAYS.MOCK]: 'Mock Payment (Testing)',
}

export const PAYMENT_GATEWAYS_COLORS = {
  [PAYMENT_GATEWAYS.PAYSTACK]: 'bg-blue-600 hover:bg-blue-700',
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: 'bg-purple-600 hover:bg-purple-700',
  [PAYMENT_GATEWAYS.MOCK]: 'bg-gray-500 hover:bg-gray-600',
}

export const PAYMENT_GATEWAYS_ICONS = {
  [PAYMENT_GATEWAYS.PAYSTACK]: '🔷',
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: '🟣',
  [PAYMENT_GATEWAYS.MOCK]: '🧪',
}

export const PAYMENT_GATEWAYS_LOGOS = {
  [PAYMENT_GATEWAYS.PAYSTACK]: 'https://paystack.com/assets/images/logo.svg',
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: 'https://flutterwave.com/assets/images/logo.svg',
}

// ===== Test Cards (Updated with correct cards) =====
export const TEST_CARDS = {
  PAYSTACK: {
    cardNumber: '4084 0808 0408 0808', // ✅ Paystack Visa test card
    expiry: '09/32',
    cvv: '408',
    pin: '1234',
    otp: '12345',
    description: 'Visa Test Card (Paystack)',
  },
  FLUTTERWAVE: {
    cardNumber: '5531 8866 5214 2950', // ✅ Flutterwave Mastercard test card
    expiry: '09/32',
    cvv: '564',
    pin: '3310',
    otp: '12345',
    description: 'Mastercard Test Card (Flutterwave)',
  },
  MOCK: {
    cardNumber: '0000 0000 0000 0000',
    expiry: 'MM/YY',
    cvv: '000',
    pin: '0000',
    otp: '00000',
    description: 'Mock Payment - No card needed',
  },
}

// ===== Payment Error Messages =====
export const PAYMENT_ERRORS = {
  NOT_FOUND: 'Payment not found',
  PROCESSING_FAILED: 'Payment processing failed',
  INVALID_AMOUNT: 'Invalid payment amount',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  INVALID_METHOD: 'Invalid payment method',
  REFUND_FAILED: 'Refund failed',
  REFUND_NOT_ALLOWED: 'Refund not allowed for this payment',
  ALREADY_REFUNDED: 'Payment already refunded',
  GATEWAY_ERROR: 'Payment gateway error',
  VERIFICATION_FAILED: 'Payment verification failed',
  EXPIRED: 'Payment session expired',
  CANCELLED: 'Payment was cancelled',
  DUPLICATE: 'Duplicate payment detected',
}

// ===== Payment Success Messages =====
export const PAYMENT_SUCCESS = {
  PROCESSED: 'Payment processed successfully',
  VERIFIED: 'Payment verified successfully',
  REFUNDED: 'Payment refunded successfully',
  CANCELLED: 'Payment cancelled successfully',
}

// ===== Payment API Endpoints =====
export const PAYMENT_API = {
  BASE: '/payments',
  INITIALIZE: '/payments/initialize',
  VERIFY: '/payments/verify',
  REFUND: '/payments/refund',
  CANCEL: '/payments/cancel',
  GET_BY_ORDER: '/payments/order/{orderId}',
  GET_BY_REFERENCE: '/payments/{reference}',
  GET_BY_GATEWAY_REFERENCE: '/payments/reference/{gatewayReference}',
  GET_USER_PAYMENTS: '/payments/user',
  GET_ALL_PAYMENTS: '/payments/all',
  GET_STATISTICS: '/payments/statistics',
  WEBHOOK_PAYSTACK: '/payments/webhook/paystack',
  WEBHOOK_FLUTTERWAVE: '/payments/webhook/flutterwave',
}

// ===== Payment Routes =====
export const PAYMENT_ROUTES = {
  HISTORY: '/client/payments',
  DETAILS: '/client/payments/:id',
  SUCCESS: '/payment/success',
  FAILED: '/payment/failed',
  CALLBACK: '/payment/callback',
  SELECT_GATEWAY: '/payment/select-gateway',
}

// ===== Payment Defaults =====
export const PAYMENT_DEFAULTS = {
  GATEWAY: 'FLUTTERWAVE',
  CURRENCY: 'NGN',
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
}
