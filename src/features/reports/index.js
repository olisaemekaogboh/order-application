/**
 * Reports Feature Index
 * Main entry point for the reports feature
 */

// ===== Components =====
export { ReportGenerator } from './components/ReportGenerator/ReportGenerator'
export { ReportList } from './components/ReportList/ReportList'

// ===== Hooks =====
export { useReports } from './hooks/useReports'

// ===== Services =====
export { reportService } from './services/reportService'

// ===== Constants =====
export {
  REPORT_TYPES,
  REPORT_TYPES_LABELS,
  REPORT_TYPES_ICONS,
  REPORT_PERIODS,
  REPORT_PERIODS_LABELS,
  EXPORT_FORMATS,
  EXPORT_FORMATS_LABELS,
  EXPORT_FORMATS_ICONS,
  REPORT_STATUSES,
  REPORT_STATUSES_LABELS,
  REPORT_ERRORS,
  REPORT_SUCCESS,
  REPORT_API,
  REPORT_DEFAULTS,
  CHART_TYPES,
  CHART_COLORS,
} from './constants'

// ===== Validations =====
export {
  validateReportType,
  validateReportPeriod,
  validateDateRange,
  validateExportFormat,
  validateReportFilters,
} from './validations'

// ===== Utils =====
export {
  getReportTypeLabel,
  getReportTypeIcon,
  getReportPeriodLabel,
  getExportFormatLabel,
  getExportFormatIcon,
  getDateRangeForPeriod,
  formatReportDate,
  formatFileSize,
  prepareChartData,
  getDefaultFilters,
  isReportTypeValid,
  isPeriodValid,
} from './utils'
