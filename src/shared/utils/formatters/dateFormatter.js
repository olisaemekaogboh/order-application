import { format, formatDistanceToNow, parseISO } from 'date-fns'

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return 'N/A'
  const parsed = typeof date === 'string' ? parseISO(date) : date
  return format(parsed, formatStr)
}

export const formatDateRelative = (date) => {
  if (!date) return 'N/A'
  const parsed = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(parsed, { addSuffix: true })
}

export const formatDateShort = (date) => {
  if (!date) return 'N/A'
  const parsed = typeof date === 'string' ? parseISO(date) : date
  return format(parsed, 'MMM d, yyyy')
}

export const formatDateLong = (date) => {
  if (!date) return 'N/A'
  const parsed = typeof date === 'string' ? parseISO(date) : date
  return format(parsed, 'EEEE, MMMM d, yyyy')
}
