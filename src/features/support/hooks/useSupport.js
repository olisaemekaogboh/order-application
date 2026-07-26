import { useState, useCallback } from 'react'
import { supportService } from '../services/supportService'
import { toast } from 'react-hot-toast'
import { TICKET_DEFAULTS } from '../constants'

export const useSupport = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tickets, setTickets] = useState([])
  const [currentTicket, setCurrentTicket] = useState(null)
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState(null)
  const [pagination, setPagination] = useState({
    page: TICKET_DEFAULTS.PAGE,
    size: TICKET_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch Tickets =====
  const fetchTickets = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await supportService.getTickets({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setTickets(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || TICKET_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch tickets'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Create Ticket =====
  const createTicket = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const ticket = await supportService.createTicket(data)
      setTickets((prev) => [ticket, ...prev])
      toast.success('Support ticket created successfully')
      return ticket
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create ticket'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Ticket =====
  const getTicket = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const ticket = await supportService.getTicketById(id)
      setCurrentTicket(ticket)
      return ticket
    } catch (err) {
      const message = err.response?.data?.message || 'Ticket not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Ticket =====
  const updateTicket = useCallback(
    async (id, data) => {
      setLoading(true)
      setError(null)
      try {
        const ticket = await supportService.updateTicket(id, data)
        setTickets((prev) => prev.map((t) => (t.id === id ? ticket : t)))
        if (currentTicket?.id === id) {
          setCurrentTicket(ticket)
        }
        toast.success('Ticket updated successfully')
        return ticket
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update ticket'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentTicket]
  )

  // ===== Delete Ticket =====
  const deleteTicket = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await supportService.deleteTicket(id)
        setTickets((prev) => prev.filter((t) => t.id !== id))
        if (currentTicket?.id === id) {
          setCurrentTicket(null)
        }
        toast.success('Ticket deleted successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete ticket'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentTicket]
  )

  // ===== Fetch Messages =====
  const fetchMessages = useCallback(async (ticketId) => {
    setLoading(true)
    try {
      const data = await supportService.getMessages(ticketId)
      setMessages(data || [])
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch messages'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Send Message =====
  const sendMessage = useCallback(async (ticketId, content, isInternal = false) => {
    setLoading(true)
    try {
      const message = await supportService.sendMessage(ticketId, content, isInternal)
      setMessages((prev) => [...prev, message])
      toast.success('Message sent successfully')
      return message
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send message'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Assign Agent =====
  const assignAgent = useCallback(
    async (ticketId, agentId) => {
      setLoading(true)
      try {
        const ticket = await supportService.assignAgent(ticketId, agentId)
        setTickets((prev) => prev.map((t) => (t.id === ticketId ? ticket : t)))
        if (currentTicket?.id === ticketId) {
          setCurrentTicket(ticket)
        }
        toast.success('Agent assigned successfully')
        return ticket
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to assign agent'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentTicket]
  )

  // ===== Close Ticket =====
  const closeTicket = useCallback(
    async (id) => {
      setLoading(true)
      try {
        const ticket = await supportService.closeTicket(id)
        setTickets((prev) => prev.map((t) => (t.id === id ? ticket : t)))
        if (currentTicket?.id === id) {
          setCurrentTicket(ticket)
        }
        toast.success('Ticket closed successfully')
        return ticket
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to close ticket'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentTicket]
  )

  // ===== Reopen Ticket =====
  const reopenTicket = useCallback(
    async (id) => {
      setLoading(true)
      try {
        const ticket = await supportService.reopenTicket(id)
        setTickets((prev) => prev.map((t) => (t.id === id ? ticket : t)))
        if (currentTicket?.id === id) {
          setCurrentTicket(ticket)
        }
        toast.success('Ticket reopened successfully')
        return ticket
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to reopen ticket'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentTicket]
  )

  // ===== Get Stats =====
  const getStats = useCallback(async () => {
    setLoading(true)
    try {
      const data = await supportService.getStats()
      setStats(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch stats'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setTickets([])
    setCurrentTicket(null)
    setMessages([])
    setStats(null)
    setError(null)
    setPagination({
      page: TICKET_DEFAULTS.PAGE,
      size: TICKET_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    tickets,
    currentTicket,
    messages,
    stats,
    pagination,

    // Actions
    fetchTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket,
    fetchMessages,
    sendMessage,
    assignAgent,
    closeTicket,
    reopenTicket,
    getStats,
    changePage,
    changePageSize,
    reset,
  }
}
