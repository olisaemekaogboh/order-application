import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import StatCard from '../../../client/components/Dashboard/components/StatCard'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import toast from 'react-hot-toast'

const AdminFleet = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ Use adminService with the correct endpoint
    adminService
      .getFleetAnalytics()
      .then(setAnalytics)
      .catch((err) => {
        console.error('Error fetching fleet analytics:', err)
        toast.error('Failed to load fleet data')
        // Set default values to prevent crash
        setAnalytics({
          totalVehicles: 0,
          availableVehicles: 0,
          inTransitVehicles: 0,
          maintenanceVehicles: 0,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!analytics) return <div>No data</div>

  const stats = [
    { title: 'Total Vehicles', value: analytics.totalVehicles || 0, color: 'blue' },
    { title: 'Available', value: analytics.availableVehicles || 0, color: 'green' },
    { title: 'In Transit', value: analytics.inTransitVehicles || 0, color: 'amber' },
    { title: 'Maintenance', value: analytics.maintenanceVehicles || 0, color: 'red' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fleet Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  )
}

export default AdminFleet
