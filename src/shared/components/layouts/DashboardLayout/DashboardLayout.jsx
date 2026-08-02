// DashboardLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Footer from '../../layout/Footer/Footer'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default DashboardLayout
