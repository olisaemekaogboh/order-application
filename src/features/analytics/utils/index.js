import { CHART_COLORS_PALETTE } from '../constants'

export const prepareRevenueChartData = (data) => {
  if (!data || !data.length) {
    return { labels: [], datasets: [] }
  }
  return {
    labels: data.map((item) => item.label || item.date || ''),
    datasets: [
      {
        label: 'Revenue',
        data: data.map((item) => item.value || item.revenue || 0),
        borderColor: CHART_COLORS_PALETTE[0],
        backgroundColor: CHART_COLORS_PALETTE[0] + '33',
        fill: false,
        tension: 0.4,
      },
    ],
  }
}

export const prepareOrdersChartData = (data) => {
  if (!data || !data.length) {
    return { labels: [], datasets: [] }
  }
  return {
    labels: data.map((item) => item.label || item.date || ''),
    datasets: [
      {
        label: 'Orders',
        data: data.map((item) => item.value || item.orders || 0),
        borderColor: CHART_COLORS_PALETTE[1],
        backgroundColor: CHART_COLORS_PALETTE[1] + '33',
        fill: false,
        tension: 0.4,
      },
    ],
  }
}

export const preparePieChartData = (data) => {
  if (!data || !data.length) {
    return { labels: [], datasets: [] }
  }
  return {
    labels: data.map((item) => item.label || item.name || ''),
    datasets: [
      {
        data: data.map((item) => item.value || item.count || 0),
        backgroundColor: CHART_COLORS_PALETTE.slice(0, data.length),
      },
    ],
  }
}

export const formatRevenue = (amount, currency = 'NGN') => {
  if (amount == null) return '₦0.00'
  if (currency === 'NGN') {
    return `₦${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export const getRevenueTrend = (current, previous) => {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export const getTrendColor = (trend) => {
  if (trend > 0) return 'text-green-600 dark:text-green-400'
  if (trend < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

export const getDateRangeForPeriod = (period) => {
  const now = new Date()
  const start = new Date()
  const end = new Date()
  switch (period) {
    case 'DAY':
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'WEEK':
      start.setDate(now.getDate() - now.getDay())
      start.setHours(0, 0, 0, 0)
      end.setDate(start.getDate() + 6)
      end.setHours(23, 59, 59, 999)
      break
    case 'MONTH':
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(end.getMonth() + 1, 0)
      end.setHours(23, 59, 59, 999)
      break
    case 'YEAR':
      start.setMonth(0, 1)
      start.setHours(0, 0, 0, 0)
      end.setMonth(11, 31)
      end.setHours(23, 59, 59, 999)
      break
    default:
      return { startDate: null, endDate: null }
  }
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  }
}

export const getFileName = (prefix, format) => {
  const date = new Date().toISOString().split('T')[0]
  return `${prefix}_${date}.${format}`
}

export const calculateAverage = (data) => {
  if (!data || data.length === 0) return 0
  const sum = data.reduce((acc, val) => acc + val, 0)
  return sum / data.length
}

export const calculateTotal = (data) => {
  if (!data || data.length === 0) return 0
  return data.reduce((acc, val) => acc + val, 0)
}
