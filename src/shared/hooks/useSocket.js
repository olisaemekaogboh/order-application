import { useEffect, useRef, useState } from 'react'
import WebSocketService from '@/shared/services/websocket/WebSocketService'

export const useSocket = (destination, callback) => {
  const [isConnected, setIsConnected] = useState(false)
  const subscriptionRef = useRef(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const client = WebSocketService.connect()
    if (client?.connected && destination) {
      subscriptionRef.current = WebSocketService.subscribe(destination, (msg) => callbackRef.current?.(msg))
      setIsConnected(true)
    }
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe()
        subscriptionRef.current = null
      }
      setIsConnected(false)
    }
  }, [destination])

  return { isConnected, client: WebSocketService.client }
}