/**
 * Payment Service
 * Handles all payment-related API calls
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'
import { PAYMENT_API } from '../constants'

/**
 * Initialize a payment
 * @param {Object} data - Payment initialization data
 * @param {string} data.orderId - Order ID
 * @param {string} data.paymentMethod - Payment method
 * @param {number} data.amount - Amount
 * @param {string} data.currency - Currency (optional)
 * @param {Object} data.metadata - Additional metadata
 * @returns {Promise} Payment initialization response
 */
export const initializePayment = async (data) => {
  const response = await axiosInstance.post(PAYMENT_API.INITIALIZE, data)
  return response.data.data
}

/**
 * Verify a payment (POST with transactionReference in body)
 * @param {Object} data - { transactionReference: string }
 * @returns {Promise} Payment verification response
 */
export const verifyPayment = async (data) => {
  const response = await axiosInstance.post('/payments/verify', data)
  return response.data.data
}

/**
 * Cancel a pending payment
 * @param {Object} data - { transactionReference: string }
 * @returns {Promise} Cancellation response
 */
export const cancelPayment = async (data) => {
  const response = await axiosInstance.put('/payments/cancel', data)
  return response.data.data
}

/**
 * Refund a payment (POST with body)
 * @param {Object} data - { transactionReference, amount, reason }
 * @returns {Promise} Refund response
 */
export const refundPayment = async (data) => {
  const response = await axiosInstance.post('/payments/refund', data)
  return response.data.data
}

/**
 * Get payment by order ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Payment data
 */
export const getPaymentByOrder = async (orderId) => {
  const response = await axiosInstance.get(`/payments/order/${orderId}`)
  return response.data.data
}

/**
 * Get payment by transaction reference
 * @param {string} reference - Transaction reference
 * @returns {Promise} Payment data
 */
export const getPaymentByReference = async (reference) => {
  const response = await axiosInstance.get(`/payments/reference/${reference}`)
  return response.data.data
}

/**
 * Get user's payment history (paginated)
 * @param {Object} params - Query parameters (page, size, status, etc.)
 * @returns {Promise} Paginated payment list
 */
export const getUserPayments = async (params = {}) => {
  const response = await axiosInstance.get('/payments/user', { params })
  return response.data.data
}

/**
 * Get payment status (shortcut)
 * @param {string} reference - Transaction reference
 * @returns {Promise} Payment status string
 */
export const getPaymentStatus = async (reference) => {
  const payment = await getPaymentByReference(reference)
  return payment?.status
}

/**
 * Handle payment callback (webhook) - used by server, not frontend
 * (This is usually not called from frontend; we keep it for completeness)
 */
export const handlePaymentCallback = async (payload) => {
  // Not a frontend endpoint; kept for reference
  console.warn('handlePaymentCallback is intended for server-side webhook handling')
  return null
}

// ===== Convenience exports =====
export const paymentService = {
  initializePayment,
  verifyPayment,
  cancelPayment,
  refundPayment,
  getPaymentByOrder,
  getPaymentByReference,
  getUserPayments,
  getPaymentStatus,
  // processPayment removed (no such endpoint)
}

export default paymentService
