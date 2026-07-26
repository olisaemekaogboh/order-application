export const validateReportPeriod = (period) => {
  const validPeriods = ['DAY', 'WEEK', 'MONTH', 'YEAR', 'CUSTOM']
  if (!period) return 'Period is required'
  if (!validPeriods.includes(period)) return 'Invalid period'
  return null
}

export const validateDateRange = (startDate, endDate) => {
  const errors = {}
  if (!startDate) errors.startDate = 'Start date is required'
  else if (isNaN(new Date(startDate).getTime())) errors.startDate = 'Invalid start date'
  if (!endDate) errors.endDate = 'End date is required'
  else if (isNaN(new Date(endDate).getTime())) errors.endDate = 'Invalid end date'
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    errors.endDate = 'End date must be after start date'
  }
  return errors
}

export const validateCurrency = (currency) => {
  const validCurrencies = ['NGN', 'USD', 'EUR', 'GBP']
  if (!currency) return null
  if (!validCurrencies.includes(currency)) return 'Invalid currency'
  return null
}

export const validateExportFormat = (format) => {
  const validFormats = ['pdf', 'csv', 'xlsx', 'json']
  if (!format) return 'Format is required'
  if (!validFormats.includes(format)) return 'Invalid format'
  return null
}

export const validateReportFilters = (filters) => {
  const errors = {}
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
