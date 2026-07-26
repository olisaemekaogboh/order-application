import React, { useState } from 'react'
import clsx from 'clsx'
import { Search, X } from 'lucide-react'

const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e) => {
    const val = e.target.value
    setLocalValue(val)
    onChange?.(val)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange?.('')
    onSearch?.('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(localValue)
    }
  }

  return (
    <div className={clsx('relative', className)}>
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}


export default SearchBar