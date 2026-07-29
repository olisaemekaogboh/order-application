/**
 * Payment Service – aligned with backend controllers
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const initializePayment = async (data) => {
  const response = await axiosInstance.post('/payments/initialize', data)
  return response.data.data
}

// REMOVED: processPayment (no such endpoint)

export const verifyPayment = async (data) => {
  // POST with body: { transactionReference }
  const response = await axiosInstance.post('/payments/verify', data)
  return response.data.data
}

export const cancelPayment = async (data) => {
  // PUT with body: { transactionReference }
  const response = await axiosInstance.put('/payments/cancel', data)
  return response.data.data
}

export const refundPayment = async (data) => {
  // POST with body: { transactionReference, amount, reason }
  const response = await axiosInstance.post('/payments/refund', data)
  return response.data.data
}

export const getPaymentByOrder = async (orderId) => {
  const response = await axiosInstance.get(`/payments/order/${orderId}`)
  return response.data.data
}

export const getPaymentByReference = async (reference) => {
  const response = await axiosInstance.get(`/payments/reference/${reference}`)
  return response.data.data
}

export const getUserPayments = async (params = {}) => {
  const response = await axiosInstance.get('/payments/user', { params })
  return response.data.data
}

export const getPaymentStatus = async (reference) => {
  const payment = await getPaymentByReference(reference)
  return payment?.status
}

// Convenience export
export const paymentService = {
  initializePayment,
  verifyPayment,
  cancelPayment,
  refundPayment,
  getPaymentByOrder,
  getPaymentByReference,
  getUserPayments,
  getPaymentStatus,
}

export default paymentService
