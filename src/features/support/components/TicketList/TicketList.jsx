import React, { useState, useEffect } from 'react'
import { useSupport } from '../../hooks/useSupport'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import SearchBar from '@/shared/components/ui/SearchBar/SearchBar'
import Select from '@/shared/components/ui/Select/Select'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import {
  TICKET_ROUTES,
  TICKET_STATUSES_LABELS,
  TICKET_PRIORITIES_LABELS,
  TICKET_CATEGORIES_LABELS,
} from '../../constants'
import { formatTicketDate, getTicketAge, getTicketCategoryIcon } from '../../utils'

export const TicketList = () => {
  const { tickets, loading, pagination, fetchTickets, changePage } = useSupport()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  useEffect(() => {
    fetchTickets({
      search: search || undefined,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
      category: categoryFilter || undefined,
    })
  }, [search, statusFilter, priorityFilter, categoryFilter, pagination.page])

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    ...Object.entries(TICKET_STATUSES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    ...Object.entries(TICKET_PRIORITIES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...Object.entries(TICKET_CATEGORIES_LABELS).map(([value, label]) => ({ value, label })),
  ]

  const getPriorityBadge = (priority) => {
    const variants = {
      LOW: 'default',
      MEDIUM: 'info',
      HIGH: 'warning',
      URGENT: 'danger',
    }
    return variants[priority] || 'default'
  }

  const getStatusBadge = (status) => {
    const variants = {
      OPEN: 'info',
      IN_PROGRESS: 'warning',
      PENDING: 'warning',
      RESOLVED: 'success',
      CLOSED: 'default',
    }
    return variants[status] || 'default'
  }

  if (loading && tickets.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          placeholder="Search tickets..."
          value={search}
          onChange={setSearch}
          className="flex-1"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-40"
        />
        <Select
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full sm:w-40"
        />
        <Select
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-40"
        />
      </div>

      {tickets.length === 0 ? (
        <EmptyState
          icon="🎫"
          title="No Tickets"
          description="No support tickets found matching your criteria."
          action={<Button onClick={() => navigate(TICKET_ROUTES.CREATE)}>Create Ticket</Button>}
        />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Ticket
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Priority
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                      onClick={() => navigate(`/support/${ticket.id}`)}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.id.slice(0, 8)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{getTicketCategoryIcon(ticket.category)}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {TICKET_CATEGORIES_LABELS[ticket.category] || ticket.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant={getPriorityBadge(ticket.priority)}>
                          {TICKET_PRIORITIES_LABELS[ticket.priority] || ticket.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant={getStatusBadge(ticket.status)}>
                          {TICKET_STATUSES_LABELS[ticket.status] || ticket.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <div>{formatTicketDate(ticket.createdAt)}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {getTicketAge(ticket.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/support/${ticket.id}`)
                          }}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {pagination.page * pagination.size + 1} to{' '}
              {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
              {pagination.total} tickets
            </div>
            <Pagination
              currentPage={pagination.page + 1}
              totalPages={pagination.totalPages}
              onPageChange={(page) => changePage(page - 1)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TicketList
