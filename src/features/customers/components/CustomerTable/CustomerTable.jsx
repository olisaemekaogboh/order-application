import React from 'react'
import { CUSTOMER_ROLES_LABELS, CUSTOMER_STATUSES_LABELS } from '../../constants'
import { formatDate } from '@/shared/utils/formatters/dateFormatter'
import Badge from '@/shared/components/ui/Badge/Badge'

const CustomerTable = ({ customers = [], showActions = false }) => {
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
                  {/* Add action buttons here if needed */}
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
