import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { Search, Command, X } from 'lucide-react'

const CommandPalette = ({ isOpen, onClose, commands = [], className = '' }) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowDown')
        setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1))
      if (e.key === 'ArrowUp') setSelectedIndex((i) => Math.max(i - 1, 0))
      if (e.key === 'Enter') {
        const cmd = filteredCommands[selectedIndex]
        if (cmd) {
          cmd.action?.()
          onClose?.()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands, onClose])

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />
      <div
        className={clsx(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-xl overflow-hidden',
          className
        )}
      >
        <div className="flex items-center gap-3 px-4 border-b dark:border-gray-700">
          <Search size={18} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
          <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
            ⌘K
          </kbd>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>
        <div className="py-2 max-h-80 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
              No commands found
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id || idx}
                onClick={() => {
                  cmd.action?.()
                  onClose?.()
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2 text-left transition',
                  selectedIndex === idx
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                )}
              >
                {cmd.icon && <span className="text-gray-500 dark:text-gray-400">{cmd.icon}</span>}
                <span className="text-gray-900 dark:text-white">{cmd.label}</span>
                {cmd.shortcut && (
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                    {cmd.shortcut}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}


export default CommandPalette