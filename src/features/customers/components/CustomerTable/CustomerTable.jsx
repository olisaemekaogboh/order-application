import React from 'react'
import { CUSTOMER_ROLES_LABELS } from '../../constants'
import { formatDate } from '@/shared/utils/formatters/dateFormatter'
import Badge from '@/shared/components/ui/Badge/Badge'

const CustomerTable = ({
  customers = [],
  showActions = false,
  onDeleteUser = null, // Add delete handler prop
}) => {
  // Handle delete with confirmation
  const handleDelete = (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to delete user "${userName}"? This action cannot be undone.`
      )
    ) {
      onDeleteUser(userId)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Role
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Joined
            </th>
            {showActions && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.fullName || `${user.firstName} ${user.lastName}`}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {user.email}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <Badge variant="default">{CUSTOMER_ROLES_LABELS[user.role] || user.role}</Badge>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <Badge
                  variant={
                    user.enabled && user.status !== 'SUSPENDED'
                      ? 'success'
                      : user.status === 'SUSPENDED'
                        ? 'warning'
                        : 'danger'
                  }
                >
                  {user.enabled && user.status !== 'SUSPENDED'
                    ? 'Active'
                    : user.status === 'SUSPENDED'
                      ? 'Suspended'
                      : 'Disabled'}
                </Badge>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatDate(user.createdAt)}
              </td>
              {showActions && (
                <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      handleDelete(user.id, user.fullName || `${user.firstName} ${user.lastName}`)
                    }
                    className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors duration-150 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                  {/* You can add other action buttons here */}
                </td>
              )}
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td
                colSpan={showActions ? 6 : 5}
                className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerTable
