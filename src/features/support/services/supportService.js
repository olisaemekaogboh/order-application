/**
 * Support Service
 * Handles all support ticket-related API calls
 */

import axiosInstance from '@/shared/utils/helpers/axiosConfig'
import { TICKET_API } from '../constants'

/**
 * Get paginated support tickets
 * @param {Object} params - Query parameters (page, size, status, etc.)
 * @returns {Promise} Paginated ticket list
 */
export const getTickets = async (params = {}) => {
  const response = await axiosInstance.get(TICKET_API.GET_ALL, { params })
  return response.data.data
}

/**
 * Create a new support ticket
 * @param {Object} data - Ticket data (title, description, category, priority)
 * @returns {Promise} Created ticket
 */
export const createTicket = async (data) => {
  const response = await axiosInstance.post(TICKET_API.CREATE, data)
  return response.data.data
}

/**
 * Get ticket by ID
 * @param {string} id - Ticket ID
 * @returns {Promise} Ticket data
 */
export const getTicketById = async (id) => {
  const response = await axiosInstance.get(TICKET_API.GET_BY_ID.replace('{id}', id))
  return response.data.data
}

/**
 * Update a ticket
 * @param {string} id - Ticket ID
 * @param {Object} data - Update data
 * @returns {Promise} Updated ticket
 */
export const updateTicket = async (id, data) => {
  const response = await axiosInstance.put(TICKET_API.UPDATE.replace('{id}', id), data)
  return response.data.data
}

/**
 * Delete a ticket
 * @param {string} id - Ticket ID
 * @returns {Promise} Success response
 */
export const deleteTicket = async (id) => {
  const response = await axiosInstance.delete(TICKET_API.DELETE.replace('{id}', id))
  return response.data
}

/**
 * Get messages for a ticket
 * @param {string} ticketId - Ticket ID
 * @returns {Promise} List of messages
 */
export const getMessages = async (ticketId) => {
  const response = await axiosInstance.get(TICKET_API.GET_MESSAGES.replace('{id}', ticketId))
  return response.data.data
}

/**
 * Send a message on a ticket
 * @param {string} ticketId - Ticket ID
 * @param {string} content - Message content
 * @param {boolean} isInternal - Whether message is internal (agent-only)
 * @returns {Promise} Created message
 */
export const sendMessage = async (ticketId, content, isInternal = false) => {
  const response = await axiosInstance.post(TICKET_API.SEND_MESSAGE.replace('{id}', ticketId), {
    content,
    isInternal,
  })
  return response.data.data
}

/**
 * Assign an agent to a ticket
 * @param {string} ticketId - Ticket ID
 * @param {string} agentId - Agent ID
 * @returns {Promise} Updated ticket
 */
export const assignAgent = async (ticketId, agentId) => {
  const response = await axiosInstance.put(TICKET_API.ASSIGN.replace('{id}', ticketId), { agentId })
  return response.data.data
}

/**
 * Close a ticket
 * @param {string} id - Ticket ID
 * @returns {Promise} Updated ticket
 */
export const closeTicket = async (id) => {
  const response = await axiosInstance.put(TICKET_API.CLOSE.replace('{id}', id))
  return response.data.data
}

/**
 * Reopen a ticket
 * @param {string} id - Ticket ID
 * @returns {Promise} Updated ticket
 */
export const reopenTicket = async (id) => {
  const response = await axiosInstance.put(TICKET_API.REOPEN.replace('{id}', id))
  return response.data.data
}

/**
 * Get support statistics
 * @returns {Promise} Stats data
 */
export const getStats = async () => {
  const response = await axiosInstance.get(TICKET_API.GET_STATS)
  return response.data.data
}

export const supportService = {
  getTickets,
  createTicket,
  getTicketById,
  updateTicket,
  deleteTicket,
  getMessages,
  sendMessage,
  assignAgent,
  closeTicket,
  reopenTicket,
  getStats,
}

export default supportService
