import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAuthenticatedUser } from '../api/urlsUsers'

export function useMyProfileData () {
  const [myUserData, setMyUserData] = useState({})

  async function fetchMyUserData () {
    try {
      const token = window.localStorage.getItem('token')
      const response = await axios.get(getAuthenticatedUser, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      setMyUserData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyUserData()
  }, [])

  const myUsername = myUserData?.user?.username
  const myUserId = myUserData?.user?.id
  const myUserDescription = myUserData?.descripcion

  return { myUserData, myUsername, myUserId, myUserDescription }
}
