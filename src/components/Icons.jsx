import { BASE_BACKEND_URL } from '../api/baseUrl'

export const LogoApp = () => {
  return (
    <img src={`${BASE_BACKEND_URL}/media/icons/logo_oficial.webp`} alt='Logo' />
  )
}

export const LogoAppTexto = () => {
  return (
    <img src={`${BASE_BACKEND_URL}/media/icons/logo_texto.webp`} alt='Logo'/>
  )
}

export const FotoDefault = () => {
  return (
    <img src={`${BASE_BACKEND_URL}/media/icons/foto_default.webp`} alt='Foto de perfil' />
  )
}
