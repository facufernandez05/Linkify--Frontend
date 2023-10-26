import axios from 'axios'
import { useEffect, useState } from 'react'
import { Message } from './Message'
import { setupWebSocket } from '../../services/SetupWebSocket'
import { getThreadChatMessages } from '../../api/urlsChat'

export const MessagesChatPanel = ({ messagesContainerRef, myUserId, selectedUser, selectedThreadId, setSelectedUser }) => {
  const [chatMessages, setChatMessages] = useState([])

  // Recuperar mensajes del hilo
  useEffect(() => {
    async function getChatMessages () {
      try {
        if (selectedThreadId) {
          const response = await axios.get(getThreadChatMessages(selectedThreadId))
          setChatMessages(response.data)
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error)
      }
    }
    getChatMessages()
  }, [selectedThreadId])

  // Crear el WebSocket
  useEffect(() => {
    setupWebSocket(selectedThreadId, setChatMessages)

    const newSocket = setupWebSocket()

    return () => {
      if (newSocket && newSocket.readyState === WebSocket.OPEN) {
        newSocket.close()
      }
    }
  }, [selectedThreadId, setChatMessages])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [chatMessages, selectedThreadId])

  return (
    <>
      <header className='flex items-center h-10 my-3 md:ml-6 md:h-20'>
        {/* Boton de retroceder */}
        <button
          className={`lg:hidden text-2xl flex justify-start items-center p-2 ${selectedUser ? 'block' : 'hidden'}`}
          onClick={() => setSelectedUser(false)}
        >
          <i className='transition-transform fa-solid fa-circle-chevron-left hover:scale-110' />
        </button>
        <div className='flex max-lg:ml-4'>
          <img
            src={selectedUser.foto_perfil}
            className='object-cover w-10 h-10 mr-2 transition-transform rounded-full md:w-16 md:h-16'
            alt={`${selectedUser.user.username} profile`}
          />
          <a href={`/profile/${selectedUser.user.username}`} className='flex items-center my-auto text-lg font-semibold'>
            <span className='flex items-center text-xl md:text-2xl'>
              {selectedUser.user.username.charAt(0).toUpperCase() + selectedUser.user.username.slice(1)}
            </span>
          </a>
        </div>
      </header>

      <hr className='border-palette-2'/>

      <main
        ref={messagesContainerRef}
        className='relative flex-col flex-1 w-full h-full overflow-y-auto'>
        {chatMessages &&
          chatMessages.map(message => (
            <Message
              key={message.id}
              message={message}
              myUserId={myUserId} />
          ))}
      </main>
    </>
  )
}

export default MessagesChatPanel
