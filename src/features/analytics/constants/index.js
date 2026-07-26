/**
 * Analytics Constants
 * All analytics-related constants in one place
 */

// ===== Report Periods =====
export const REPORT_PERIODS = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
};

export const REPORT_PERIODS_LABELS = {
  [REPORT_PERIODS.DAY]: 'Today',
  [REPORT_PERIODS.WEEK]: 'This Week',
  [REPORT_PERIODS.MONTH]: 'This Month',
  [REPORT_PERIODS.YEAR]: 'This Year',
};

export const REPORT_PERIODS_OPTIONS = [
  { value: REPORT_PERIODS.DAY, label: 'Today' },
  { value: REPORT_PERIODS.WEEK, label: 'This Week' },
  { value: REPORT_PERIODS.MONTH, label: 'This Month' },
  { value: REPORT_PERIODS.YEAR, label: 'This Year' },
];

// ===== Chart Colors =====
export const CHART_COLORS = {
  REVENUE: '#3b82f6',
  ORDERS: '#22c55e',
  USERS: '#8b5cf6',
  DRIVERS: '#f59e0b',
  PAYMENTS: '#ec4899',
  COMMISSION: '#06b6d4',
  DELIVERIES: '#f97316',
  CANCELLED: '#ef4444',
  REFUNDS: '#64748b',
};

export const CHART_COLORS_PALETTE = [
  CHART_COLORS.REVENUE,
  CHART_COLORS.ORDERS,
  CHART_COLORS.USERS,
  CHART_COLORS.DRIVERS,
  CHART_COLORS.PAYMENTS,
  CHART_COLORS.COMMISSION,
  CHART_COLORS.DELIVERIES,
  CHART_COLORS.CANCELLED,
  CHART_COLORS.REFUNDS,
] 

// ===== Chart Defaults =====
export const CHART_DEFAULTS = {
  PERIOD: REPORT_PERIODS.WEEK,
  CURRENCY: 'NGN',
  SHOW_LEGEND: true,
  ANIMATION_DURATION: 800,
};

// ===== Analytics Error Messages =====
export const ANALYTICS_ERRORS = {
  REPORT_FAILED: 'Failed to generate revenue report',
  DATA_NOT_FOUND: 'No data available for this period',
  INVALID_PERIOD: 'Invalid report period',
  DATE_RANGE_INVALID: 'Invalid date range',
  EXPORT_FAILED: 'Failed to export report',
  CHART_RENDER_FAILED: 'Failed to render chart',
};

// ===== Analytics Success Messages =====
export const ANALYTICS_SUCCESS = {
  REPORT_GENERATED: 'Revenue report generated successfully',
  EXPORT_SUCCESS: 'Report exported successfully',
};

// ===== Analytics API Endpoints =====
export const ANALYTICS_API = {
  REVENUE_REPORT: '/revenue/report',
  DAILY_REVENUE: '/revenue/daily',
  WEEKLY_REVENUE: '/revenue/weekly',
  MONTHLY_REVENUE: '/revenue/monthly',
  YEARLY_REVENUE: '/revenue/yearly',
  REVENUE_BY_STATE: '/revenue/by-state',
  REVENUE_BY_VEHICLE: '/revenue/by-vehicle',
  REVENUE_BY_PAYMENT: '/revenue/by-payment',
  TOTAL_REVENUE: '/revenue/total',
  TOTAL_ORDERS: '/revenue/total-orders',
  AVERAGE_ORDER: '/revenue/average-order',
  COMMISSION: '/revenue/commission',
  DRIVER_PAYOUT: '/revenue/driver-payout',
};

// ===== Export Formats =====
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
};

export const EXPORT_FORMATS_LABELS = {
  [EXPORT_FORMATS.PDF]: 'PDF Document',
  [EXPORT_FORMATS.EXCEL]: 'Excel Spreadsheet',
  [EXPORT_FORMATS.CSV]: 'CSV File',
};

export const EXPORT_FORMATS_OPTIONS = [
  { value: EXPORT_FORMATS.PDF, label: 'PDF Document' },
  { value: EXPORT_FORMATS.EXCEL, label: 'Excel Spreadsheet' },
  { value: EXPORT_FORMATS.CSV, label: 'CSV File' },
];