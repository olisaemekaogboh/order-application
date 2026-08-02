// SuperAdminLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Sidebar from '../../layout/Sidebar/Sidebar'
import Footer from '../../layout/Footer/Footer'

const SuperAdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default SuperAdminLayout
