'use server'

import axios from 'axios'
import { acceptNotification, rejectNotification } from '../../api/urlsNotifications'

export const NotificationCard = ({ notifications, setNotifications }) => {
  const handleAccept = async (notificationId) => {
    try {
      const token = window.localStorage.getItem('token')
      await axios.post(acceptNotification(notificationId), null, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId))
    } catch (error) {
      console.error('Error al crear el hilo:', error)
    }
  }

  const handleReject = async (notificationId) => {
    try {
      const token = window.localStorage.getItem('token')
      await axios.delete(rejectNotification(notificationId), {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId))
    } catch (error) {
      console.error('Error al rechazar la notificación:', error)
    }
  }

  return (
    <>
      {
        notifications.map((notification) => (
          <div className='relative flex items-center w-1/2 p-4 mx-auto my-6 text-white transition-all cursor-pointer bg-palette-4 rounded-xl hover:scale-110' key={notification.id}>

            <a
              href={`profile/${notification.senderUsername}`}
              className='flex items-center group'
            >
              <img
                src={notification.senderFotoPerfil}
                className='relative object-cover rounded-full md:h-20 md:w-20'
                alt='Foto de perfil'
              />

              <span
                className='relative ml-4 text-xl group-hover:underline group-hover:underline-offset-1'
              >
                {notification.senderUsername.charAt(0).toUpperCase() + notification.senderUsername.slice(1)}
              </span>

            </a>

            <section className='relative flex ml-auto'>
              <div className='p-2'>
                <button
                  onClick={() => handleAccept(notification.id)}
                  className='group relative mx-1.5 mb-0 font-bold border-none'
                >
                  <i className='text-3xl text-blue-600 transition-all fa-regular fa-heart group-hover:hidden group-hover:scale-125' />

                  <i className='hidden text-3xl text-blue-800 transition-all fa-solid fa-heart group-hover:block group-hover:scale-125' />
                </button>
              </div>

              <div className='p-2'>
                <button onClick={() => handleReject(notification.id)} className='group relative mx-1.5 mb-0 font-bold border-none text-3xl text-red-600 hover:text-red-800'>
                  <i className='transition-all fa-solid fa-x group-hover:scale-125' />
                </button>
              </div>
            </section>

          </div>
        ))
      }
    </>
  )
}
