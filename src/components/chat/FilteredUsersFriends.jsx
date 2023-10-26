import { useContext } from 'react'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import { useProfileThread } from '../../hooks/useProfileThreads'
import { Skeleton, Spinner } from '@nextui-org/react'
import { LoadingContext } from '../../context/loading'

export function FilteredUsers ({ setSelectedUser, setSelectedThreadId, selectedUser, filteredUsers }) {
  const { threads } = useProfileThread()
  const { myUsername } = useMyProfileData()
  const { loading } = useContext(LoadingContext)

  const handleThread = (user) => {
    setSelectedUser(user)

    const threadId = threads.find(
      (thread) =>
        (thread.first_person === user.user.username &&
                thread.second_person === myUsername) ||
              (thread.first_person === myUsername &&
                thread.second_person === user.user.username)
    )?.id
    setSelectedThreadId(threadId)
  }

  return (
    <section className={`flex-col lg:w-3/12 h-full overflow-auto lg:border-r lg:border-palette-2 ${
        selectedUser ? 'max-lg:hidden' : 'max-lg:block '
        }`}>
      <h2 className='p-3 text-2xl font-semibold'>Amigos</h2>

        <ul className='gap-2'>
          {filteredUsers.map(user => (
            <li
              key={user.user.id}
              onClick={() => handleThread(user)}
              className={`flex items-center cursor-pointer my-1 p-2 gap-2 hover:bg-palette-2 w-full  ${
                  selectedUser === user ? 'bg-palette-2 border-r border-palette-5 hover:bg-palette-4 hover:border-palette-6' : ''
                  }`}>
                    {loading
                      ? <div className='flex items-center w-full gap-4 p-2'>
                          <Skeleton className='object-cover w-12 h-12 rounded-full'/>
                          <Skeleton className='w-3/4 h-3 rounded-lg'/>
                        </div>
                      : <>
                      <img
                        src={user.foto_perfil}
                        className='object-cover w-12 h-12 transition-transform rounded-full'
                        alt={`${user.user.username} profile`}
                        />
                      <span className='text-xl'>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</span>
                    </>
                    }

            </li>
          ))}
        </ul>

     </section>
  )
}
