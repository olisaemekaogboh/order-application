// features/drivers/components/DriverDashboard/DriverDashboard.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import {
  CheckCircle,
  Truck,
  DollarSign,
  Star,
  MapPin,
  Bell,
  Package,
  Users,
  ChevronRight,
  Navigation,
  Clock,
  Phone,
  User,
  Car,
  AlertCircle,
  RefreshCw,
  Map,
  Target,
  TrendingUp,
} from 'lucide-react'
import { useDriverDashboard } from '../../hooks/useDriverDashboard'
import { useDriverLocation } from '../../hooks/useDriverLocation'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import Card from '@/shared/components/ui/Card/Card'
import CardHeader from '@/shared/components/ui/Card/CardHeader'
import CardTitle from '@/shared/components/ui/Card/CardTitle'
import CardContent from '@/shared/components/ui/Card/CardContent'
import Badge from '@/shared/components/ui/Badge/Badge'
import Progress from '@/shared/components/ui/Progress/Progress'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

// ============================================================
// ONE AUTHORITATIVE STATUS MAPPING
// ============================================================

const STATUS_LABELS = {
  WAITING_DRIVER_ACCEPTANCE: 'Waiting for Driver',
  DRIVER_ACCEPTED: 'Driver Accepted',
  EN_ROUTE_PICKUP: 'En Route to Pickup',
  PICKUP_COMPLETED: 'Pickup Completed',
  DELIVERY_IN_PROGRESS: 'Delivery In Progress',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
}

const STATUS_COLORS = {
  WAITING_DRIVER_ACCEPTANCE: 'bg-yellow-500',
  DRIVER_ACCEPTED: 'bg-blue-500',
  EN_ROUTE_PICKUP: 'bg-purple-500',
  PICKUP_COMPLETED: 'bg-indigo-500',
  DELIVERY_IN_PROGRESS: 'bg-orange-500',
  DELIVERED: 'bg-green-500',
  FAILED: 'bg-red-500',
  CANCELLED: 'bg-gray-500',
}

// ============================================================
// PROGRESS STEPS MATCHING BACKEND WORKFLOW
// ============================================================

const PROGRESS_STEPS = [
  { status: 'WAITING_DRIVER_ACCEPTANCE', label: 'Assigned', icon: '📋' },
  { status: 'DRIVER_ACCEPTED', label: 'Accepted', icon: '✅' },
  { status: 'EN_ROUTE_PICKUP', label: 'En Route', icon: '🚗' },
  { status: 'PICKUP_COMPLETED', label: 'Picked Up', icon: '📦' },
  { status: 'DELIVERY_IN_PROGRESS', label: 'Delivering', icon: '🚚' },
  { status: 'DELIVERED', label: 'Delivered', icon: '🎉' },
]

const STATUS_ORDER = PROGRESS_STEPS.map((s) => s.status)

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getCurrentStepIndex = (status) => {
  const index = STATUS_ORDER.indexOf(status)
  return index >= 0 ? index : 0
}

const getStatusLabel = (status) => STATUS_LABELS[status] || status
const getStatusColor = (status) => STATUS_COLORS[status] || 'bg-gray-500'

const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid Date'
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return 'Invalid Date'
  }
}

const getStatusIcon = (status) => {
  const icons = {
    WAITING_DRIVER_ACCEPTANCE: '⏳',
    DRIVER_ACCEPTED: '✅',
    EN_ROUTE_PICKUP: '🚗',
    PICKUP_COMPLETED: '📦',
    DELIVERY_IN_PROGRESS: '🚚',
    DELIVERED: '🎉',
    FAILED: '❌',
    CANCELLED: '🚫',
  }
  return icons[status] || '📌'
}

// ============================================================
// MAIN COMPONENT
// ============================================================

