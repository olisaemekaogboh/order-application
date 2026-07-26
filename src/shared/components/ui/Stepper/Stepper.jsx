import React from 'react'
import clsx from 'clsx'
import { Check } from 'lucide-react'

const Stepper = ({
  steps = [],
  currentStep = 0,
  orientation = 'horizontal',
  className = '',
}) => {
  const isVertical = orientation === 'vertical'

  return (
    <div className={clsx('flex', isVertical ? 'flex-col gap-4' : 'items-center', className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div className={clsx('flex items-center gap-3', isVertical ? 'w-full' : '')}>
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition',
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-800'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}
                >
                  {isCompleted ? <Check size={16} /> : index + 1}
                </div>
                <div>
                  <p
                    className={clsx(
                      'text-sm font-medium',
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">{step.description}</p>
                  )}
                </div>
              </div>
            </div>
            {!isLast && (
              <div
                className={clsx(
                  isVertical
                    ? 'w-px h-6 ml-4 bg-gray-200 dark:bg-gray-700'
                    : 'flex-1 h-px mx-2 bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}


export default Stepper