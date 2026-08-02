// Sidebar.jsx
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuth } from '../../../../features/auth/hooks/useAuth'

const Sidebar = () => {
  const { user } = useAuth()
  const role = user?.role
  const [isCollapsed, setIsCollapsed] = useState(false)

  const clientLinks = [
    { to: '/client/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/client/create-order', label: 'Create Order', icon: '📦' },
    { to: '/client/order-history', label: 'Order History', icon: '📋' },
    { to: '/client/order-tracking', label: 'Track Order', icon: '📍' },
    { to: '/client/addresses', label: 'Addresses', icon: '🏠' },
    { to: '/client/profile', label: 'Profile', icon: '👤' },
    { to: '/client/payments', label: 'Payments', icon: '💳' },
    { to: '/client/reviews', label: 'My Reviews', icon: '⭐' },
    { to: '/client/notifications', label: 'Notifications', icon: '🔔' },
  ]

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { to: '/admin/orders', label: 'Orders', icon: '📋' },
    { to: '/admin/dispatch', label: 'Dispatch', icon: '🚚' },
    { to: '/admin/tracking', label: 'Tracking', icon: '📍' },
    { to: '/admin/drivers', label: 'Drivers', icon: '👤' },
    { to: '/admin/vehicles', label: 'Vehicles', icon: '🚗' },
    { to: '/admin/fleet', label: 'Fleet', icon: '🚛' },
    { to: '/admin/customers', label: 'Customers', icon: '👥' },
    { to: '/admin/payments', label: 'Payments', icon: '💳' },
    { to: '/admin/revenue', label: 'Revenue', icon: '💰' },
    { to: '/admin/pricing', label: 'Pricing', icon: '⚙️' },
    { to: '/admin/reviews', label: 'Reviews', icon: '⭐' },
    { to: '/admin/users', label: 'User Management', icon: '👤' },
    { to: '/admin/reports', label: 'Reports', icon: '📄' },
    { to: '/admin/notifications', label: 'Notifications', icon: '🔔' },
  ]

  const superAdminLinks = [
    ...adminLinks,
    { to: '/super-admin/admins', label: 'Admins', icon: '🛡️' },
    { to: '/super-admin/system', label: 'System Config', icon: '🔧' },
    { to: '/super-admin/audit', label: 'Audit Logs', icon: '📜' },
    { to: '/super-admin/revenue', label: 'Global Revenue', icon: '🌍' },
    { to: '/super-admin/drivers', label: 'All Drivers', icon: '👤' },
    { to: '/super-admin/vehicles', label: 'All Vehicles', icon: '🚗' },
    { to: '/super-admin/orders', label: 'All Orders', icon: '📋' },
    { to: '/super-admin/customers', label: 'All Customers', icon: '👥' },
  ]

  let links = []
  let title = ''

  if (role === 'CLIENT') {
    links = clientLinks
    title = 'Client Menu'
  } else if (role === 'ADMIN') {
    links = adminLinks
    title = 'Admin Menu'
  } else if (role === 'SUPER_ADMIN') {
    links = superAdminLinks
    title = 'Super Admin Menu'
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside
      className={`bg-white dark:bg-gray-800 shadow-md overflow-y-auto flex-shrink-0 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {title}
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
              {user?.email || 'User'}
            </p>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-auto"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>
      <nav className="p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 rounded-lg transition-colors text-sm ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? link.label : ''}
          >
            <span className={`${isCollapsed ? 'mr-0' : 'mr-3'} text-lg`}>{link.icon}</span>
            {!isCollapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