const DriverDashboard = () => {
  const navigate = useNavigate()
  const {
    loading,
    error,
    dashboard,
    deliveryProgress,
    hasActiveDispatch,
    isUpdating,
    loadDashboard,
    acceptDispatch,
    rejectDispatch,
    startTrip,
    pickupCompleted,
    startDelivery,
    completeDelivery,
    updateLocation,
  } = useDriverDashboard()

  const { location } = useDriverLocation(dashboard.currentDispatch, updateLocation)

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  // Derived data
  const {
    driver,
    currentDispatch,
    recentDispatches,
    earnings,
    notifications,
    stats,
    trackingSession,
  } = dashboard

  // Chart data
  const deliveryStatusData = useMemo(
    () => [
      { name: 'Completed', value: stats.completedDeliveries || 0 },
      { name: 'Active', value: stats.activeDispatches || 0 },
    ],
    [stats]
  )

  const weeklyEarningsData = useMemo(() => {
    const data = [
      { day: 'Mon', amount: 0 },
      { day: 'Tue', amount: 0 },
      { day: 'Wed', amount: 0 },
      { day: 'Thu', amount: 0 },
      { day: 'Fri', amount: 0 },
      { day: 'Sat', amount: 0 },
      { day: 'Sun', amount: 0 },
    ]

    earnings.slice(0, 7).forEach((item, index) => {
      if (data[index]) {
        data[index].amount = item.amount || 0
      }
    })

    return data
  }, [earnings])

  // ============================================================
  // ACTION HANDLERS - USING CORRECT HOOK METHODS
  // ============================================================

  const handleAccept = async () => {
    if (!currentDispatch?.id || isUpdating) return
    try {
      await acceptDispatch(currentDispatch.id)
    } catch (error) {
      console.error('Failed to accept dispatch:', error)
    }
  }

  const handleReject = async () => {
    if (!currentDispatch?.id || isUpdating) return
    try {
      await rejectDispatch(currentDispatch.id)
    } catch (error) {
      console.error('Failed to reject dispatch:', error)
    }
  }

  const handleStartTrip = async () => {
    if (isUpdating) return
    try {
      await startTrip()
    } catch (error) {
      console.error('Failed to start trip:', error)
    }
  }

  const handlePickupCompleted = async () => {
    if (isUpdating) return
    try {
      await pickupCompleted()
    } catch (error) {
      console.error('Failed to complete pickup:', error)
    }
  }

  const handleStartDelivery = async () => {
    if (isUpdating) return
    try {
      await startDelivery()
    } catch (error) {
      console.error('Failed to start delivery:', error)
    }
  }

  const handleCompleteDelivery = async () => {
    if (isUpdating) return
    try {
      await completeDelivery()
    } catch (error) {
      console.error('Failed to complete delivery:', error)
    }
  }

  // ============================================================
  // RENDER ACTION BUTTONS - FOLLOWS BACKEND WORKFLOW
  // ============================================================

  const renderActionButtons = () => {
    if (!currentDispatch) return null

    switch (currentDispatch.status) {
      case 'WAITING_DRIVER_ACCEPTANCE':
        return (
          <>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleAccept}
              disabled={isUpdating}
            >
              {isUpdating ? <Spinner size="sm" className="mr-2" /> : null}
              Accept Dispatch
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleReject}
              disabled={isUpdating}
            >
              Reject
            </Button>
          </>
        )

      case 'DRIVER_ACCEPTED':
        return (
          <Button className="w-full" onClick={handleStartTrip} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Starting Trip...
              </>
            ) : (
              'Start Trip'
            )}
          </Button>
        )

      case 'EN_ROUTE_PICKUP':
        return (
          <Button className="w-full" onClick={handlePickupCompleted} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Completing Pickup...
              </>
            ) : (
              'Pickup Completed'
            )}
          </Button>
        )

      case 'PICKUP_COMPLETED':
        return (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleStartDelivery}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Starting Delivery...
              </>
            ) : (
              'Start Delivery'
            )}
          </Button>
        )

      case 'DELIVERY_IN_PROGRESS':
        return (
          <Button
            className="w-full bg-green-700 hover:bg-green-800"
            onClick={handleCompleteDelivery}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Completing Delivery...
              </>
            ) : (
              'Complete Delivery'
            )}
          </Button>
        )

      case 'DELIVERED':
        return (
          <Button className="w-full bg-gray-400" disabled>
            ✅ Delivered
          </Button>
        )

      case 'FAILED':
        return (
          <Button className="w-full bg-red-500" disabled>
            ❌ Delivery Failed
          </Button>
        )

      case 'CANCELLED':
        return (
          <Button className="w-full bg-gray-400" disabled>
            🚫 Dispatch Cancelled
          </Button>
        )

      default:
        console.warn('Unknown dispatch status:', currentDispatch.status)
        return null
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-red-600 dark:text-red-400 text-center">
          <p className="text-xl font-semibold">Error loading dashboard</p>
          <p className="mt-2">{error}</p>
          <Button variant="primary" className="mt-4" onClick={loadDashboard}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header - unchanged */}
      <div className="bg-gradient-to-r from-green-300 to-indigo-300 dark:from-blue-800 dark:to-indigo-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {driver?.name || 'Driver'}!</h1>
            <p className="text-blue-100 mt-1">
              {hasActiveDispatch ? 'You have an active delivery' : 'Ready to deliver today?'}
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-3">
            <Badge
              className={`px-4 py-2 ${driver?.available !== false ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {driver?.available !== false ? '🟢 ONLINE' : '🔴 OFFLINE'}
            </Badge>
            <Badge className="bg-white/20 text-white border-none">
              {driver?.currentLocation || 'Unknown Location'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards - unchanged */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.activeDispatches}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.completedDeliveries}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Earnings</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ₦{Number(stats.totalEarnings || 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.driverRating ? stats.driverRating.toFixed(1) : '0.0'} ⭐
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row - unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Delivery Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Weekly Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEarningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Dispatch & Live Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5" />
              Current Dispatch
            </CardTitle>
            {hasActiveDispatch && (
              <Badge className={getStatusColor(currentDispatch.status)}>
                {getStatusLabel(currentDispatch.status)}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {!hasActiveDispatch ? (
              <div className="text-center py-8">
                <Truck className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
                <p className="text-gray-500 mt-4">No Active Dispatch</p>
                <p className="text-sm text-gray-400">You're waiting for the next assignment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                  <span className="text-gray-500">Order Number</span>
                  <span className="font-semibold">{currentDispatch.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                  <span className="text-gray-500">Pickup</span>
                  <span className="font-medium">{currentDispatch.pickupLocation || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium">{currentDispatch.deliveryLocation || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="font-medium">{currentDispatch.vehicleNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-medium">{currentDispatch.customerName || 'N/A'}</span>
                </div>
                <div className="flex gap-3 mt-4">{renderActionButtons()}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Tracking Card - unchanged */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Map className="w-5 h-5 text-green-500" />
              Live Tracking
            </CardTitle>
            {hasActiveDispatch && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-500 font-medium">Live</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {!hasActiveDispatch ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 mx-auto text-gray-300" />
                <p className="text-gray-500 mt-4">No active dispatch to track</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-pulse"></div>
                      <div className="relative w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Navigation className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 border-none shadow-sm">
                      {getStatusIcon(currentDispatch.status)}{' '}
                      {getStatusLabel(currentDispatch.status)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-md backdrop-blur-sm">
                    {location.latitude != null && location.longitude != null ? (
                      <>
                        {location.latitude.toFixed(6)}°, {location.longitude.toFixed(6)}°
                      </>
                    ) : (
                      'Waiting for GPS...'
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Navigation className="w-4 h-4" />
                      <span>Status</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">
                      {getStatusLabel(currentDispatch.status)}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Last Update</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">
                      {location.lastUpdated
                        ? new Date(location.lastUpdated).toLocaleTimeString()
                        : '--:--'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Car className="w-4 h-4" />
                      <span>Vehicle</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">
                      {currentDispatch.vehicleNumber || 'N/A'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      <span>Driver</span>
                    </div>
                    <p className="font-semibold text-sm mt-1">{driver?.name || 'N/A'}</p>
                  </div>
                </div>

                {trackingSession?.id && (
                  <div className="text-center text-xs text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                    Tracking ID: {trackingSession.id}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delivery Progress */}
      {hasActiveDispatch && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Delivery Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {deliveryProgress}%
                  </span>
                </div>
                <Progress value={deliveryProgress} className="h-3" />
              </div>

              <div className="relative overflow-x-auto pb-2">
                <div className="flex items-center gap-2 min-w-max">
                  {PROGRESS_STEPS.map((step, index) => {
                    const currentIndex = getCurrentStepIndex(currentDispatch?.status || '')
                    const stepIndex = getCurrentStepIndex(step.status)
                    const isCompleted = stepIndex < currentIndex
                    const isCurrent = stepIndex === currentIndex

                    return (
                      <React.Fragment key={step.status}>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                : isCurrent
                                  ? 'bg-blue-500 text-white ring-4 ring-blue-500/30 animate-pulse'
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-lg">{step.icon}</span>
                            )}
                          </div>
                          <span
                            className={`text-xs mt-1 whitespace-nowrap ${
                              isCompleted
                                ? 'text-green-600 dark:text-green-400 font-medium'
                                : isCurrent
                                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                                  : 'text-gray-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>

                        {index < PROGRESS_STEPS.length - 1 && (
                          <div
                            className={`w-8 h-0.5 ${
                              isCompleted
                                ? 'bg-green-500'
                                : isCurrent
                                  ? 'bg-gradient-to-r from-green-500 to-gray-300'
                                  : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>

              {currentDispatch && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <span className="font-semibold">Current Step:</span>{' '}
                      {getStatusLabel(currentDispatch.status)}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                      {currentDispatch.status === 'WAITING_DRIVER_ACCEPTANCE' &&
                        'Review the dispatch and accept it to begin.'}
                      {currentDispatch.status === 'DRIVER_ACCEPTED' &&
                        'Click "Start Trip" to begin your journey to the pickup location.'}
                      {currentDispatch.status === 'EN_ROUTE_PICKUP' &&
                        'You are on your way to the pickup location. Complete the pickup when the package is collected.'}
                      {currentDispatch.status === 'PICKUP_COMPLETED' &&
                        'Package has been picked up. Start delivery to continue.'}
                      {currentDispatch.status === 'DELIVERY_IN_PROGRESS' &&
                        'Package is currently being delivered to the destination.'}
                      {currentDispatch.status === 'DELIVERED' &&
                        'Delivery completed successfully! 🎉'}
                      {currentDispatch.status === 'FAILED' && 'This delivery has failed.'}
                      {currentDispatch.status === 'CANCELLED' &&
                        'This dispatch has been cancelled.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Dispatches & Earnings - unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Dispatches
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/driver/dispatches')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {recentDispatches.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-gray-500 mt-2">No dispatches yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentDispatches.slice(0, 5).map((dispatch) => (
                  <div
                    key={dispatch.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                    onClick={() => navigate(`/driver/dispatches/${dispatch.id}`)}
                  >
                    <div>
                      <p className="font-semibold">{dispatch.orderNumber}</p>
                      <p className="text-sm text-gray-500">{dispatch.vehicleNumber || 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(dispatch.status)}>
                        {getStatusLabel(dispatch.status)}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(dispatch.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Recent Earnings
            </CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Total: ₦{Number(stats.totalEarnings || 0).toLocaleString()}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/driver/earnings')}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {earnings.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-gray-500 mt-2">No earnings yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {earnings.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{item.orderNumber || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                    </div>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      +₦{Number(item.amount || 0).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Driver Status & Notifications - unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Driver Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-500">Availability</p>
                <p
                  className={`font-semibold ${driver?.available !== false ? 'text-green-600' : 'text-red-600'}`}
                >
                  {driver?.available !== false ? 'Available' : 'Busy'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-500">Verification</p>
                <p
                  className={`font-semibold ${driver?.verified ? 'text-green-600' : 'text-yellow-600'}`}
                >
                  {driver?.verified ? 'Verified' : 'Pending'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-semibold">{driver?.vehiclePlateNumber || 'N/A'}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">
                  {driver?.rating ? `${driver.rating.toFixed(1)} ⭐` : 'No ratings yet'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/driver/notifications')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-gray-500 mt-2">No new notifications</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - unchanged */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition"
              onClick={() => navigate('/driver/dispatches')}
            >
              <Truck className="w-6 h-6 text-blue-600" />
              <span>My Dispatches</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition"
              onClick={() => navigate('/driver/tracking')}
            >
              <MapPin className="w-6 h-6 text-purple-600" />
              <span>Live Tracking</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 transition"
              onClick={() => navigate('/driver/earnings')}
            >
              <DollarSign className="w-6 h-6 text-green-600" />
              <span>Earnings</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition"
              onClick={() => navigate('/driver/profile')}
            >
              <Users className="w-6 h-6 text-orange-600" />
              <span>Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DriverDashboard
