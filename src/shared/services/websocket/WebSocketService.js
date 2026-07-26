import { Client } from '@stomp/stompjs'

class WebSocketService {
  constructor() {
    this.client = null
    this.connected = false
    this.subscriptions = new Map()
  }

  connect() {
    if (this.client?.active) return this.client
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {},
    })
    this.client.onConnect = () => {
      this.connected = true
    }
    this.client.onDisconnect = () => {
      this.connected = false
    }
    this.client.activate()
    return this.client
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate()
      this.client = null
      this.connected = false
      this.subscriptions.clear()
    }
  }

  subscribe(destination, callback) {
    if (!this.client?.connected) return null
    if (this.subscriptions.has(destination)) return this.subscriptions.get(destination)
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        callback(JSON.parse(message.body))
      } catch {
        callback(message.body)
      }
    })
    this.subscriptions.set(destination, subscription)
    return subscription
  }

  unsubscribe(destination) {
    const sub = this.subscriptions.get(destination)
    if (sub) {
      sub.unsubscribe()
      this.subscriptions.delete(destination)
    }
  }

  send(destination, body) {
    if (!this.client?.connected) return
    this.client.publish({ destination, body: JSON.stringify(body) })
  }
}

export default new WebSocketService()
