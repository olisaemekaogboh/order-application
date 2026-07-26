import React, { useEffect } from 'react'
import { useSettings } from '../../hooks/useSettings'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import Button from '@/shared/components/ui/Button/Button'

// Helper functions (could be moved to utils)
const formatDeviceName = (device) => {
  return device.name || device.deviceName || 'Unknown Device'
}

const formatLastActive = (lastActive) => {
  if (!lastActive) return 'Never'
  const diff = Date.now() - new Date(lastActive).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

export const DevicesSettings = () => {
  const { devices, loading, revokeDevice, fetchDevices } = useSettings()

  useEffect(() => {
    fetchDevices?.()
  }, [fetchDevices])

  const handleRevoke = async (deviceId, deviceName) => {
    if (window.confirm(`Are you sure you want to revoke access for "${deviceName}"?`)) {
      await revokeDevice(deviceId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Management</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
          </div>
        ) : devices.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No devices found</p>
        ) : (
          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDeviceName(device)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last active: {formatLastActive(device.lastActive)}
                  </p>
                </div>
                {!device.current && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleRevoke(device.id, device.name)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DevicesSettings
