/**
 * Vehicle Service
 * Handles all vehicle-related API calls
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'
import { VEHICLE_API } from '../constants'

/**
 * Get paginated vehicles
 * @param {Object} params - Query parameters
 * @returns {Promise} Paginated vehicle list
 */
export const getVehicles = async (params = {}) => {
  const response = await axiosInstance.get(VEHICLE_API.GET_ALL, { params })
  return response.data.data
}

/**
 * Get available vehicles
 * @param {Object} params - Query parameters
 * @returns {Promise} List of available vehicles
 */
export const getAvailableVehicles = async (params = {}) => {
  const response = await axiosInstance.get(VEHICLE_API.GET_AVAILABLE, { params })
  return response.data.data
}

/**
 * Get vehicle by ID
 * @param {string} id - Vehicle ID
 * @returns {Promise} Vehicle data
 */
export const getVehicleById = async (id) => {
  const response = await axiosInstance.get(VEHICLE_API.GET_BY_ID.replace('{id}', id))
  return response.data.data
}

/**
 * Get vehicle by plate number
 * @param {string} plate - Plate number
 * @returns {Promise} Vehicle data
 */
export const getVehicleByPlate = async (plate) => {
  const response = await axiosInstance.get(VEHICLE_API.GET_BY_PLATE.replace('{plate}', plate))
  return response.data.data
}

/**
 * Create a new vehicle
 * @param {Object} data - Vehicle data
 * @returns {Promise} Created vehicle
 */
export const createVehicle = async (data) => {
  const response = await axiosInstance.post(VEHICLE_API.CREATE, data)
  return response.data.data
}

/**
 * Update a vehicle
 * @param {string} id - Vehicle ID
 * @param {Object} data - Update data
 * @returns {Promise} Updated vehicle
 */
export const updateVehicle = async (id, data) => {
  const response = await axiosInstance.put(VEHICLE_API.UPDATE.replace('{id}', id), data)
  return response.data.data
}

/**
 * Delete a vehicle
 * @param {string} id - Vehicle ID
 * @returns {Promise} Success response
 */
export const deleteVehicle = async (id) => {
  const response = await axiosInstance.delete(VEHICLE_API.DELETE.replace('{id}', id))
  return response.data
}

/**
 * Assign vehicle to driver
 * @param {string} id - Vehicle ID
 * @param {string} driverId - Driver ID
 * @returns {Promise} Updated vehicle
 */
export const assignVehicle = async (id, driverId) => {
  const response = await axiosInstance.put(VEHICLE_API.ASSIGN_DRIVER.replace('{id}', id), {
    driverId,
  })
  return response.data.data
}

/**
 * Unassign vehicle from driver
 * @param {string} id - Vehicle ID
 * @returns {Promise} Updated vehicle
 */
export const unassignVehicle = async (id) => {
  const response = await axiosInstance.put(VEHICLE_API.UNASSIGN_DRIVER.replace('{id}', id))
  return response.data.data
}

/**
 * Update vehicle status
 * @param {string} id - Vehicle ID
 * @param {string} status - New status
 * @returns {Promise} Updated vehicle
 */
export const updateVehicleStatus = async (id, status) => {
  const response = await axiosInstance.put(VEHICLE_API.UPDATE_STATUS.replace('{id}', id), {
    status,
  })
  return response.data.data
}

/**
 * Get maintenance history for a vehicle
 * @param {string} id - Vehicle ID
 * @returns {Promise} List of maintenance records
 */
export const getMaintenanceHistory = async (id) => {
  const response = await axiosInstance.get(VEHICLE_API.GET_MAINTENANCE_HISTORY.replace('{id}', id))
  return response.data.data
}

/**
 * Schedule maintenance for a vehicle
 * @param {string} id - Vehicle ID
 * @param {Object} data - Maintenance data
 * @returns {Promise} Created maintenance record
 */
export const scheduleMaintenance = async (id, data) => {
  const response = await axiosInstance.post(VEHICLE_API.MAINTENANCE.replace('{id}', id), data)
  return response.data.data
}

/**
 * Get vehicle statistics
 * @returns {Promise} Stats data
 */
export const getStats = async () => {
  const response = await axiosInstance.get(VEHICLE_API.GET_STATS)
  return response.data.data
}

export const vehicleService = {
  getVehicles,
  getAvailableVehicles,
  getVehicleById,
  getVehicleByPlate,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  assignVehicle,
  unassignVehicle,
  updateVehicleStatus,
  getMaintenanceHistory,
  scheduleMaintenance,
  getStats,
}

export default vehicleService
