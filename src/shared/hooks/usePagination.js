import { useState, useMemo } from 'react'

export const usePagination = (totalItems, itemsPerPage = 10, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return (items) => items.slice(start, end)
  }, [currentPage, itemsPerPage])

  const goToPage = (page) => {
    const pageNumber = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(pageNumber)
  }

  const next = () => goToPage(currentPage + 1)
  const prev = () => goToPage(currentPage - 1)

  return {
    currentPage,
    totalPages,
    goToPage,
    next,
    prev,
    paginatedItems,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  }
}
