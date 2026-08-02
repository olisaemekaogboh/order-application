import React, { useState } from 'react'
import { useReports } from '../../hooks/useReports'
import Select from '@/shared/components/ui/Select/Select'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

export const ReportGenerator = () => {
  const { generateReport, downloadReport, generating, downloading, errors } = useReports()
  const [filters, setFilters] = useState({
    // Report type
    type: 'REVENUE',

    // Date fields
    startDate: '',
    endDate: '',

    // Filter fields
    status: '',
    driverId: '',
    customerId: '',
    vehicleType: '',
    paymentStatus: '',

    // Format and options
    format: 'PDF',
    includeCharts: true,
    includeSummary: true,
    includeBreakdown: false,
  })

  const [generatedReport, setGeneratedReport] = useState(null)

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const typeOptions = [
    { value: 'REVENUE', label: 'Revenue Report' },
    { value: 'ORDERS', label: 'Orders Report' },
    { value: 'DRIVERS', label: 'Drivers Report' },
    { value: 'CUSTOMERS', label: 'Customers Report' },
    { value: 'DELIVERY', label: 'Delivery Performance Report' },
  ]

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'IN_TRANSIT', label: 'In Transit' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ]

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Statuses' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'PAID', label: 'Paid' },
    { value: 'FAILED', label: 'Failed' },
    { value: 'REFUNDED', label: 'Refunded' },
  ]

  const vehicleTypeOptions = [
    { value: '', label: 'All Vehicle Types' },
    { value: 'MOTORCYCLE', label: 'Motorcycle' },
    { value: 'VAN', label: 'Van' },
    { value: 'SUV', label: 'SUV' },
    { value: 'SEDAN', label: 'Sedan' },
    { value: 'PICKUP', label: 'Pickup' },
    { value: 'TRUCK', label: 'Truck' },
    { value: 'TRICYCLE', label: 'Tricycle' },
  ]

  const formatOptions = [
    { value: 'PDF', label: 'PDF' },
    { value: 'CSV', label: 'CSV' },
    { value: 'EXCEL', label: 'Excel' },
  ]

  const handleGenerate = async (e) => {
    e.preventDefault()

    // Validate required fields
    if (!filters.type) {
      toast.error('Please select a report type')
      return
    }

    // Build the payload with all fields
    const payload = {
      type: filters.type,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
      status: filters.status || null,
      driverId: filters.driverId || null,
      customerId: filters.customerId || null,
      vehicleType: filters.vehicleType || null,
      paymentStatus: filters.paymentStatus || null,
      reportFormat: filters.format,
      includeCharts: filters.includeCharts,
      includeSummary: filters.includeSummary,
      includeBreakdown: filters.includeBreakdown,
    }

    const result = await generateReport(payload)
    if (result) {
      setGeneratedReport(result)
      toast.success('Report generated successfully! You can now download it.')
    }
  }

  const handleDownload = async () => {
    if (!generatedReport) {
      toast.error('Please generate a report first')
      return
    }

    const format = filters.format.toLowerCase()
    // Pass the report type and filters for the download
    await downloadReport(
      filters.type,
      {
        startDate: filters.startDate,
        endDate: filters.endDate,
        status: filters.status,
        driverId: filters.driverId,
        customerId: filters.customerId,
        vehicleType: filters.vehicleType,
        paymentStatus: filters.paymentStatus,
      },
      format
    )
  }

  const isFormValid = () => {
    return filters.type && (filters.startDate || filters.endDate)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Report Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Report Type"
              options={typeOptions}
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              error={errors?.type}
              disabled={generating}
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              error={errors?.startDate}
              disabled={generating}
            />
            <Input
              label="End Date"
              type="date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              error={errors?.endDate}
              disabled={generating}
            />
          </div>

          {/* Filters Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Additional Filters
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <Select
                label="Order Status"
                options={statusOptions}
                value={filters.status}
                onChange={(e) => handleChange('status', e.target.value)}
                disabled={generating}
              />

              {/* Payment Status Filter */}
              <Select
                label="Payment Status"
                options={paymentStatusOptions}
                value={filters.paymentStatus}
                onChange={(e) => handleChange('paymentStatus', e.target.value)}
                disabled={generating}
              />

              {/* Vehicle Type Filter */}
              <Select
                label="Vehicle Type"
                options={vehicleTypeOptions}
                value={filters.vehicleType}
                onChange={(e) => handleChange('vehicleType', e.target.value)}
                disabled={generating}
              />

              {/* Driver ID Filter */}
              <Input
                label="Driver ID"
                type="text"
                value={filters.driverId}
                onChange={(e) => handleChange('driverId', e.target.value)}
                placeholder="Enter driver ID"
                disabled={generating}
              />

              {/* Customer ID Filter */}
              <Input
                label="Customer ID"
                type="text"
                value={filters.customerId}
                onChange={(e) => handleChange('customerId', e.target.value)}
                placeholder="Enter customer ID"
                disabled={generating}
              />
            </div>
          </div>

          {/* Export Format */}
          <Select
            label="Export Format"
            options={formatOptions}
            value={filters.format}
            onChange={(e) => handleChange('format', e.target.value)}
            error={errors?.format}
            disabled={generating}
          />

          {/* Include Options */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include in Report
            </p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={filters.includeCharts}
                  onChange={(e) => handleChange('includeCharts', e.target.checked)}
                  disabled={generating}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Charts
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={filters.includeSummary}
                  onChange={(e) => handleChange('includeSummary', e.target.checked)}
                  disabled={generating}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Summary
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={filters.includeBreakdown}
                  onChange={(e) => handleChange('includeBreakdown', e.target.checked)}
                  disabled={generating}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Detailed Breakdown
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={generating || !isFormValid()}>
              {generating ? 'Generating...' : 'Generate Report'}
            </Button>

            {generatedReport && (
              <Button
                type="button"
                variant="primary"
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? 'Downloading...' : `Download ${filters.format}`}
              </Button>
            )}
          </div>

          {/* Generated Report Info */}
          {generatedReport && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                ✅ Report generated successfully! Click the download button to save as{' '}
                {filters.format}.
              </p>
              {generatedReport.id && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  Report ID: {generatedReport.id}
                </p>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default ReportGenerator
