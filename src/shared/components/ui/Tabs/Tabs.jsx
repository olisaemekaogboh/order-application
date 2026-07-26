import React, { useState } from 'react'
import clsx from 'clsx'

const Tabs = ({ tabs = [], defaultTab = 0, onChange, className = '' }) => {
  const [active, setActive] = useState(defaultTab)

  const handleChange = (index) => {
    setActive(index)
    onChange?.(index)
  }

  return (
    <div className={className}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleChange(idx)}
              className={clsx(
                'py-2 px-4 text-sm font-medium border-b-2 transition',
                active === idx
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">{tabs[active]?.content}</div>
    </div>
  )
}


export default Tabs