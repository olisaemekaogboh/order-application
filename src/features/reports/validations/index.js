/**
 * Reports Validations
 * Validation functions for report generation and filters
 */

// ===== Report Type Validation =====
export const validateReportType = (type) => {
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
  if (!type) return 'Report type is required'
  if (!validTypes.includes(type)) return 'Invalid report type'
  return null
}

// ===== Report Period Validation =====
export const validateReportPeriod = (period) => {
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
  if (!period) return 'Report period is required'
  if (!validPeriods.includes(period)) return 'Invalid report period'
  return null
}

// ===== Date Range Validation =====
export const validateDateRange = (startDate, endDate) => {
  const errors = {}

  if (!startDate) {
    errors.startDate = 'Start date is required'
  } else if (isNaN(new Date(startDate).getTime())) {
    errors.startDate = 'Invalid start date format'
  }

  if (!endDate) {
    errors.endDate = 'End date is required'
  } else if (isNaN(new Date(endDate).getTime())) {
    errors.endDate = 'Invalid end date format'
  }

  if (startDate && endDate && !errors.startDate && !errors.endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      errors.endDate = 'End date must be after start date'
    }
    // Max range: 1 year
    const diffDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    if (diffDays > 365) {
      errors.endDate = 'Date range cannot exceed 365 days'
    }
  }

  return errors
}

// ===== Export Format Validation =====
export const validateExportFormat = (format) => {
  const validFormats = ['pdf', 'excel', 'csv', 'json']
  if (!format) return 'Export format is required'
  if (!validFormats.includes(format)) return 'Invalid export format'
  return null
}

// ===== Report Filters Validation =====
export const validateReportFilters = (filters) => {
  const errors = {}

  const typeError = validateReportType(filters.type)
  if (typeError) errors.type = typeError

  const periodError = validateReportPeriod(filters.period)
  if (periodError) errors.period = periodError

  if (filters.period === 'CUSTOM') {
    const dateErrors = validateDateRange(filters.startDate, filters.endDate)
    Object.assign(errors, dateErrors)
  }

  const formatError = validateExportFormat(filters.format)
  if (formatError) errors.format = formatError

  return errors
}
