import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { GetPublicacionData } from '../services/posts/PostDataGet'
import { getPosts, postLike } from '../api/urlsPost'
import { useMyProfileData } from './useMyProfileData'
import { LoadingContext } from '../context/loading'

const usePostLogic = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const { myUserId } = useMyProfileData()
  const { loading, setLoading } = useContext(LoadingContext)

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        setLoading(true)
        const response = await axios.get(getPosts, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
          }
        })

        const responseResults = response.data

        const publicacionesConDatosUsuario = await GetPublicacionData(responseResults)

        setPublicaciones(prevPublicaciones => [...prevPublicaciones, ...publicacionesConDatosUsuario])
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error)
      }
    }
    fetchPublicaciones()
    setLoading(null)
  }, [])

  const handleLikePost = async (postId) => {
    try {
      await axios.put(
        postLike(postId),
        {},
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
          }
        }
      )

      setPublicaciones((prevPublicaciones) =>
        prevPublicaciones.map((publicacion) =>

          publicacion.id === postId
            ? {
                ...publicacion,
                liked: !publicacion?.liked,
                likes: publicacion?.likes_users?.includes(myUserId) ? publicacion?.likes - 1 : publicacion?.likes + 1,
                likes_users: publicacion?.likes_users?.includes(myUserId)
                  ? publicacion?.likes_users.filter(
                    (userId) => userId !== myUserId
                  )
                  : [...publicacion.likes_users, myUserId]
              }
            : publicacion

        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  return { publicaciones, GetPublicacionData, setPublicaciones, handleLikePost, loading }
}

export default usePostLogic
