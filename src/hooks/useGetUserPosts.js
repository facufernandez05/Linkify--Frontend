import axios from 'axios'
import { useEffect, useState } from 'react'
import { getUserPost } from '../api/urlsPost'

export function useGetUserPosts (user) {
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    async function fetchUserPosts () {
      try {
        const token = window.localStorage.getItem('token')
        const response = await axios.get(getUserPost(user?.user?.id), {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        setUserPosts(response.data)
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    }
    fetchUserPosts()
    // eslint-disable-next-line
  }, [user])

  return { userPosts }
}
