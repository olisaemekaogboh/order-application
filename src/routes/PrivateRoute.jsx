import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (allowedRoles.length && !allowedRoles.includes(user?.role)) return <Navigate to="/" replace />
  return <Outlet />
}

export default PrivateRoute
