import axios from 'axios'
import { useGetNotifications } from '../hooks/useGetNotifications'
import { useEffect, useState } from 'react'
import { NotificationCard } from '../components/notifications/NotificationCard'
import { userDataGet } from '../api/urlsUsers'

export const NotificationsPage = () => {
  const { notification } = useGetNotifications()
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    async function getNotifications () {
      try {
        const senderData = await Promise.all(notification.map(async (notification) => {
          const senderId = notification.sender

          const senderResponse = await axios.get(userDataGet(senderId))
          const senderFotoPerfil = senderResponse.data.foto_perfil
          const senderUsername = senderResponse.data.user.username

          return {
            ...notification,
            senderUsername,
            senderFotoPerfil
          }
        }))

        setNotifications(senderData)
      } catch (error) {
        console.error('Error al obtener las notificaciones', error)
      }
    }
    getNotifications()
  }, [notification])

  return (
    <>
      {notifications.length !== 0
        ? (
          <div className='relative flex flex-col w-full h-full'>
            <h2 className='relative p-4 text-3xl font-bold text-white'>Solicitudes de amistad</h2>
            <NotificationCard notifications={notifications} setNotifications={setNotifications} />
          </div>
          )
        : (
          <div>
            <h2 className='mt-6 text-xl font-semibold text-center text-white'>No tienes solicitudes de amistad pendientes.</h2>
          </div>
          )}
    </>
  )
}

export default NotificationsPage
