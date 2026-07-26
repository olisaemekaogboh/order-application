import React from 'react'
import { useSettings } from '../../hooks/useSettings'
import Switch from '@/shared/components/ui/Switch/Switch'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'

export const NotificationPreferences = () => {
  const { notificationSettings, updateNotificationSettings, loading } = useSettings()

  const handleToggle = (key) => {
    updateNotificationSettings({ [key]: !notificationSettings[key] })
  }

  const preferences = [
    { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
    { key: 'sms', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
    {
      key: 'push',
      label: 'Push Notifications',
      description: 'Receive push notifications on your devices',
    },
    {
      key: 'orderUpdates',
      label: 'Order Updates',
      description: 'Get notified about order status changes',
    },
    {
      key: 'promotions',
      label: 'Promotions & Offers',
      description: 'Receive promotional offers and discounts',
    },
    {
      key: 'system',
      label: 'System Alerts',
      description: 'Receive system maintenance and important alerts',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {preferences.map((pref) => (
            <div
              key={pref.key}
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{pref.description}</p>
              </div>
              <Switch
                checked={
                  notificationSettings[pref.key] !== undefined
                    ? notificationSettings[pref.key]
                    : true
                }
                onChange={() => handleToggle(pref.key)}
                disabled={loading}
              />
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => {
                // Reset to defaults
                const defaults = {
                  email: true,
                  sms: true,
                  push: true,
                  orderUpdates: true,
                  promotions: false,
                  system: true,
                }
                updateNotificationSettings(defaults)
              }}
              disabled={loading}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default NotificationPreferences
