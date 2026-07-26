import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../../features/auth/hooks/useAuth'

const Sidebar = () => {
  const { user } = useAuth()
  const role = user?.role

  const clientLinks = [
    { to: '/client/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/client/create-order', label: 'Create Order', icon: '📦' },
    { to: '/client/order-history', label: 'Order History', icon: '📋' },
    { to: '/client/addresses', label: 'Addresses', icon: '🏠' },
    { to: '/client/profile', label: 'Profile', icon: '👤' },
    { to: '/client/payments', label: 'Payments', icon: '💳' },
  ]

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/admin/orders', label: 'Orders', icon: '📋' },
    { to: '/admin/drivers', label: 'Drivers', icon: '🚚' },
    { to: '/admin/revenue', label: 'Revenue', icon: '💰' },
    { to: '/admin/pricing', label: 'Pricing', icon: '⚙️' },
    { to: '/admin/users', label: 'Users', icon: '👥' },
  ]

  const superAdminLinks = [
    ...adminLinks,
    { to: '/super-admin/admins', label: 'Admins', icon: '🛡️' },
    { to: '/super-admin/system', label: 'System', icon: '🔧' },
    { to: '/super-admin/audit', label: 'Audit Logs', icon: '📜' },
    { to: '/super-admin/revenue', label: 'Global Revenue', icon: '🌍' },
  ]

  let links = []
  if (role === 'CLIENT') links = clientLinks
  else if (role === 'ADMIN') links = adminLinks
  else if (role === 'SUPER_ADMIN') links = superAdminLinks

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-full overflow-y-auto flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`
            }
          >
            <span className="mr-3 text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
