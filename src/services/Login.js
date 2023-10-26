import axios from 'axios'
import { BASE_URL } from '../api/baseUrl'

const tokenUserUrl = `${BASE_URL}tokenuser/`

const login = async (username, password) => {
  try {
    const { data } = await axios.post(tokenUserUrl, {
      username,
      password
    })
    const token = data.token
    window.localStorage.setItem('token', token)
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response.data)
  }
}

export default { login }
