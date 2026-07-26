import React, { useState } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

const Accordion = ({ items = [], defaultOpen = null, className = '' }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
            <ChevronDown
              size={18}
              className={clsx(
                'transition-transform text-gray-500 dark:text-gray-400',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


export default Accordion