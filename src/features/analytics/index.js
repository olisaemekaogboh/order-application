/**
 * Analytics Feature Index
 * Main entry point for the analytics feature
 */

// ===== Components =====
export { default as RevenueAnalytics } from './components/RevenueAnalytics/RevenueAnalytics'
export { default as GlobalRevenue } from './components/GlobalRevenue/GlobalRevenue'
export { default as RevenueChart } from './components/RevenueChart/RevenueChart'
export { default as RevenueReport } from './components/RevenueReport/RevenueReport'

// ===== Hooks =====
export { useAnalytics } from './hooks/useAnalytics'

// ===== Services =====
export { revenueService } from './services/revenueService'

// ===== Constants =====
export {
  REPORT_PERIODS,
  REPORT_PERIODS_LABELS,
  REPORT_PERIODS_OPTIONS,
  CHART_COLORS,
  CHART_COLORS_PALETTE,
  CHART_DEFAULTS,
  ANALYTICS_ERRORS,
  ANALYTICS_SUCCESS,
  ANALYTICS_API,
  EXPORT_FORMATS,
  EXPORT_FORMATS_LABELS,
  EXPORT_FORMATS_OPTIONS,
} from './constants'

// ===== Validations =====
export {
  validateReportPeriod,
  validateDateRange,
  validateCurrency,
  validateExportFormat,
  validateReportFilters,
} from './validations'

// ===== Utils =====
export {
  prepareRevenueChartData,
  prepareOrdersChartData,
  preparePieChartData,
  formatRevenue,
  getRevenueTrend,
  getTrendColor,
  getDateRangeForPeriod,
  getFileName,
  calculateAverage,
  calculateTotal,
} from './utils'
