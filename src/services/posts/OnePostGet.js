import axios from 'axios'
import { BASE_URL } from '../../api/baseUrl'

export const GetUserDataPost = async (publicacion) => {
  const response = await axios.get(`${BASE_URL}users/${publicacion.user}/`, {
    headers: {
      Authorization: `Token ${window.localStorage.getItem('token')}`
    }
  })

  const likedPosts = new Set(JSON.parse(window.localStorage.getItem('likedPosts')) || [])

  return {
    ...publicacion,
    user: response.data,
    liked: likedPosts.has(publicacion.id)
  }
}
