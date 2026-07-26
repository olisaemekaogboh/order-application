import { useState, useMemo } from 'react'

export const useSearch = (items = [], searchKeys = []) => {
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items
    const lowerQuery = query.toLowerCase()
    return items.filter((item) =>
      searchKeys.some((key) => String(item[key]).toLowerCase().includes(lowerQuery))
    )
  }, [items, query, searchKeys])

  return { query, setQuery, filteredItems }
}
