export const formatClientName = (firstName, lastName) => {
  if (!firstName && !lastName) return 'User'
  return `${firstName || ''} ${lastName || ''}`.trim()
}
