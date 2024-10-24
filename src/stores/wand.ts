/* eslint-disable @typescript-eslint/no-unused-expressions */
import { defineStore } from 'pinia'

const serverUrl = 'wss://onlywands.com/client=DunkOrSlam'
const ws = new WebSocket(serverUrl)

ws.onopen = () => {
  console.log('Connected to the WebSocket server')
  // You can send messages to the server here
  ws.send('Hello Server!')
}

ws.onmessage = event => {
  console.log('Received message from server:', event.data)
}

ws.onerror = error => {
  console.error('WebSocket error:', error)
}

ws.onclose = () => {
  console.log('Disconnected from the WebSocket server')
}

export const useWandStore = defineStore('wand', () => {
  state: () => {
    return {
      ws,
    }
  }
})
