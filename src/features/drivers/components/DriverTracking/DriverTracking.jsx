import { useEffect, useState } from 'react'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Card from '@/shared/components/ui/Card/Card'
import CardHeader from '@/shared/components/ui/Card/CardHeader'
import CardTitle from '@/shared/components/ui/Card/CardTitle'
import CardContent from '@/shared/components/ui/Card/CardContent'

import DriverTrackingMap from './DriverTrackingMap'
import DriverTrackingTimeline from './DriverTrackingTimeline'

import { driverService } from '../../services/driverService'
import useDriverTracking from '../../hooks/useDriverTracking'

const DriverTracking = () => {
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    loadTracking()
  }, [])

  const loadTracking = async () => {
    try {
      const response = await driverService.getDashboard()
      setDashboard(response)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!dashboard?.currentDispatch) {
    return (
      <EmptyState
        icon="📍"
        title="No Active Tracking"
        description="You currently have no active dispatch."
      />
    )
  }

  const dispatch = dashboard.currentDispatch

  // Start live GPS tracking
  const { location, tracking, error } = useDriverTracking(dispatch.id)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Tracking</CardTitle>
        </CardHeader>

        <CardContent>
          <DriverTrackingMap
            dispatch={dispatch}
            location={location}
            tracking={tracking}
            error={error}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Timeline</CardTitle>
        </CardHeader>

        <CardContent>
          <DriverTrackingTimeline dispatch={dispatch} />
        </CardContent>
      </Card>
    </div>
  )
}

export default DriverTracking
