/**
 * Vehicle Service
 * Handles all vehicle-related API calls
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'

/**
 * Get paginated vehicles with filters
 * GET /api/vehicles
 * @param {Object} params - Query parameters (page, size, status, vehicleType, etc.)
 * @returns {Promise} Paginated vehicle list
 */
export const getVehicles = async (params = {}) => {
  const response = await axiosInstance.get('/vehicles', { params })
  return response.data.data
}

/**
 * Get available vehicles - uses /vehicles with status filter
 * GET /api/vehicles?status=AVAILABLE
 * @param {Object} params - Query parameters
 * @returns {Promise} Paginated list of available vehicles
 */
export const getAvailableVehicles = async (params = {}) => {
  const response = await axiosInstance.get('/vehicles', {
    params: {
      status: 'AVAILABLE',
      page: 0,
      size: 100,
      ...params,
    },
  })
  return response.data.data
}

/**
 * Get vehicles by status
 * GET /api/vehicles/status/{status}
 * @param {string} status - Vehicle status (AVAILABLE, IN_USE, UNDER_MAINTENANCE, etc.)
 * @returns {Promise} List of vehicles with that status
 */
export const getVehiclesByStatus = async (status) => {
  const response = await axiosInstance.get(`/vehicles/status/${status}`)
  return response.data.data
}

/**
 * Get vehicle by ID
 * GET /api/vehicles/{id}
 * @param {string} id - Vehicle ID
 * @returns {Promise} Vehicle data
 */
export const getVehicleById = async (id) => {
  const response = await axiosInstance.get(`/vehicles/${id}`)
  return response.data.data
}

/**
 * Get vehicle by vehicle number
 * GET /api/vehicles/number/{vehicleNumber}
 * @param {string} vehicleNumber - Vehicle number
 * @returns {Promise} Vehicle data
 */
export const getVehicleByNumber = async (vehicleNumber) => {
  const response = await axiosInstance.get(`/vehicles/number/${vehicleNumber}`)
  return response.data.data
}

/**
 * Get vehicle by plate number
 * GET /api/vehicles/plate/{plate} (if this endpoint exists)
 * @param {string} plate - Plate number
 * @returns {Promise} Vehicle data
 */
export const getVehicleByPlate = async (plate) => {
  const response = await axiosInstance.get(`/vehicles/plate/${plate}`)
  return response.data.data
}

/**
 * Create a new vehicle
 * POST /api/vehicles
 * @param {Object} data - Vehicle data
 * @returns {Promise} Created vehicle
 */
export const createVehicle = async (data) => {
  const response = await axiosInstance.post('/vehicles', data)
  return response.data.data
}

/**
 * Update a vehicle
 * PUT /api/vehicles/{id}
 * @param {string} id - Vehicle ID
 * @param {Object} data - Update data
 * @returns {Promise} Updated vehicle
 */
export const updateVehicle = async (id, data) => {
  const response = await axiosInstance.put(`/vehicles/${id}`, data)
  return response.data.data
}

/**
 * Delete a vehicle (soft delete)
 * DELETE /api/vehicles/{id}
 * @param {string} id - Vehicle ID
 * @returns {Promise} Success response
 */
export const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(`/vehicles/${id}`)
  return response.data
}

/**
 * Update vehicle status
 * PATCH /api/vehicles/{id}/status?status={status}
 * @param {string} id - Vehicle ID
 * @param {string} status - New status
 * @returns {Promise} Updated vehicle
 */
export const updateVehicleStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/vehicles/${id}/status`, null, {
    params: { status },
  })
  return response.data.data
}

/**
 * Get vehicle statistics
 * GET /api/vehicles/stats
 * @returns {Promise} Stats data
 */
export const getVehicleStats = async () => {
  const response = await axiosInstance.get('/vehicles/stats')
  return response.data.data
}

export const vehicleService = {
  getVehicles,
  getAvailableVehicles,
  getVehiclesByStatus,
  getVehicleById,
  getVehicleByNumber,
  getVehicleByPlate,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
  getVehicleStats,
}

export default vehicleService
