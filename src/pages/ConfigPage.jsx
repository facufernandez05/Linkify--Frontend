import { useState } from 'react'
import { DeleteAccount } from '../components/configuration/DeleteAccount'
import { Logout } from '../components/configuration/Logout'
import { PrivacyConfig } from '../components/configuration/Privacy'

export default function Config ({ handleLogout }) {
  const [viewDeleteAccount, setViewDeleteAccount] = useState()
  const [viewPrivacy, setViewPrivacy] = useState()
  const [viewLogout, setViewLogout] = useState()

  return (
    <>
      <h2 className='relative p-4 text-3xl font-bold tracking-tight text-white max-lg:hidden'>Configuración</h2>

      <main className='flex w-full h-full max-w-3xl gap-4 px-4 py-4 mx-auto max-md:flex-col lg:py-16'>

        <ul className='flex w-full py-4 rounded-md max-md:overflow-x-auto max-md:justify-center max-md:items-center md:w-2/3 md:flex-col bg-palette-2 '>
          <li>
            <button
              onClick={() => {
                setViewDeleteAccount(true)
                setViewPrivacy(false)
                setViewLogout(false)
              }}
              className={`flex items-center w-full gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-palette-5 hover:bg-palette-3 hover:text-palette-white ${viewDeleteAccount ? 'bg-palette-3 border-palette-6 text-palette-white' : ''
                }`}k
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 opacity-75'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>

              <span className='text-sm font-medium'> Administrar cuenta </span>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setViewDeleteAccount(false)
                setViewPrivacy(true)
                setViewLogout(false)
              }}
              className={`flex items-center w-full gap-2 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-palette-5 hover:bg-palette-3 hover:text-palette-white ${viewPrivacy ? 'bg-palette-3 border-palette-6 text-palette-white' : ''
                }`}
            >
              <i className='relative flex items-center justify-center w-5 h-5 fa-solid fa-lock' />
              <span className='text-sm font-medium'> Privacidad </span>
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                setViewDeleteAccount(false)
                setViewPrivacy(false)
                setViewLogout(true)
              }}
              className={`flex w-full items-center md:border-t gap-2 border-s-[3px] border-s-transparent md:border-t-gray-500 px-4 py-3 text-gray-500 hover:border-s-palette-5 md:hover:bg-palette-3 md:hover:text-palette-white  ${viewLogout ? 'bg-palette-3 border-palette-6 text-palette-white' : ''
                }`}
            >
              <i className='relative flex items-center justify-center w-5 h-5 fa-solid fa-right-from-bracket' />
              <span className='text-sm font-medium '> Cerrar sesión </span>
            </button>
          </li>
        </ul>

        <div className='flex flex-col w-full h-full p-4 overflow-auto rounded-md bg-palette-2'>

          {viewDeleteAccount && (
            <>
              <h2 className='text-2xl font-bold tracking-tight text-white '>Eliminar cuenta</h2>
              <p className='mt-2 text-sm text-gray-500'>
                ¿Estás seguro que quieres eliminar tu cuenta?
              </p>
              <DeleteAccount />
            </>
          )}

          {viewLogout && (
            <>
              <h2 className='text-2xl font-bold tracking-tight text-white '>Cerrar sesión</h2>
              <Logout handleLogout={handleLogout} />
            </>
          )}

          {viewPrivacy && (
            <>
              <h2 className='text-2xl font-bold tracking-tight text-white '>Cambiar contraseña</h2>
              <PrivacyConfig />
            </>
          )}

        </div>

      </main>
    </>
  )
}
