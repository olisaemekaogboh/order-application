/**
 * Report Service
 * Handles all report-related API calls
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'
import { REPORT_API } from '../constants'

/**
 * Get paginated reports
 * @param {Object} params - Query parameters (page, size, type, etc.)
 * @returns {Promise} Paginated report list
 */
export const getReports = async (params = {}) => {
  const response = await axiosInstance.get(REPORT_API.GET_ALL, { params })
  return response.data.data
}

/**
 * Generate a new report
 * @param {Object} data - Report generation data
 * @param {string} data.type - Report type
 * @param {string} data.period - Report period
 * @param {string} data.startDate - Start date (if custom period)
 * @param {string} data.endDate - End date (if custom period)
 * @param {string} data.format - Export format
 * @param {Object} data.filters - Additional filters
 * @returns {Promise} Generated report
 */
export const generateReport = async (data) => {
  const response = await axiosInstance.post(REPORT_API.GENERATE, data)
  return response.data.data
}

/**
 * Get report by ID
 * @param {string} id - Report ID
 * @returns {Promise} Report data
 */
export const getReportById = async (id) => {
  const response = await axiosInstance.get(REPORT_API.GET_BY_ID.replace('{id}', id))
  return response.data.data
}

/**
 * Download a report
 * @param {string} id - Report ID
 * @param {string} format - Export format (pdf, excel, csv, json)
 * @returns {Promise} Blob
 */
export const downloadReport = async (id, format = 'pdf') => {
  const response = await axiosInstance.get(REPORT_API.DOWNLOAD.replace('{id}', id), {
    params: { format },
    responseType: 'blob',
  })
  return response.data
}

/**
 * Delete a report
 * @param {string} id - Report ID
 * @returns {Promise} Success response
 */
export const deleteReport = async (id) => {
  const response = await axiosInstance.delete(REPORT_API.DELETE.replace('{id}', id))
  return response.data
}

/**
 * Export report directly without saving
 * @param {Object} filters - Report filters
 * @param {string} format - Export format
 * @returns {Promise} Blob
 */
export const exportReport = async (filters, format = 'pdf') => {
  const response = await axiosInstance.post(REPORT_API.EXPORT, filters, {
    params: { format },
    responseType: 'blob',
  })
  return response.data
}

/**
 * Schedule a report for automatic generation
 * @param {Object} data - Schedule data
 * @param {string} data.type - Report type
 * @param {string} data.frequency - Schedule frequency (daily, weekly, monthly)
 * @param {string} data.recipients - Email recipients
 * @param {string} data.format - Export format
 * @returns {Promise} Schedule data
 */
export const scheduleReport = async (data) => {
  const response = await axiosInstance.post(REPORT_API.SCHEDULE, data)
  return response.data.data
}

/**
 * Cancel a scheduled report
 * @param {string} id - Schedule ID
 * @returns {Promise} Success response
 */
export const cancelSchedule = async (id) => {
  const response = await axiosInstance.delete(REPORT_API.CANCEL_SCHEDULE.replace('{id}', id))
  return response.data
}

export const reportService = {
  getReports,
  generateReport,
  getReportById,
  downloadReport,
  exportReport,
  deleteReport,
  scheduleReport,
  cancelSchedule,
}

export default reportService
