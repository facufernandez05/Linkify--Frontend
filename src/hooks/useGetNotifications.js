import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAllNotifications, getNotification } from '../api/urlsNotifications'

export function useGetNotifications () {
  const [notification, setNotification] = useState([])
  const [allNotifications, setAllNotifications] = useState([])

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token = window.localStorage.getItem('token')
        const response = await axios.get(getNotification, {
          headers: {
            Authorization: `Token ${token}`

          }
        })
        const responseAll = await axios.get(getAllNotifications, {
          headers: {
            Authorization: `Token ${token}`

          }
        })

        setAllNotifications(responseAll.data)
        setNotification(response.data)
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error)
      }
    }
    getNotifications()
  }, [])

  return { notification, allNotifications }
}
