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
  PROCESS: '/payments/process',
  VERIFY: '/payments/verify/{reference}',
  REFUND: '/payments/refund/{id}',
  GET_BY_ORDER: '/payments/order/{orderId}',
  GET_BY_REFERENCE: '/payments/reference/{reference}',
  GET_HISTORY: '/payments/history',
  GET_USER_PAYMENTS: '/payments/user',
  CALLBACK: '/payments/callback',
}

// ===== Payment Routes =====
export const PAYMENT_ROUTES = {
  HISTORY: '/client/payments',
  DETAILS: '/client/payments/:id',
  SUCCESS: '/payment/success',
  FAILED: '/payment/failed',
  CALLBACK: '/payment/callback',
}

// ===== Payment Gateway Providers =====
export const PAYMENT_GATEWAYS = {
  PAYSTACK: 'PAYSTACK',
  FLUTTERWAVE: 'FLUTTERWAVE',
}

export const PAYMENT_GATEWAYS_LABELS = {
  [PAYMENT_GATEWAYS.PAYSTACK]: 'Paystack',
  [PAYMENT_GATEWAYS.FLUTTERWAVE]: 'Flutterwave',
}

// ===== Payment Defaults =====
export const PAYMENT_DEFAULTS = {
  CURRENCY: 'NGN',
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
}
