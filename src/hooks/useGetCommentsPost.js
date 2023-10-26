import axios from 'axios'
import { postComentarios } from '../api/urlsPost'
import { useEffect, useState } from 'react'
import { userDataGet } from '../api/urlsUsers'

export function useGetCommentsPost ({ id }) {
  const [comentarios, setComentarios] = useState([])

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(postComentarios(id),
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
          }
        }
      )

      // Recopilar detalles del usuario para cada comentario
      const comentariosConUsuario = await Promise.all(
        response.data.map(async (comentario) => {
          const usuarioResponse = await axios.get(
            userDataGet(comentario.autor.id),
            {
              headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
              }
            }
          )
          return {
            ...comentario,
            autor: {
              id: usuarioResponse.data.id,
              username: usuarioResponse.data.user.username,
              foto_perfil: usuarioResponse.data.foto_perfil
            }
          }
        })
      )

      setComentarios(comentariosConUsuario)
    } catch (error) {
      console.error('Error al obtener los comentarios:', error)
    }
  }

  useEffect(() => {
    fetchComentarios()
  }, [id])

  return { comentarios, setComentarios, fetchComentarios }
}
