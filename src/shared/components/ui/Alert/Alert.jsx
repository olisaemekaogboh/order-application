import React from 'react'
import clsx from 'clsx'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

const variantMap = {
  info: {
    icon: Info,
    classes:
      'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300',
  },
  success: {
    icon: CheckCircle,
    classes:
      'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300',
  },
  warning: {
    icon: AlertTriangle,
    classes:
      'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300',
  },
  error: {
    icon: AlertCircle,
    classes:
      'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300',
  },
}

const Alert = ({ variant = 'info', title, children, onClose, className = '', ...props }) => {
  const Icon = variantMap[variant]?.icon || Info
  const variantClass = variantMap[variant]?.classes || variantMap.info.classes

  return (
    <div
      className={clsx('border rounded-lg p-4 flex items-start gap-3', variantClass, className)}
      {...props}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <h4 className="font-semibold">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}


export default Alert