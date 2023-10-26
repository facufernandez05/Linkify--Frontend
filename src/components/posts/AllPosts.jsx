'use server'

import usePostLogic from '../../hooks/usePostLogic'
import { Button, Image, Skeleton } from '@nextui-org/react'
import { HeaderPost } from './HeaderPostView'
import { CommentsPost } from './CommentsPost'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { LoadingContext } from '../../context/loading'

export function AllPosts () {
  const { publicaciones, handleLikePost } = usePostLogic()
  const { myUserId, myUsername } = useMyProfileData()
  const { loading } = useContext(LoadingContext)

  return (
    <>
      {publicaciones.map((publicacion) => (
          <div key={publicacion.id} className='flex flex-col p-2 m-2 border-b-2 rounded-md shadow-md max-md:mx-2 md:gap-2 bg-palette-2 border-palette-2 max-md:max-w-sm max-md:p-2'>

            <main className=''>

              <HeaderPost publicacion={publicacion} myUsername={myUsername} myUserId={myUserId} />

              <section className='flex items-center'>

              {loading
                ? (
                  <Skeleton className='bg-palette-2 md:h-468 md:w-468 max-md:w-80 max-md:h-80 rounded-xl' />
                  )
                : (
                  <Image
                    src={publicacion.image}
                    alt='Publicación'
                    className='object-cover rounded-md md:h-468 md:w-468 max-md:w-80 max-md:h-80'
                    loading='lazy'
                  />
                  )}

              </section>

              <section className='flex flex-col gap-2 p-2 border-b border-palette-1'>

                <div className='flex gap-3'>
                    <Button isIconOnly onPress={() => handleLikePost(publicacion?.id)} color='danger' size='md' className='hover:bg-palette-6'>
                      {publicacion?.likes_users?.includes(myUserId)
                        ? (
                            <i className='text-xl fa-solid fa-heart'/>
                          )
                        : (
                            <i className='text-xl fa-regular fa-heart'/>
                          )}
                    </Button>

                    <Link to={`/publicacion/${publicacion.id}`}>
                      <Button isIconOnly color='primary' size='md'>
                        <i className="text-xl text-white fa-regular fa-comment"></i>
                      </Button>
                    </Link>

                </div>

                <p className='text-bold'>{publicacion.likes} Me gusta</p>

              <p className='inline-block break-words max-w-468 text-md'>
                <span className="font-bold">{publicacion.user && publicacion?.user?.user?.username} </span>
                {publicacion.caption.charAt(0).toUpperCase() + publicacion.caption.slice(1)}
              </p>
              </section>
            </main>

            <section className='relative flex flex-col px-2 pt-2'>

                <CommentsPost id={publicacion.id}/>

            </section>
          </div>
      ))}
    </>
  )
}

export default AllPosts
