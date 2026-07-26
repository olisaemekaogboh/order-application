import React, { useState } from 'react'
import { CUSTOMER_ROLES_LABELS, CUSTOMER_ACTIVITY_LABELS } from '../constants'
import Badge from '@/shared/components/ui/Badge/Badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import Avatar from '@/shared/components/ui/Avatar/Avatar'
import Divider from '@/shared/components/ui/Divider/Divider'
import Tabs from '@/shared/components/ui/Tabs/Tabs'
import Button from '@/shared/components/ui/Button/Button'

const CustomerDetails = ({ customer, onClose }) => {
  const [activeTab, setActiveTab] = useState(0)

  if (!customer) return null

  const tabs = [
    {
      label: 'Profile',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={customer.profilePicture}
              fallback={customer.firstName?.[0] || customer.email?.[0] || 'U'}
              size="xl"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {customer.firstName} {customer.lastName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{customer.email}</p>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-gray-900 dark:text-white">
                {CUSTOMER_ROLES_LABELS[customer.role] || customer.role}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
              <Badge
                variant={
                  customer.enabled && customer.status !== 'SUSPENDED'
                    ? 'success'
                    : customer.status === 'SUSPENDED'
                      ? 'warning'
                      : 'danger'
                }
              >
                {customer.enabled && customer.status !== 'SUSPENDED'
                  ? 'Active'
                  : customer.status === 'SUSPENDED'
                    ? 'Suspended'
                    : 'Inactive'}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-900 dark:text-white">{customer.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</p>
              <p className="text-gray-900 dark:text-white">
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</p>
              <p className="text-gray-900 dark:text-white">
                {customer.lastLogin ? new Date(customer.lastLogin).toLocaleString() : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-gray-900 dark:text-white">{customer.totalOrders || 0}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-gray-900 dark:text-white">
                ₦{customer.totalSpent?.toLocaleString() || '0.00'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Preferred Language
              </p>
              <p className="text-gray-900 dark:text-white">
                {customer.preferredLanguage?.toUpperCase() || 'EN'}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Activity',
      content: (
        <div className="space-y-4">
          {customer.activities && customer.activities.length > 0 ? (
            <div className="flow-root">
              <ul className="-mb-8">
                {customer.activities.map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== customer.activities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                            <span className="text-gray-500 dark:text-gray-400">
                              {activity.type === 'LOGIN' && '🔑'}
                              {activity.type === 'ORDER_CREATED' && '📦'}
                              {activity.type === 'ORDER_CANCELLED' && '❌'}
                              {activity.type === 'PAYMENT_MADE' && '💳'}
                              {activity.type === 'PROFILE_UPDATED' && '✏️'}
                              {activity.type === 'PASSWORD_CHANGED' && '🔒'}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {CUSTOMER_ACTIVITY_LABELS[activity.type] || activity.type}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No activity records</p>
          )}
        </div>
      ),
    },
    {
      label: 'Orders',
      content: (
        <div className="space-y-4">
          {customer.orders && customer.orders.length > 0 ? (
            customer.orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Order #{order.orderNumber}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span>{order.status}</span>
                    <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                    <span>₦{order.totalPrice?.toLocaleString() || '0.00'}</span>
                    <span className="text-gray-500 dark:text-gray-400">Date:</span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No orders</p>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} defaultTab={activeTab} onChange={setActiveTab} />
      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

export default CustomerDetails
