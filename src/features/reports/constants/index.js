/**
 * Reports Constants
 * All report-related constants in one place
 */

// ===== Report Types =====
export const REPORT_TYPES = {
  REVENUE: 'REVENUE',
  ORDERS: 'ORDERS',
  DRIVERS: 'DRIVERS',
  USERS: 'USERS',
  PAYMENTS: 'PAYMENTS',
  DELIVERIES: 'DELIVERIES',
  PERFORMANCE: 'PERFORMANCE',
  CUSTOM: 'CUSTOM',
};

export const REPORT_TYPES_LABELS = {
  [REPORT_TYPES.REVENUE]: 'Revenue Report',
  [REPORT_TYPES.ORDERS]: 'Orders Report',
  [REPORT_TYPES.DRIVERS]: 'Drivers Report',
  [REPORT_TYPES.USERS]: 'Users Report',
  [REPORT_TYPES.PAYMENTS]: 'Payments Report',
  [REPORT_TYPES.DELIVERIES]: 'Deliveries Report',
  [REPORT_TYPES.PERFORMANCE]: 'Performance Report',
  [REPORT_TYPES.CUSTOM]: 'Custom Report',
};

export const REPORT_TYPES_ICONS = {
  [REPORT_TYPES.REVENUE]: '💰',
  [REPORT_TYPES.ORDERS]: '📦',
  [REPORT_TYPES.DRIVERS]: '🚚',
  [REPORT_TYPES.USERS]: '👤',
  [REPORT_TYPES.PAYMENTS]: '💳',
  [REPORT_TYPES.DELIVERIES]: '✅',
  [REPORT_TYPES.PERFORMANCE]: '📈',
  [REPORT_TYPES.CUSTOM]: '📊',
};

// ===== Report Periods =====
export const REPORT_PERIODS = {
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
  THIS_MONTH: 'THIS_MONTH',
  LAST_MONTH: 'LAST_MONTH',
  THIS_QUARTER: 'THIS_QUARTER',
  LAST_QUARTER: 'LAST_QUARTER',
  THIS_YEAR: 'THIS_YEAR',
  LAST_YEAR: 'LAST_YEAR',
  CUSTOM: 'CUSTOM',
};

export const REPORT_PERIODS_LABELS = {
  [REPORT_PERIODS.TODAY]: 'Today',
  [REPORT_PERIODS.YESTERDAY]: 'Yesterday',
  [REPORT_PERIODS.LAST_7_DAYS]: 'Last 7 Days',
  [REPORT_PERIODS.LAST_30_DAYS]: 'Last 30 Days',
  [REPORT_PERIODS.LAST_90_DAYS]: 'Last 90 Days',
  [REPORT_PERIODS.THIS_MONTH]: 'This Month',
  [REPORT_PERIODS.LAST_MONTH]: 'Last Month',
  [REPORT_PERIODS.THIS_QUARTER]: 'This Quarter',
  [REPORT_PERIODS.LAST_QUARTER]: 'Last Quarter',
  [REPORT_PERIODS.THIS_YEAR]: 'This Year',
  [REPORT_PERIODS.LAST_YEAR]: 'Last Year',
  [REPORT_PERIODS.CUSTOM]: 'Custom Range',
};

// ===== Export Formats =====
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
};

export const EXPORT_FORMATS_LABELS = {
  [EXPORT_FORMATS.PDF]: 'PDF Document',
  [EXPORT_FORMATS.EXCEL]: 'Excel Spreadsheet',
  [EXPORT_FORMATS.CSV]: 'CSV File',
  [EXPORT_FORMATS.JSON]: 'JSON Data',
};

export const EXPORT_FORMATS_ICONS = {
  [EXPORT_FORMATS.PDF]: '📄',
  [EXPORT_FORMATS.EXCEL]: '📊',
  [EXPORT_FORMATS.CSV]: '📋',
  [EXPORT_FORMATS.JSON]: '📁',
};

// ===== Report Statuses =====
export const REPORT_STATUSES = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

export const REPORT_STATUSES_LABELS = {
  [REPORT_STATUSES.PENDING]: 'Pending',
  [REPORT_STATUSES.PROCESSING]: 'Processing',
  [REPORT_STATUSES.COMPLETED]: 'Completed',
  [REPORT_STATUSES.FAILED]: 'Failed',
};

// ===== Report Error Messages =====
export const REPORT_ERRORS = {
  GENERATION_FAILED: 'Failed to generate report',
  INVALID_TYPE: 'Invalid report type',
  INVALID_PERIOD: 'Invalid report period',
  INVALID_DATE_RANGE: 'Invalid date range',
  EXPORT_FAILED: 'Failed to export report',
  NOT_FOUND: 'Report not found',
  DATA_UNAVAILABLE: 'No data available for the selected criteria',
  SIZE_EXCEEDED: 'Report size exceeds maximum limit',
};

// ===== Report Success Messages =====
export const REPORT_SUCCESS = {
  GENERATED: 'Report generated successfully',
  EXPORTED: 'Report exported successfully',
};

// ===== Report API Endpoints =====
export const REPORT_API = {
  GENERATE: '/reports/generate',
  GET_ALL: '/reports',
  GET_BY_ID: '/reports/{id}',
  DOWNLOAD: '/reports/{id}/download',
  DELETE: '/reports/{id}',
  EXPORT: '/reports/export',
  SCHEDULE: '/reports/schedule',
  CANCEL_SCHEDULE: '/reports/schedule/{id}',
};

// ===== Report Defaults =====
export const REPORT_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  TYPE: REPORT_TYPES.REVENUE,
  PERIOD: REPORT_PERIODS.LAST_30_DAYS,
  FORMAT: EXPORT_FORMATS.PDF,
};

// ===== Report Charts =====
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  AREA: 'area',
  RADAR: 'radar',
};

export const CHART_COLORS = {
  REVENUE: '#3b82f6',
  ORDERS: '#22c55e',
  DRIVERS: '#f59e0b',
  USERS: '#8b5cf6',
  PAYMENTS: '#ec4899',
  DELIVERIES: '#06b6d4',
  CANCELLED: '#ef4444',
  REFUNDS: '#64748b',
};