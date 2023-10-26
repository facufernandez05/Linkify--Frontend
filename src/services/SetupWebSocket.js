import { URL_PORT } from '../api/baseUrl'

export function setupWebSocket (selectedThreadId, setChatMessages) {
  try {
    if (selectedThreadId) {
      const socket = new WebSocket(`ws://${URL_PORT}/chat/${selectedThreadId}/`)

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const message = data.message
        const sent_by = data.user
        const thread = data.thread
        const date = data.timestamp

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { message, user: sent_by, thread, timestamp: date }
        ])
      }

      return socket
    }
  } catch (error) {
    console.error('Error establishing WebSocket:', error)
  }
}
