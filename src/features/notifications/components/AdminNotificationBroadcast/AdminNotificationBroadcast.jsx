// features/notifications/components/AdminNotificationBroadcast/AdminNotificationBroadcast.jsx
import React, { useState } from 'react'
import { Send, Users, AlertCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { notificationService } from '../../services/notificationService'

const AdminNotificationBroadcast = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'SYSTEM',
    recipientRole: '',
    priority: 'NORMAL',
  })

  const notificationTypes = [
    { value: 'SYSTEM', label: 'System' },
    { value: 'ORDER_UPDATE', label: 'Order Update' },
    { value: 'PAYMENT', label: 'Payment' },
    { value: 'PROMOTION', label: 'Promotion' },
    { value: 'ALERT', label: 'Alert' },
    { value: 'REMINDER', label: 'Reminder' },
    { value: 'DRIVER_ASSIGNED', label: 'Driver Assigned' },
    { value: 'DELIVERY_CONFIRMED', label: 'Delivery Confirmed' },
  ]

  const roles = [
    { value: '', label: 'All Users' },
    { value: 'CLIENT', label: 'Clients Only' },
    { value: 'ADMIN', label: 'Admins Only' },
    { value: 'SUPER_ADMIN', label: 'Super Admins Only' },
    { value: 'DRIVER', label: 'Drivers Only' },
  ]

  const priorities = [
    { value: 'LOW', label: 'Low' },
    { value: 'NORMAL', label: 'Normal' },
    { value: 'HIGH', label: 'High' },
    { value: 'URGENT', label: 'Urgent' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Prepare payload - recipientRole null means all users
      const payload = {
        title: formData.title.trim(),
        message: formData.message.trim(),
        type: formData.type,
        recipientRole: formData.recipientRole || null,
      }

      await notificationService.broadcastNotification(payload)

      const roleLabel = formData.recipientRole
        ? roles.find((r) => r.value === formData.recipientRole)?.label
        : 'all users'

      toast.success(`Broadcast sent successfully to ${roleLabel}`)

      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'SYSTEM',
        recipientRole: '',
        priority: 'NORMAL',
      })
      setIsOpen(false)
    } catch (error) {
      console.error('Broadcast failed:', error)
      toast.error(error.response?.data?.message || 'Failed to send broadcast')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
      >
        <Send size={18} className="mr-2" />
        Broadcast Notification
      </button>

      {isOpen && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Send Broadcast Notification
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notification title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Recipient Role
                </label>
                <select
                  name="recipientRole"
                  value={formData.recipientRole}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notification Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {notificationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter notification message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                required
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.message.length} characters
              </p>
            </div>

            {!formData.recipientRole && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertCircle
                  size={18}
                  className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  This will send the notification to <strong>all users</strong> across all roles.
                  Please ensure this message is appropriate for everyone.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Broadcast
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminNotificationBroadcast
