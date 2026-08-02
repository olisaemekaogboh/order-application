import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'

// Helper to parse date from various formats including arrays
const parseDate = (date) => {
  if (!date) return null

  // If it's an array like [year, month, day, hour, minute, second]
  if (Array.isArray(date)) {
    const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = date
    // month is 0-indexed in JavaScript Date, so subtract 1
    return new Date(year, month - 1, day, hour, minute, second, millisecond)
  }

  // If it's a string, try to parse as ISO
  if (typeof date === 'string') {
    try {
      return parseISO(date)
    } catch {
      return new Date(date)
    }
  }

  // If it's a number (timestamp)
  if (typeof date === 'number') {
    return new Date(date)
  }

  // If it's already a Date object
  if (date instanceof Date) {
    return date
  }

  // If it's an object with date properties
  if (typeof date === 'object' && date !== null) {
    if (date.year !== undefined && date.month !== undefined) {
      return new Date(date.year, date.month - 1, date.day || 1)
    }
  }

  // Try to convert to date
  try {
    return new Date(date)
  } catch {
    return null
  }
}

export const formatDate = (date, formatStr = 'PPP') => {
  if (!date) return 'N/A'

  try {
    const parsed = parseDate(date)

    if (!parsed || !isValid(parsed)) {
      console.warn(`Invalid date value: ${JSON.stringify(date)}`)
      return 'Invalid Date'
    }

    return format(parsed, formatStr)
  } catch (error) {
    console.warn(`Error formatting date: ${JSON.stringify(date)}`, error)
    return 'Invalid Date'
  }
}

export const formatDateRelative = (date) => {
  if (!date) return 'N/A'

  try {
    const parsed = parseDate(date)

    if (!parsed || !isValid(parsed)) {
      console.warn(`Invalid date value for relative format: ${JSON.stringify(date)}`)
      return 'Invalid Date'
    }

    return formatDistanceToNow(parsed, { addSuffix: true })
  } catch (error) {
    console.warn(`Error formatting relative date: ${JSON.stringify(date)}`, error)
    return 'Invalid Date'
  }
}

export const formatDateShort = (date) => {
  if (!date) return 'N/A'

  try {
    const parsed = parseDate(date)

    if (!parsed || !isValid(parsed)) {
      console.warn(`Invalid date value for short format: ${JSON.stringify(date)}`)
      return 'Invalid Date'
    }

    return format(parsed, 'MMM d, yyyy')
  } catch (error) {
    console.warn(`Error formatting short date: ${JSON.stringify(date)}`, error)
    return 'Invalid Date'
  }
}

export const formatDateLong = (date) => {
  if (!date) return 'N/A'

  try {
    const parsed = parseDate(date)

    if (!parsed || !isValid(parsed)) {
      console.warn(`Invalid date value for long format: ${JSON.stringify(date)}`)
      return 'Invalid Date'
    }

    return format(parsed, 'EEEE, MMMM d, yyyy')
  } catch (error) {
    console.warn(`Error formatting long date: ${JSON.stringify(date)}`, error)
    return 'Invalid Date'
  }
}

export const safeFormatDate = (date, fallback = 'N/A') => {
  if (!date) return fallback

  try {
    const parsed = parseDate(date)

    if (!parsed || !isValid(parsed)) {
      return fallback
    }

    return format(parsed, 'PPP')
  } catch {
    return fallback
  }
}
