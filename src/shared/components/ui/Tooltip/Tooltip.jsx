import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [show, setShow] = useState(false)
  const ref = useRef()

  const posClass =
    {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }[position] || 'bottom-full left-1/2 -translate-x-1/2 mb-2'

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={clsx(
            'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg whitespace-nowrap',
            posClass,
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}


export default Tooltip