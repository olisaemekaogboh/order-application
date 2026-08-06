// shared/components/layouts/PublicLayout/PublicLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../layout/Navbar/Navbar'
import Footer from '../../layout/Footer/Footer'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default PublicLayout
