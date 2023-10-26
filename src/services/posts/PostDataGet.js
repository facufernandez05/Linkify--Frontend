import axios from 'axios'
import { BASE_URL } from '../../api/baseUrl'

export const GetPublicacionData = async (publicaciones) => {
  const userIds = [...new Set(publicaciones.map((publicacion) => publicacion.user))]

  const usersDataPromises = userIds.map(async (userId) => {
    const userDataResponse = await axios.get(`${BASE_URL}users/${userId}/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      }
    })
    return userDataResponse.data
  })

  const usersData = await Promise.all(usersDataPromises)

  const likedPosts = new Set(JSON.parse(window.localStorage.getItem('likedPosts')) || [])

  const publicacionesConDatosUsuario = publicaciones.map((publicacion) => {
    const userData = usersData.find((user) => user.user.id === publicacion.user)
    return {
      ...publicacion,
      user: userData,
      liked: likedPosts.has(publicacion.id)
    }
  })

  return publicacionesConDatosUsuario
}
