import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { allPosts } from '../../api/urlsPost'
import { GetUserDataPost } from '../../services/posts/OnePostGet'
import { HeaderPostView } from './HeaderPostView'
import { Button, Skeleton } from '@nextui-org/react'
import { CommentsPostView } from './CommentsPost'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import usePostLogic from '../../hooks/usePostLogic'
import { LoadingContext } from '../../context/loading'

export function PostView () {
  const { id } = useParams()
  const [publicacion, setPublicacion] = useState()
  const { publicaciones, handleLikePost } = usePostLogic()
  const { setLoading } = useContext(LoadingContext)

  const postToUpdate = publicaciones.find((post) => post.id === publicacion?.id)

  const fetchPublicacion = async () => {
    setLoading(true)
    try {
      const response = await axios.get(allPosts(id), {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`
        }
      }
      )
      const userData = await GetUserDataPost(response.data)
      setPublicacion(userData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublicacion()
  }, [id])

  return (
    <main className='justify-center w-full p-4 mx-auto rounded-md max-md:mx-auto max-md:flex-col max-md:max-w-sm max-md:p-2 md:max-h-468 md:w-468 max-md:w-80 max-md:h-80'>

      {publicacion
        ? <>
          <section className='w-full'>
            <HeaderPostView publicacion={publicacion} />
          </section>

          <CardPost postToUpdate={postToUpdate} publicacion={publicacion} handleLikePost={handleLikePost} />
        </>
        : <h2 className='text-center'>La publicacion no existe</h2>
      }

    </main>
  )
}

function CardPost ({ publicacion, postToUpdate, handleLikePost }) {
  const { myUserId } = useMyProfileData()

  const { loading } = useContext(LoadingContext)
  return (
    <>
      <section className='flex items-center justify-center w-full'>
        {loading
          ? (
            <Skeleton className='bg-palette-2 md:h-468 md:w-468 max-md:w-80 max-md:h-80 rounded-xl' />
            )
          : (
            <img
            src={publicacion?.image}
            alt='Publicación'
            className='object-cover w-full rounded-md'
            radius='none'/>
            )
        }
      </section>

      <section className='relative flex flex-col px-2 pt-2'>
        <div className='flex gap-2'>
        <Button isIconOnly onPress={() => handleLikePost(publicacion?.id)} color='danger' size='md' className='hover:bg-palette-6'>
          {postToUpdate?.likes_users?.includes(myUserId)
            ? (
                <i className='text-xl fa-solid fa-heart'/>
              )
            : (
                <i className='text-xl fa-regular fa-heart'/>
              )}
        </Button>
        <p className='pt-2 text-bold'>{postToUpdate?.likes} Me gusta</p>
        </div>

        <div className='py-4 border-b border-gray-700'>
          <p className='inline-block break-words max-w-468 text-md'>
            <span className="font-bold">{publicacion?.user?.user?.username} </span>
            {publicacion?.caption?.charAt(0).toUpperCase() + publicacion?.caption?.slice(1)}
          </p>
        </div>

        <CommentsPostView id={publicacion?.id} />

      </section>

    </>
  )
}

export default PostView
