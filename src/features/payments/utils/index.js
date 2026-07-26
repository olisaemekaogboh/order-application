/**
 * Payments Utilities
 * Helper functions for payment operations
 */

import {
  PAYMENT_STATUSES_LABELS,
  PAYMENT_METHODS_LABELS,
  PAYMENT_METHODS_ICONS,
  PAYMENT_STATUSES_COLORS,
} from '../constants'

// ===== Status Helpers =====
export const getPaymentStatusLabel = (status) => {
  return PAYMENT_STATUSES_LABELS[status] || status
}

export const getPaymentStatusColor = (status) => {
  return (
    PAYMENT_STATUSES_COLORS[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

export const getPaymentMethodLabel = (method) => {
  return PAYMENT_METHODS_LABELS[method] || method
}

export const getPaymentMethodIcon = (method) => {
  return PAYMENT_METHODS_ICONS[method] || '💳'
}

// ===== Amount Helpers =====
export const formatPaymentAmount = (amount, currency = 'NGN') => {
  if (amount === undefined || amount === null) return '₦0.00'
  if (currency === 'NGN') {
    return `₦${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export const formatPaymentDate = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ===== Status Check Helpers =====
export const isPaymentSuccessful = (status) => {
  return status === 'PAID'
}

export const isPaymentPending = (status) => {
  return status === 'PENDING' || status === 'PROCESSING'
}

export const isPaymentRefundable = (status) => {
  return status === 'PAID' || status === 'PARTIALLY_REFUNDED'
}

export const isPaymentFailed = (status) => {
  return status === 'FAILED' || status === 'CANCELLED'
}

// ===== Search Helpers =====
export const filterPayments = (payments, searchTerm) => {
  if (!searchTerm) return payments
  const lower = searchTerm.toLowerCase()
  return payments.filter(
    (p) =>
      p.reference?.toLowerCase().includes(lower) ||
      p.orderNumber?.toLowerCase().includes(lower) ||
      p.method?.toLowerCase().includes(lower) ||
      p.status?.toLowerCase().includes(lower)
  )
}

// ===== Map Payment Data =====
export const mapPaymentResponse = (payment) => {
  if (!payment) return null
  return {
    ...payment,
    formattedAmount: formatPaymentAmount(payment.amount, payment.currency),
    formattedDate: formatPaymentDate(payment.paymentDate || payment.createdAt),
    statusLabel: getPaymentStatusLabel(payment.status),
    statusColor: getPaymentStatusColor(payment.status),
    methodLabel: getPaymentMethodLabel(payment.method),
    methodIcon: getPaymentMethodIcon(payment.method),
    isSuccessful: isPaymentSuccessful(payment.status),
    isPending: isPaymentPending(payment.status),
    isRefundable: isPaymentRefundable(payment.status),
    isFailed: isPaymentFailed(payment.status),
  }
}

export const mapPaymentList = (payments) => {
  if (!Array.isArray(payments)) return []
  return payments.map(mapPaymentResponse)
}

// ===== Transaction Reference Helpers =====
export const generateTransactionReference = (prefix = 'TXN') => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`.toUpperCase()
}

export const extractReferenceParts = (reference) => {
  if (!reference) return null
  const parts = reference.split('-')
  return {
    prefix: parts[0],
    timestamp: parts[1],
    random: parts[2],
  }
}

// ===== Gateway Helpers =====
export const getGatewayLogo = (gateway) => {
  const logos = {
    PAYSTACK: 'https://paystack.com/assets/images/logo.svg',
    FLUTTERWAVE: 'https://flutterwave.com/assets/images/logo.svg',
  }
  return logos[gateway] || null
}
