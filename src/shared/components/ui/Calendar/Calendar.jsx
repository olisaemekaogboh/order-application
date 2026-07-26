import React, { useState } from 'react'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Calendar = ({ selected, onSelect, className = '' }) => {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else setMonth(month - 1)
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else setMonth(month + 1)
  }

  const renderDay = (day) => {
    const date = new Date(year, month, day)
    const isSelected = selected && date.toDateString() === selected.toDateString()
    const isToday = date.toDateString() === new Date().toDateString()

    return (
      <button
        key={day}
        onClick={() => onSelect?.(date)}
        className={clsx(
          'w-10 h-10 rounded-full text-sm font-medium transition',
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : isToday
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        )}
      >
        {day}
      </button>
    )
  }

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <div className={clsx('bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-80', className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-semibold text-gray-900 dark:text-white">
          {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {blanks.map((i) => (
          <div key={`blank-${i}`} className="w-10 h-10" />
        ))}
        {days.map(renderDay)}
      </div>
    </div>
  )
}


export default Calendar