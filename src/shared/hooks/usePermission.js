import { useState, useEffect } from 'react'

export const usePermission = (permissionDescriptor) => {
  const [state, setState] = useState('prompt')

  useEffect(() => {
    if (!navigator.permissions) {
      setState('unsupported')
      return
    }
    let mounted = true
    navigator.permissions
      .query(permissionDescriptor)
      .then((status) => {
        if (mounted) setState(status.state)
        const handler = () => {
          if (mounted) setState(status.state)
        }
        status.addEventListener('change', handler)
        return () => status.removeEventListener('change', handler)
      })
      .catch(() => {
        if (mounted) setState('error')
      })
    return () => {
      mounted = false
    }
  }, [permissionDescriptor])

  return state
}
