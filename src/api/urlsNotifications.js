// Notificaciones

import { BASE_URL } from './baseUrl'

export const acceptNotification = notificationId => {
  return `${BASE_URL}accept_notification/${notificationId}/`
}

export const rejectNotification = notificationId => {
  return `${BASE_URL}reject_notification/${notificationId}/`
}

export const sendNotification = `${BASE_URL}send_notification/`

export const getNotification = `${BASE_URL}get_notification/`

export const getAllNotifications = `${BASE_URL}get_all_notification/`
