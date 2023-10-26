// Chat

import { BASE_URL } from './baseUrl'

export const getThreadChatMessages = selectedThreadId => {
  return `${BASE_URL}messages/?thread=${selectedThreadId}`
}

export const deleteThread = id => {
  return `${BASE_URL}threads/${id}`
}

export const getThreads = `${BASE_URL}threads/`

export const createChatMessage = `${BASE_URL}send_message/`
