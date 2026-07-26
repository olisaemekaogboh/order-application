import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

const Toast = ({ message, type = 'info', duration = 5000, onClose, className = '' }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const typeClass =
    {
      info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
      success: 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700',
      warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
      error: 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    }[type] || 'bg-gray-50 dark:bg-gray-800'

  return (
    <div
      className={clsx(
        'border rounded-lg p-4 shadow-lg flex items-start gap-3',
        typeClass,
        className
      )}
    >
      <div className="flex-1 text-gray-800 dark:text-gray-200">{message}</div>
      <button
        onClick={() => {
          setVisible(false)
          onClose?.()
        }}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <X size={18} />
      </button>
    </div>
  )
}


export default Toast