import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { CopyDocumentIcon } from './Icons/CopyDocumentIcon.jsx'
import { DeleteDocumentIcon } from './Icons/DeleteDocumentIcon.jsx'
import { useMyProfileData } from '../../hooks/useMyProfileData.js'
import axios from 'axios'
import { allPosts } from '../../api/urlsPost.js'
import { URL_FRONTEND } from '../../api/baseUrl.js'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export async function deletePostAlert (id) {
  try {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta publicación?. Se eliminaran todos los comentarios y likes')
    if (confirmDelete) {
      const token = window.localStorage.getItem('token')
      await axios.delete(allPosts(id), {
        headers: {
          Authorization: `Token ${token}`
        }
      }
      )
    }
    window.location.href = '/'
  } catch (error) {
    console.log('Error al eliminar la publicacion', error)
  }
}

export const ThreeDotDropdown = ({ myUsername, publicacion }) => {
  const [copied, setCopied] = useState(false)

  const linkToCopy = `${URL_FRONTEND}/publicacion/${publicacion.id}`

  const copyToClipboard = () => {
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
  <Dropdown className='bg-palette-2'>
        <DropdownTrigger>
          <Button isIconOnly color='primary' className='hover:bg-palette-blue' size='sm'>
            <i className='fa-solid fa-ellipsis-vertical' />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example" >
          <DropdownItem key="copy" startContent={<CopyDocumentIcon className='flex-shrink-0 text-xl pointer-events-none' />} onAction={copyToClipboard} className={copied && 'text-green-300' }>
            <CopyToClipboard text={linkToCopy} onCopy={() => setCopied(true)}>
              <p>{copied ? 'Enlace copiado' : 'Copiar link'}</p>
            </CopyToClipboard>
          </DropdownItem>
          {myUsername === publicacion?.user?.user?.username &&
          <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => deletePostAlert(publicacion?.id)} startContent={<DeleteDocumentIcon className='flex-shrink-0 text-xl pointer-events-none text-danger' />}>
              Eliminar publicación
          </DropdownItem>
          }
        </DropdownMenu>
  </Dropdown>
  )
}

export function HeaderPost ({ publicacion }) {
  const { myUsername } = useMyProfileData()
  return (
    <header className='flex items-center justify-between pb-2'>
    <div className='flex items-center'>
      <Avatar
        src={publicacion?.user?.foto_perfil}
        size="md"
      />

      <Link to={`/profile/${publicacion?.user?.user?.username}`} >
        <p className='ml-2 text-xl hover:underline hover:underline-offset-1'>
          {publicacion?.user?.user?.username}
        </p>
      </Link>
    </div>

    <ThreeDotDropdown myUsername={myUsername} publicacion={publicacion}/>

  </header>
  )
}

export function HeaderPostView ({ publicacion }) {
  const { myUsername } = useMyProfileData()

  return (
    <header className='flex items-center justify-between py-4 md:border-b md:border-gray-700'>
    <div className='flex items-center'>
      <Avatar
        src={publicacion?.user?.foto_perfil}
        size="md"
      />

      <Link to={`/profile/${publicacion?.user?.user?.username}`} >
        <p className='ml-2 text-xl hover:underline hover:underline-offset-1'>
          {publicacion?.user?.user?.username}
        </p>
      </Link>
    </div>

    <ThreeDotDropdown myUsername={myUsername} publicacion={publicacion}/>

  </header>
  )
}
