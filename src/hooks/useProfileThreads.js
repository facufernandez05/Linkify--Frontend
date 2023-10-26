import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { getThreads } from '../api/urlsChat'
import { LoadingContext } from '../context/loading'

export function useProfileThread () {
  const [threads, setThreads] = useState([])
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)
    async function fetchUserThreads () {
      try {
        const token = window.localStorage.getItem('token')
        const response = await axios.get(getThreads, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        setThreads(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserThreads()
  }, [])

  return { threads }
}
