import { useContext } from 'react'
import { useMyProfileData } from '../../hooks/useMyProfileData'
import { SelectedContext } from '../../context/selectedNavItem'
import { Link } from 'react-router-dom'
import { BASE_BACKEND_URL } from '../../api/baseUrl'

export const Profile = () => {
  const { myUserData } = useMyProfileData()
  const { selectedNavItem, setSelectedNavItem } = useContext(SelectedContext)

  const fotoPerfilUrl = myUserData && myUserData.foto_perfil
    ? `${BASE_BACKEND_URL}${myUserData.foto_perfil}`
    : null

  const username = myUserData && myUserData.user && myUserData.user.username
    ? myUserData.user.username
    : null
  return (
    <>
    {myUserData
      ? (
        <div className='space-y-4 md:w-full'>
          <Link
            to={`profile/${username}`}
            className={`w-10 h-10 md:w-full md:h-full flex rounded-full md:rounded-none border md:border-none border-transparent justify-center items-center gap-2 lg:px-4 md:py-2 dark:hover:bg-[#252525] ${
                selectedNavItem === 'profile' ? 'lg:text-blue-600 border-white' : ''
            }`}
            onClick={() => {
              setSelectedNavItem('profile')
              window.localStorage.setItem('selectedNavItem', 'profile')
            }}
          >
            <div className={`${selectedNavItem === 'profile' ? 'md:border-white' : ''} md:border-2 border-transparent object-cover h-6 w-6 md:h-8 md:w-8 lg:w-10 lg:h-10 rounded-full`}>
              <img
                src={fotoPerfilUrl}
                className={`${selectedNavItem === 'profile' ? 'md:border-black' : ''} md:border border-transparent object-cover w-full h-full rounded-full`}
                alt='Foto de perfil'
              />
            </div>

            <div className='hidden w-4/5 overflow-hidden lg:block'>
              <p className='text-xs'>
                <strong className='hidden font-medium lg:block'>{username}</strong>
                <span className='hidden overflow-hidden lg:block'>{myUserData?.user?.email}</span>
              </p>
            </div>
          </Link>
        </div>
        )
      : (
        <p>Error</p>
        )}
    </>
  )
}
