import { Suspense, lazy, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { useProfileThread } from '../hooks/useProfileThreads'
import { useMyProfileData } from '../hooks/useMyProfileData'
import { ChatForm } from '../components/chat/ChatForm'
import { FilteredUsers } from '../components/chat/FilteredUsersFriends'
import { getUserByUsername } from '../api/urlsUsers'
import { BASE_BACKEND_URL } from '../api/baseUrl'
import { Spinner } from '@nextui-org/react'
import { LoadingContext } from '../context/loading'

const MessagesChatPanel = lazy(() => import('../components/chat/MessagesChatPanel'))

export function ChatPage () {
  const { threads } = useProfileThread()
  const { myUserData } = useMyProfileData()
  const { loading, setLoading } = useContext(LoadingContext)

  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedThreadId, setSelectedThreadId] = useState(null)

  const messagesContainerRef = useRef(null)

  const myUsername = myUserData?.user?.username
  const myUserId = myUserData?.user?.id

  useEffect(() => {
    const getFilteredUsers = async () => {
      setLoading(true)
      if (myUsername && threads) {
        const usersWithThreadIds = threads.reduce((users, thread) => {
          const { first_person, second_person } = thread
          if (first_person !== myUsername) users.push(first_person)
          if (second_person !== myUsername) users.push(second_person)
          return users
        }, [])

        const filteredUsersIds = usersWithThreadIds.filter(
          (userId) => userId !== myUserId
        )

        const detailedUsers = await Promise.all(
          filteredUsersIds.map(async (userId) => {
            const response = await axios.get(
              getUserByUsername(userId)
            )
            const modifiedUser = { ...response.data }
            modifiedUser.foto_perfil = `${BASE_BACKEND_URL}${modifiedUser.foto_perfil}`
            return modifiedUser
          })
        )
        setFilteredUsers(detailedUsers)
      }
    }
    getFilteredUsers()
    setLoading(false)
  }, [myUserId, threads, myUsername])

  return (
    <div className='flex w-full h-full max-md:px-2 lg:h-full lg:w-full max-lg:flex-col'>

      {/* Panel amigos */}
      {filteredUsers.length > 0
        ? <FilteredUsers
      selectedUser={selectedUser}
      setSelectedThreadId={setSelectedThreadId}
      setSelectedUser={setSelectedUser}
      filteredUsers={filteredUsers}
      />
        : <>
        {loading
          ? <Spinner className='w-full mt-4' />
          : <div className='flex justify-center w-full pt-10 text-xl font-semibold'>
            <h2 className='opacity-40'>Haz amigos para poder chatear con ellos</h2><span>🤝</span>
          </div>
      }
        </>
      }

      {/* Panel del chat */}
      {selectedUser &&
        (
        <section className='relative flex flex-col w-full h-full lg:w-9/12 rounded-xl'>

          <Suspense fallback={<Spinner />} className='h-full'>
            <MessagesChatPanel
              messagesContainerRef={messagesContainerRef}
              myUserId={myUserId}
              selectedThreadId={selectedThreadId}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}/>
          </Suspense>

          <footer className='flex items-center justify-center w-full p-4'>
            <ChatForm myUserId={myUserId} selectedThreadId={selectedThreadId} />
          </footer>
        </section>
        )
        }

    </div>
  )
}

export default ChatPage
