import axios from 'axios'
import { postComentarios } from '../../api/urlsPost'
import { userDataGet } from '../../api/urlsUsers'
import { useEffect, useState } from 'react'
import { Avatar, Button, Input, Link } from '@nextui-org/react'
import { useGetCommentsPost } from '../../hooks/useGetCommentsPost'

const styles = {
  inputWrapper: [
    'rounded-r-none'
  ]
}

export function FooterPost ({ handleAddComment, newComment, setNewComment }) {
  return (
    <form className='flex items-center gap-1' method='POST' onSubmit={handleAddComment}>
      <Input
        variant='bordered'
        color='primary'
        type='text' placeholder='Agregar comentario'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        classNames={styles}
      />
      <Button isIconOnly className='p-0 rounded-l-none' type='submit' >
            <i className='text-palette-blue fa-solid fa-paper-plane group-hover:text-blue-600' />
      </Button>
    </form>
  )
}

function fetchNewComment ({ id, comentarios, setComentarios, fetchComentarios }) {
  const [newComment, setNewComment] = useState('')
  const [postNewComment, setPostNewComment] = useState()

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (newComment.trim() !== '') {
      try {
        const response = await axios.post(postComentarios(id), {
          contenido: newComment
        }, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
          }
        })

        // Obtener el detalle del usuario asociado al comentario desde la API
        const usuarioResponse = await axios.get(userDataGet(response.data.autor), {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('token')}`
          }
        })

        const newComentario = {
          ...response.data,
          autor: {
            id: usuarioResponse.data.id,
            username: usuarioResponse.data.user.username,
            foto_perfil: usuarioResponse.data.foto_perfil
          }
        }

        setComentarios([...comentarios, newComentario])
        setNewComment('')
        setPostNewComment(newComment)
      } catch (error) {
        console.error('Error al agregar el comentario:', error)
      }
    }
  }

  useEffect(() => {
    fetchComentarios()
  }, [postNewComment])

  return { handleAddComment, newComment, setNewComment }
}

export function CommentsPost ({ id }) {
  const { comentarios, setComentarios, fetchComentarios } = useGetCommentsPost({ id })
  const { handleAddComment, newComment, setNewComment } = fetchNewComment({ id, comentarios, setComentarios, fetchComentarios })

  return (
    <>
      <ul className='flex flex-col flex-1 gap-1 overflow-auto max-h-64'>
        {comentarios.length > 0 && (
        <>
          {comentarios.slice(0, 2).map((comentario) => (
              <li key={comentario.id} className=''>
                <p className=''><strong>{comentario.autor.username}</strong> {comentario.contenido}</p>
              </li>
          ))}
        </>
        )}
      </ul>

      {comentarios.length >= 3
        ? (
            <Link href={`/publicacion/${id}`} underline='none' className='py-2' >
              {`Ver los ${comentarios.length} comentarios`}
            </Link>
          )
        : comentarios.length <= 2 && comentarios.length >= 1
          ? (
            <p className='pb-4'>No hay más comentarios</p>
            )
          : (
            <p className='pb-4'>Sé el primero en comentar</p>
            )
      }

      <FooterPost id={id}
        comentarios={comentarios}
        setComentarios={setComentarios}
        handleAddComment={handleAddComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />

    </>
  )
}

export function CommentsPostView ({ id }) {
  const { comentarios, setComentarios, fetchComentarios } = useGetCommentsPost({ id })
  const { handleAddComment, newComment, setNewComment } = fetchNewComment({ id, comentarios, setComentarios, fetchComentarios })

  return (
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col flex-1 gap-2 pt-2 overflow-auto max-h-64 md:max-h-96'>
        {comentarios && (
          <>
          {comentarios.map((comentario) => (
            <li key={comentario?.id} className='flex justify-between py-2'>
              <div className='flex gap-2'>
                <Avatar
                src={comentario?.autor?.foto_perfil} />
                <p className=''><strong>{comentario?.autor?.username}</strong> <span className='text-gray-300'>{comentario?.contenido}</span></p>
              </div>

            </li>
          ))}
          </>
        )}
      </ul>

      <FooterPost id={id}
        comentarios={comentarios}
        setComentarios={setComentarios}
        handleAddComment={handleAddComment}
        newComment={newComment}
        setNewComment={setNewComment}
      />

    </div>
  )
}
