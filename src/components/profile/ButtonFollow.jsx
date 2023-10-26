import axios from 'axios'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import { useGetThreadExistsData } from '../../hooks/useGetThreadExistsData'
import { getAllNotifications, rejectNotification, sendNotification } from '../../api/urlsNotifications'
import { deleteThread } from '../../api/urlsChat'
import { Button, Modal, useDisclosure } from '@nextui-org/react'
import EditProfile from './EditProfile'

export function ButtonFollow ({ username }) {
  const { myUsername, myUserId } = useMyProfileData()
  const { user, setHasSentNotification, setCurrentThread, hasSentNotification, currentThread } = useGetThreadExistsData()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleFollow = async () => {
    try {
      const token = window.localStorage.getItem('token')
      await axios.post(sendNotification, {
        receiver: username
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      }
      )
      setHasSentNotification(true)
    } catch (error) {
      console.error('Error al enviar la notificación:', error)
    }
  }

  const handleUnfollow = async () => {
    try {
      const token = window.localStorage.getItem('token')

      if (currentThread) {
        const threadId = currentThread.id
        await axios.delete(deleteThread(threadId), {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        setCurrentThread(null)
      }
    } catch (error) {
      console.error('Error al eliminar la notificación:', error)
    }
  }

  const handleRejectNotification = async () => {
    try {
      const token = window.localStorage.getItem('token')
      const response = await axios.get(getAllNotifications, {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      const notificationId = response.data.find(
        (notification) =>
          (notification.sender === myUserId && notification.receiver === user?.user?.id) ||
          (notification.sender === user?.user?.id && notification.receiver === myUserId)
      )?.id

      await axios.delete(rejectNotification(notificationId), {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      setHasSentNotification(null)
    } catch (error) {
      console.error('Error al eliminar la notificación:', error)
    }
  }

  return (
    <>
    {myUsername && (
        <>
        {myUsername === username
          ? (
          <>
            <Button
              onPress={onOpen}
              className='font-bold btns-profile'
            >
              Editar Perfil
            </Button>
            <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className='rounded-lg bg-palette-3'>
              <EditProfile />
            </Modal>
          </>
            )
          : currentThread
            ? (
              <button
                onClick={handleUnfollow}
                className='transition-all btns-profile group hover:bg-red-950 hover:text-red-600 hover:opacity-100 hover:border-red-600'
              >
                <span className='group-hover:hidden'>Siguiendo</span>
                <span className='hidden group-hover:block'>Dejar de seguir</span>
              </button>
              )
            : hasSentNotification
              ? (
                <button
                  className='transition-all btns-profile group hover:bg-red-950 hover:text-red-600 hover:opacity-100 hover:border-red-600'
                  onClick={handleRejectNotification}
                >
                  <span className='group-hover:hidden'>Solicitud enviada</span>
                  <span className='hidden group-hover:block'>Cancelar Solicitud</span>
                </button>
                )
              : (
                <button
                  onClick={handleFollow}
                  className='btns-profile'
                >
                  <span>Seguir</span>
                </button>
                )}
              </>
    )

            }
        </>
  )
}
