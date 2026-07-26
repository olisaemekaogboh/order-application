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
 * Process a payment
 * @param {Object} data - Payment processing data
 * @param {string} data.orderId - Order ID
 * @param {string} data.paymentMethod - Payment method
 * @param {string} data.paymentDetails - Payment details (e.g., card token, bank details)
 * @returns {Promise} Payment processing response
 */
export const processPayment = async (data) => {
  const response = await axiosInstance.post(PAYMENT_API.PROCESS, data)
  return response.data.data
}

/**
 * Verify a payment by transaction reference
 * @param {string} reference - Transaction reference
 * @returns {Promise} Payment verification response
 */
export const verifyPayment = async (reference) => {
  const response = await axiosInstance.get(PAYMENT_API.VERIFY.replace('{reference}', reference))
  return response.data.data
}

/**
 * Get payment by order ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Payment data
 */
export const getPaymentByOrder = async (orderId) => {
  const response = await axiosInstance.get(PAYMENT_API.GET_BY_ORDER.replace('{orderId}', orderId))
  return response.data.data
}

/**
 * Get payment by transaction reference
 * @param {string} reference - Transaction reference
 * @returns {Promise} Payment data
 */
export const getPaymentByReference = async (reference) => {
  const response = await axiosInstance.get(
    PAYMENT_API.GET_BY_REFERENCE.replace('{reference}', reference)
  )
  return response.data.data
}

/**
 * Get user's payment history
 * @param {Object} params - Query parameters (page, size, status, etc.)
 * @returns {Promise} Paginated payment list
 */
export const getUserPayments = async (params = {}) => {
  const response = await axiosInstance.get(PAYMENT_API.GET_USER_PAYMENTS, { params })
  return response.data.data
}

/**
 * Refund a payment
 * @param {string} paymentId - Payment ID
 * @param {Object} data - Refund data
 * @param {number} data.amount - Refund amount
 * @param {string} data.reason - Refund reason
 * @param {string} data.note - Additional note (optional)
 * @returns {Promise} Refund response
 */
export const refundPayment = async (paymentId, data) => {
  const response = await axiosInstance.post(PAYMENT_API.REFUND.replace('{id}', paymentId), data)
  return response.data.data
}

/**
 * Get payment status (shortcut)
 * @param {string} reference - Transaction reference
 * @returns {Promise} Payment status
 */
export const getPaymentStatus = async (reference) => {
  const response = await axiosInstance.get(
    PAYMENT_API.GET_BY_REFERENCE.replace('{reference}', reference)
  )
  return response.data.data?.status
}

/**
 * Handle payment callback (webhook)
 * @param {Object} payload - Callback payload from gateway
 * @returns {Promise} Callback processing response
 */
export const handlePaymentCallback = async (payload) => {
  const response = await axiosInstance.post(PAYMENT_API.CALLBACK, payload)
  return response.data
}

// ===== Convenience exports =====
export const paymentService = {
  initializePayment,
  processPayment,
  verifyPayment,
  getPaymentByOrder,
  getPaymentByReference,
  getUserPayments,
  refundPayment,
  getPaymentStatus,
  handlePaymentCallback,
}

export default paymentService
