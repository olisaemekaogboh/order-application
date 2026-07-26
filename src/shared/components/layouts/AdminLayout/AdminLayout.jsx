import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Sidebar from '../../layout/Sidebar/Sidebar'

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
