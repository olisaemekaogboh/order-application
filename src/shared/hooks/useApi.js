import { useState, useEffect } from 'react'
import axios from 'axios'

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios(url, { ...options, signal: abortController.signal })
        setData(response.data)
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => abortController.abort()
  }, [url])

  return { data, loading, error }
}
