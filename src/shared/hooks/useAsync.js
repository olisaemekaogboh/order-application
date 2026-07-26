import { useState, useCallback } from 'react'

export const useAsync = (asyncFn, immediate = true) => {
  const [status, setStatus] = useState('idle') // idle | pending | success | error
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (...args) => {
      setStatus('pending')
      setError(null)
      try {
        const result = await asyncFn(...args)
        setData(result)
        setStatus('success')
        return result
      } catch (err) {
        setError(err)
        setStatus('error')
        throw err
      }
    },
    [asyncFn]
  )

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error, isLoading: status === 'pending' }
}
