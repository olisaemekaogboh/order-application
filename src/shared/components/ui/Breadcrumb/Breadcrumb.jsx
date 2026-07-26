import React from 'react'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ items = [], separator, className = '' }) => {
  const Separator = separator || (
    <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
  )

  return (
    <nav className={clsx('flex items-center text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center space-x-2">
              {!isLast ? (
                <a
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
              )}
              {!isLast && <span className="text-gray-400 dark:text-gray-500">{Separator}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


export default Breadcrumb