'use server'

import { Link, useParams } from 'react-router-dom'
import { useProfileThread } from '../hooks/useProfileThreads'
import { useGetUserPosts } from '../hooks/useGetUserPosts'
import { useGetThreadExistsData } from '../hooks/useGetThreadExistsData'
import { ButtonFollow } from '../components/profile/ButtonFollow'
import { BASE_BACKEND_URL } from '../api/baseUrl'

export function ProfilePage () {
  const { threads } = useProfileThread()
  const { username } = useParams()
  const { userData, user } = useGetThreadExistsData()

  const { userPosts } = useGetUserPosts(user)

  return (
    <div className='flex-col h-screen md:w-full md:h-full md:flex md:rounded-r-2xl'>
      {userData
        ? (
          <header className='box-border relative p-5 flex items-center md:mx-auto break-all md:min-h-1/4 md:gap-5 md:w-full border-b-2 border-[#4d4d4d]'>

            <section className='flex flex-col'>

              <img
                src={user && user.foto_perfil}
                className='flex object-cover w-20 h-20 rounded-full md:h-36 md:w-36'
                alt='Foto de perfil'
              />

            </section>

            <div className='relative flex flex-col gap-4 ml-10 text-white md:ml-8'>

              <section className='flex items-center justify-between'>

                <h2 className='mr-4 overflow-x-auto text-xl font-extrabold md:text-2xl whitespace-nowrap'>{username.charAt(0).toUpperCase() + username.slice(1)}</h2>

                <ButtonFollow
                  username={username}
                />
              </section>

              <section className='flex'>
                <p className='break-words'>{user && user.descripcion}</p>
              </section>

              <section>
                <p className='mx-auto break-words'>
                  <strong>{threads.filter(thread =>
                    thread.first_person === username || thread.second_person === username
                  ).length}
                  </strong> Amigos
                </p>
              </section>

            </div>
          </header>

          )
        : (
          <p>Perfil inexistente.</p>
          )}

      {/* Publicaciones del usuario  [repeat(auto-fill,minmax(250px,1fr))]  */}
      <main className='grid justify-center grid-cols-3 gap-4 mt-5 mb-8 lg:px-6 max-lg:px-4 max-lg:gap-3'>
        {userPosts.map((post) => (
          <div key={post.id}>
            <Link to={`/publicacion/${post.id}`} >
              <img
                src={`${BASE_BACKEND_URL}${post.image}`}
                alt='Publicación'
                className='object-cover w-full transition-opacity rounded-md hover:opacity-70'
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </main>
    </div>
  )
}

export default ProfilePage
