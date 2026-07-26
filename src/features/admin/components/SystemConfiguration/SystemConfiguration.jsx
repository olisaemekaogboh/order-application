import React, { useState, useEffect } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import Input from '@/shared/components/ui/Input/Input'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

const SystemConfiguration = () => {
  const [configs, setConfigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingKey, setEditingKey] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    setConfigs([
      { key: 'app.name', value: 'Logistics Pro', category: 'general' },
      { key: 'app.currency', value: 'NGN', category: 'general' },
      { key: 'app.timezone', value: 'Africa/Lagos', category: 'general' },
      { key: 'order.min_distance', value: '1', category: 'order' },
      { key: 'order.max_distance', value: '1000', category: 'order' },
      { key: 'driver.rating_threshold', value: '3.5', category: 'driver' },
    ])
    setLoading(false)
  }, [])

  const handleEdit = (key, value) => {
    setEditingKey(key)
    setEditValue(value)
  }

  const handleSave = async (key) => {
    setSaving(true)
    try {
      // TODO: Replace with actual API call
      setConfigs((prev) => prev.map((c) => (c.key === key ? { ...c, value: editValue } : c)))
      toast.success('Configuration updated')
      setEditingKey(null)
    } catch (error) {
      toast.error('Failed to update configuration')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditingKey(null)
    setEditValue('')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        System Configuration
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {configs.map((config) => (
              <div
                key={config.key}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{config.key}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Category: {config.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {editingKey === config.key ? (
                    <>
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-48"
                        disabled={saving}
                      />
                      <Button size="sm" onClick={() => handleSave(config.key)} disabled={saving}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel} disabled={saving}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-900 dark:text-white">{config.value}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(config.key, config.value)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemConfiguration
