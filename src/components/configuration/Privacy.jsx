import { useState } from 'react'
import axios from 'axios'
import { AlertComponent } from '../AlertComponent'
import { changePassword } from '../../api/urlsUsers'

export function PrivacyConfig () {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Las contraseñas no coinciden.')
      return
    }

    try {
      const token = window.localStorage.getItem('token')
      await axios.put(
        changePassword,
        {
          current_password: currentPassword,
          new_password: newPassword
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      setErrorMessage('')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      setShowAlert(true)
    } catch (error) {
      setErrorMessage('La contraseña que ingresó es incorrecta.')
    }
  }

  return (
    <>

      <div className='mt-4'>
        <form
          onSubmit={handleChangePassword}
          className='flex flex-col justify-between gap-4'
        >

          <article className='mb-4'>

            <label
              htmlFor='currentPassword'
              className='block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 focus-within:text-blue-500'
            >
              Contraseña actual

              <input
                className='w-full p-0 mt-1 text-white bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                type='password'
                id='currentPassword'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </label>

          </article>

          <article className='mb-4'>
            <label htmlFor='newPassword' className='block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 focus-within:text-blue-500'>
              Nueva contraseña

              <input
                className='w-full p-0 mt-1 text-white bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                type='password'
                id='newPassword'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
          </article>

          <article className='mb-4'>
            <label htmlFor='confirmNewPassword' className='block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 focus-within:text-blue-500'>
              Confirmar nueva contraseña

              <input
                className='w-full p-0 mt-1 text-white bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
                type='password'
                id='confirmNewPassword'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </label>
          </article>

          <div className='text-red-600'>{errorMessage}</div>

          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'
          >
            Cambiar contraseña
          </button>
        </form>
        {showAlert && <AlertComponent setShowAlert={setShowAlert} />}
      </div>

    </>
  )
}
