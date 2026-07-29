import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import { driverService } from '../../services/driverService'
import { orderService } from '../../../orders/services/orderService'
import StatCard from '../../../client/components/Dashboard/components/StatCard'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const DriverDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({ assigned: 0, completed: 0, earnings: 0, rating: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch driver's orders count
        const orders = await orderService.getUserOrders({
          driverId: user.id,
          status: 'ASSIGNED,IN_TRANSIT',
        })
        const completed = await orderService.getUserOrders({
          driverId: user.id,
          status: 'DELIVERED',
        })
        const earnings = await driverService.getDriverEarnings(user.id)
        const profile = await driverService.getDriverProfile(user.id)
        setStats({
          assigned: orders.total || 0,
          completed: completed.total || 0,
          earnings: earnings.total || 0,
          rating: profile.averageRating || 0,
        })
      } catch (error) {
        console.error('Failed to load driver stats', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user.id])

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )

  const cards = [
    { title: 'Assigned Orders', value: stats.assigned, color: 'blue' },
    { title: 'Completed', value: stats.completed, color: 'green' },
    { title: 'Earnings', value: `₦${stats.earnings.toLocaleString()}`, color: 'purple' },
    { title: 'Rating', value: stats.rating.toFixed(1), color: 'amber' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  )
}

export default DriverDashboard
