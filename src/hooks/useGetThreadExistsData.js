import { useEffect, useState } from 'react'
import { useProfileThread } from './useProfileThreads'
import { useParams } from 'react-router-dom'
import { useMyProfileData } from './useMyProfileData'
import { useGetNotifications } from './useGetNotifications'
import axios from 'axios'
import { getAllUsers } from '../api/urlsUsers'

export function useGetThreadExistsData () {
  const { username } = useParams()
  const { threads } = useProfileThread()
  const { myUserId, myUsername } = useMyProfileData()
  const { notification, allNotifications } = useGetNotifications()

  const [userData, setUserData] = useState([])
  const [hasSentNotification, setHasSentNotification] = useState(null)
  const [currentThread, setCurrentThread] = useState(null)

  const user = userData.find((user) => user.user.username === username)

  useEffect(() => {
    async function fetchUserData () {
      try {
        const response = await axios.get(getAllUsers)
        setUserData(response.data)

        // Obtener si existe hilo entre mi usuario y el de la pagina
        const currentThreadData = threads.find((thread) => {
          const { first_person, second_person } = thread
          return (
            (first_person === myUsername &&
              second_person === username) ||
            (first_person === username &&
              second_person === myUsername)
          )
        })
        setCurrentThread(currentThreadData)

        // Obtener si existe notificacion entre mi usuario y el de la pagina
        const currentNotificationData = allNotifications.find((notification) => {
          const { sender, receiver } = notification
          return (
            (sender === myUserId && receiver === user?.user?.id) ||
            (sender === user?.user?.id && receiver === myUserId)
          )
        })
        setHasSentNotification(currentNotificationData)
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    }
    fetchUserData()

    // eslint-disable-next-line
  }, [myUsername, threads, username, myUserId, notification])

  return { hasSentNotification, currentThread, userData, user, setHasSentNotification, setCurrentThread }
}
