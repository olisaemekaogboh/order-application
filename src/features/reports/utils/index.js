/**
 * Reports Utilities
 * Helper functions for reports and charts
 */

import {
  REPORT_TYPES_LABELS,
  REPORT_TYPES_ICONS,
  REPORT_PERIODS_LABELS,
  EXPORT_FORMATS_LABELS,
  EXPORT_FORMATS_ICONS,
  CHART_COLORS,
} from '../constants'

// ===== Type Helpers =====
export const getReportTypeLabel = (type) => {
  return REPORT_TYPES_LABELS[type] || type
}

export const getReportTypeIcon = (type) => {
  return REPORT_TYPES_ICONS[type] || '📊'
}

export const getReportPeriodLabel = (period) => {
  return REPORT_PERIODS_LABELS[period] || period
}

export const getExportFormatLabel = (format) => {
  return EXPORT_FORMATS_LABELS[format] || format
}

export const getExportFormatIcon = (format) => {
  return EXPORT_FORMATS_ICONS[format] || '📄'
}

// ===== Date Helpers =====
export const getDateRangeForPeriod = (period) => {
  const now = new Date()
  const startDate = new Date()
  const endDate = new Date()

  switch (period) {
    case 'TODAY':
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'YESTERDAY':
      startDate.setDate(startDate.getDate() - 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setDate(endDate.getDate() - 1)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'LAST_7_DAYS':
      startDate.setDate(startDate.getDate() - 7)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'LAST_30_DAYS':
      startDate.setDate(startDate.getDate() - 30)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'LAST_90_DAYS':
      startDate.setDate(startDate.getDate() - 90)
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'THIS_MONTH':
      startDate.setDate(1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setMonth(endDate.getMonth() + 1, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'LAST_MONTH':
      startDate.setMonth(startDate.getMonth() - 1, 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setMonth(endDate.getMonth(), 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'THIS_QUARTER':
      const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3
      startDate.setMonth(quarterStartMonth, 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setMonth(quarterStartMonth + 3, 0)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'THIS_YEAR':
      startDate.setMonth(0, 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setMonth(11, 31)
      endDate.setHours(23, 59, 59, 999)
      break
    case 'LAST_YEAR':
      startDate.setFullYear(startDate.getFullYear() - 1, 0, 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setFullYear(endDate.getFullYear() - 1, 11, 31)
      endDate.setHours(23, 59, 59, 999)
      break
    default:
      return { startDate: null, endDate: null }
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  }
}

// ===== Format Helpers =====
export const formatReportDate = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// ===== Chart Data Helpers =====
export const prepareChartData = (data, type = 'line') => {
  if (!data) return { labels: [], datasets: [] }

  const colors = Object.values(CHART_COLORS)

  if (type === 'pie' || type === 'doughnut') {
    return {
      labels: data.map((d) => d.label || d.name || 'Unknown'),
      datasets: [
        {
          data: data.map((d) => d.value || d.count || 0),
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 2,
        },
      ],
    }
  }

  return {
    labels: data.map((d) => d.label || d.date || ''),
    datasets: [
      {
        label: 'Value',
        data: data.map((d) => d.value || d.count || 0),
        borderColor: colors[0],
        backgroundColor: `${colors[0]}33`,
        fill: type === 'area',
        tension: 0.4,
      },
    ],
  }
}

// ===== Filter Helpers =====
export const getDefaultFilters = (type) => {
  return {
    type: type || 'REVENUE',
    period: 'LAST_30_DAYS',
    startDate: null,
    endDate: null,
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
    includeBreakdown: true,
  }
}

// ===== Validation Helpers =====
export const isReportTypeValid = (type) => {
  const validTypes = [
    'REVENUE',
    'ORDERS',
    'DRIVERS',
    'USERS',
    'PAYMENTS',
    'DELIVERIES',
    'PERFORMANCE',
    'CUSTOM',
  ]
  return validTypes.includes(type)
}

export const isPeriodValid = (period) => {
  const validPeriods = [
    'TODAY',
    'YESTERDAY',
    'LAST_7_DAYS',
    'LAST_30_DAYS',
    'LAST_90_DAYS',
    'THIS_MONTH',
    'LAST_MONTH',
    'THIS_QUARTER',
    'LAST_QUARTER',
    'THIS_YEAR',
    'LAST_YEAR',
    'CUSTOM',
  ]
  return validPeriods.includes(period)
}
