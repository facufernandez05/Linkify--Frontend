import axios from 'axios'
import { useState } from 'react'
import { createChatMessage } from '../../api/urlsChat'
import { Button, Input } from '@nextui-org/react'

export const ChatForm = ({ myUserId, selectedThreadId }) => {
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (message.trim() !== '') {
      setIsSubmitting(true)
      try {
        const messageData = {
          thread: selectedThreadId,
          user: myUserId,
          message
        }

        const response = await axios.post(
          createChatMessage,
          messageData
        )

        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            message: response.data.message,
            sent_by: response.data.user,
            thread_id: selectedThreadId
          }
        ])

        setMessage('')
      } catch (error) {
        console.error('Error al enviar el mensaje:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <form className='flex items-center w-full gap-1' onSubmit={handleSubmit} disabled={isSubmitting}>
      <Input
      variant='bordered'
      color='primary'
      type='text'
      placeholder='Agregar comentario'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      classNames={styles}
      />
      <Button isIconOnly className='p-0 rounded-l-none' type='submit' disabled={isSubmitting} >
        <i className='text-palette-blue fa-solid fa-paper-plane group-hover:text-blue-600' />
      </Button>
    </form>
  )
}

const styles = {
  inputWrapper: [
    'rounded-r-none'
  ]
}
