import axios from 'axios'
import { useState } from 'react'
import { deleteUserAccount } from '../../api/urlsUsers'

export function DeleteAccount () {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(deleteUserAccount, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('token')}`
        }
      })
      window.localStorage.removeItem('token')
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error)
    } finally {
      window.location.href = '/'
    }
  }

  return (
    <>
      {showDeleteConfirmation
        ? (
          <div className='mt-4'>
            <button className='px-3 py-2 mr-2 text-white bg-red-500 rounded-md' onClick={handleDeleteAccount}>
              Sí, eliminar
            </button>
            <button className='px-3 py-2 text-gray-700 bg-gray-300 rounded-md' onClick={() => setShowDeleteConfirmation(false)}>
              Cancelar
            </button>
          </div>
          )
        : (
          <div className='mt-4'>
            <button className='px-3 py-2 mx-auto text-white bg-red-500 rounded-md' onClick={() => setShowDeleteConfirmation(true)}>
              Eliminar cuenta
            </button>
          </div>
          )}
    </>
  )
}
