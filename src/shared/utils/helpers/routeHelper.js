/**
 * Returns the default dashboard route for a given user role.
 *
 * @param {string} role
 * @returns {string}
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case 'CLIENT':
      return '/client/dashboard'

    case 'ADMIN':
      return '/admin/dashboard'

    case 'SUPER_ADMIN':
      return '/super-admin/dashboard'

    default:
      return '/'
  }
}
