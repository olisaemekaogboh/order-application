import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSupport } from '../../hooks/useSupport'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Textarea from '@/shared/components/ui/Textarea/Textarea'
import Avatar from '@/shared/components/ui/Avatar/Avatar'
import Button from '@/shared/components/ui/Button/Button'
import {
  TICKET_STATUSES,
  TICKET_STATUSES_LABELS,
  TICKET_CATEGORIES_ICONS,
  TICKET_CATEGORIES_LABELS,
  TICKET_PRIORITIES_LABELS,
  TICKET_ROUTES,
} from '../../constants'
import { formatTicketDate, getTicketAge } from '../../utils'

const TicketDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    currentTicket,
    messages,
    loading,
    sendMessage,
    closeTicket,
    reopenTicket,
    deleteTicket,
    fetchTicketDetails,
  } = useSupport()

  const [newMessage, setNewMessage] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (id) {
      fetchTicketDetails(id)
    }
  }, [id, fetchTicketDetails])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    setSending(true)
    try {
      await sendMessage(id, newMessage, isInternal)
      setNewMessage('')
      setIsInternal(false)
    } catch (error) {
      // error handled in hook
    } finally {
      setSending(false)
    }
  }

  const handleClose = async () => {
    if (window.confirm('Close this ticket?')) {
      await closeTicket(id)
    }
  }

  const handleReopen = async () => {
    await reopenTicket(id)
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this ticket?')) {
      await deleteTicket(id)
      navigate(TICKET_ROUTES.LIST)
    }
  }

  if (loading && !currentTicket) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!currentTicket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Ticket not found</p>
        <Button onClick={() => navigate(TICKET_ROUTES.LIST)} className="mt-4">
          Back to Tickets
        </Button>
      </div>
    )
  }

  const isClosed = currentTicket.status === TICKET_STATUSES.CLOSED
  const isResolved = currentTicket.status === TICKET_STATUSES.RESOLVED

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentTicket.title}
              </h1>
              <Badge
                variant={
                  currentTicket.status === 'OPEN'
                    ? 'info'
                    : currentTicket.status === 'IN_PROGRESS'
                      ? 'warning'
                      : currentTicket.status === 'RESOLVED'
                        ? 'success'
                        : 'default'
                }
              >
                {TICKET_STATUSES_LABELS[currentTicket.status] || currentTicket.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                {TICKET_CATEGORIES_ICONS[currentTicket.category]}
                {TICKET_CATEGORIES_LABELS[currentTicket.category] || currentTicket.category}
              </span>
              <span>•</span>
              <span>
                Priority:{' '}
                {TICKET_PRIORITIES_LABELS[currentTicket.priority] || currentTicket.priority}
              </span>
              <span>•</span>
              <span>Created: {formatTicketDate(currentTicket.createdAt)}</span>
              <span>•</span>
              <span>{getTicketAge(currentTicket.createdAt)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!isClosed && !isResolved && (
              <Button variant="success" onClick={handleClose}>
                Close Ticket
              </Button>
            )}
            {isClosed && (
              <Button variant="primary" onClick={handleReopen}>
                Reopen
              </Button>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => navigate(TICKET_ROUTES.LIST)}>
              Back
            </Button>
          </div>
        </div>
        {currentTicket.description && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {currentTicket.description}
            </p>
          </div>
        )}
        {currentTicket.assignedTo && (
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Assigned to: {currentTicket.assignedTo}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Messages ({messages.length})
          </h2>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.isInternal ? 'bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg' : ''}`}
              >
                <Avatar fallback={msg.senderName?.[0] || 'U'} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {msg.senderName || 'User'}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatTicketDate(msg.createdAt)}
                    </span>
                    {msg.isInternal && (
                      <Badge variant="warning" size="sm">
                        Internal
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mt-1">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {!isClosed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-3">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                disabled={sending}
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={isInternal}
                    onChange={(e) => setIsInternal(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Internal note (agents only)
                </label>
                <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketDetails
