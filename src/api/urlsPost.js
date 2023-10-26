// Posts

import { BASE_URL } from './baseUrl'

export const crearPublicacion = `${BASE_URL}crear_publicacion/`

export const getPosts = `${BASE_URL}all_posts/`

export const allPosts = id => {
  return `${BASE_URL}all_posts/${id}/`
}

export const postComentarios = id => {
  return `${BASE_URL}publicaciones/${id}/comentarios/`
}

export const getUserPost = id => {
  return `${BASE_URL}user_post/${id}/`
}

export const postLike = postId => {
  return `${BASE_URL}all_posts/${postId}/like/`
}
