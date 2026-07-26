import React, { useState } from 'react'
import { useReports } from '../../hooks/useReports'
import Select from '@/shared/components/ui/Select/Select'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'

export const ReportGenerator = () => {
  const { generateReport, generating, errors } = useReports()
  const [filters, setFilters] = useState({
    type: '',
    period: '',
    startDate: '',
    endDate: '',
    format: 'PDF',
    includeCharts: true,
    includeSummary: true,
    includeBreakdown: false,
  })

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const typeOptions = [
    { value: 'REVENUE', label: 'Revenue Report' },
    { value: 'ORDERS', label: 'Orders Report' },
    { value: 'DRIVERS', label: 'Drivers Report' },
    { value: 'CUSTOMERS', label: 'Customers Report' },
  ]

  const periodOptions = [
    { value: 'TODAY', label: 'Today' },
    { value: 'WEEK', label: 'This Week' },
    { value: 'MONTH', label: 'This Month' },
    { value: 'QUARTER', label: 'This Quarter' },
    { value: 'YEAR', label: 'This Year' },
    { value: 'CUSTOM', label: 'Custom Range' },
  ]

  const formatOptions = [
    { value: 'PDF', label: 'PDF' },
    { value: 'CSV', label: 'CSV' },
    { value: 'EXCEL', label: 'Excel' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    await generateReport(filters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Report Type"
              options={typeOptions}
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              error={errors?.type}
              disabled={generating}
            />
            <Select
              label="Period"
              options={periodOptions}
              value={filters.period}
              onChange={(e) => handleChange('period', e.target.value)}
              error={errors?.period}
              disabled={generating}
            />
          </div>

          {filters.period === 'CUSTOM' && (
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
          )}

          <Select
            label="Export Format"
            options={formatOptions}
            value={filters.format}
            onChange={(e) => handleChange('format', e.target.value)}
            error={errors?.format}
            disabled={generating}
          />

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

          <div className="flex justify-end">
            <Button type="submit" disabled={generating}>
              {generating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReportGenerator
