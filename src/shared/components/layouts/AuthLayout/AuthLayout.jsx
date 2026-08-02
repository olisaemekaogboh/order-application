// AuthLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../layout/Footer/Footer'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
