import { useState, useEffect } from 'react'

export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn('Error saving to sessionStorage', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
