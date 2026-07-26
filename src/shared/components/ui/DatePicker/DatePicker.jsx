import React, { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '../Calendar/Calendar'
import { format } from 'date-fns'

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (date) => {
    onChange?.(date)
    setIsOpen(false)
  }

  return (
    <div ref={wrapperRef} className={clsx('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500 transition"
        {...props}
      >
        <span className="truncate">{value ? format(value, 'PPP') : placeholder}</span>
        <CalendarIcon size={18} className="text-gray-400 flex-shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 left-0">
          <Calendar selected={value} onSelect={handleSelect} />
        </div>
      )}
    </div>
  )
}


export default DatePicker