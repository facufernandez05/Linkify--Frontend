import axios from 'axios'

async function hasUserLikedPost (postId) {
  try {
    const response = await axios.get(`/api/publicacion/has_liked/${postId}/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`
      }
    })
    return response.data.has_liked
  } catch (error) {
    console.error('Error al verificar si el usuario ha dado like:', error)
    return false // Manejo de errores, puedes ajustarlo según tu necesidad
  }
}

export default hasUserLikedPost
