import React, { useState } from 'react'
import clsx from 'clsx'
import { Star } from 'lucide-react'

const Rating = ({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  size = 'md',
  className = '',
}) => {
  const [hover, setHover] = useState(null)

  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      onChange(index + 1)
    }
  }

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < (hover !== null ? hover : value)
        return (
          <button
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => !readOnly && setHover(i + 1)}
            onMouseLeave={() => !readOnly && setHover(null)}
            disabled={readOnly}
            className={clsx(
              'transition-colors focus:outline-none',
              readOnly ? 'cursor-default' : 'cursor-pointer'
            )}
          >
            <Star
              className={clsx(
                sizeMap[size] || sizeMap.md,
                filled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}


export default Rating