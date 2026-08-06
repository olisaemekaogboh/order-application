import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../../../features/auth/hooks/useAuth'
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle'
import LanguageSelector from '../../common/LanguageSelector/LanguageSelector'
import NotificationBell from '../../../../features/notifications/components/NotificationBell/NotificationBell'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Helper function to get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user?.role) return '/client/dashboard'

    switch (user.role) {
      case 'SUPER_ADMIN':
        return '/super-admin/dashboard'
      case 'ADMIN':
        return '/admin/dashboard'
      case 'DRIVER':
        return '/driver/dashboard'
      case 'CLIENT':
      default:
        return '/client/dashboard'
    }
  }

  // Helper function to get notification redirect path based on user role
  const getNotificationRedirectPath = () => {
    if (!user?.role) return '/client/notifications'

    switch (user.role) {
      case 'SUPER_ADMIN':
        return '/super-admin/notifications'
      case 'ADMIN':
        return '/admin/notifications'
      case 'DRIVER':
        return '/driver/notifications'
      case 'CLIENT':
      default:
        return '/client/notifications'
    }
  }

  // Public menu items
  const publicMenu = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  // Get the appropriate menu based on authentication status
  const getMenuItems = () => {
    if (isAuthenticated) {
      // Add dashboard link for authenticated users
      return [
        { label: 'Dashboard', path: getDashboardPath(), icon: LayoutDashboard },
        ...publicMenu,
      ]
    }
    return publicMenu
  }

  const menuItems = getMenuItems()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Logistics<span className="text-blue-600 dark:text-blue-400">Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && <NotificationBell redirectPath={getNotificationRedirectPath()} />}
          <LanguageSelector />
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-gray-700 dark:text-gray-300">{user?.firstName}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium transition flex items-center gap-2 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`
              }
            >
              {item.icon && <item.icon size={18} />}
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            {isAuthenticated ? (
              <>
                <span className="block text-sm text-gray-700 dark:text-gray-300 py-1">
                  {user?.firstName}
                </span>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileOpen(false)
                  }}
                  className="block w-full text-left text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
