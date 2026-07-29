import React, { useEffect, useState } from 'react'
import { fleetService } from '@/shared/services/fleetService'
import StatCard from '../../../client/components/Dashboard/components/StatCard'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const AdminFleet = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fleetService
      .getFleetAnalytics()
      .then(setAnalytics)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  if (!analytics) return <div>No data</div>

  const stats = [
    { title: 'Total Vehicles', value: analytics.totalVehicles, color: 'blue' },
    { title: 'Available', value: analytics.availableVehicles, color: 'green' },
    { title: 'In Transit', value: analytics.inTransitVehicles, color: 'amber' },
    { title: 'Maintenance', value: analytics.maintenanceVehicles, color: 'red' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fleet Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      {/* Additional charts or tables could be added */}
    </div>
  )
}

export default AdminFleet
