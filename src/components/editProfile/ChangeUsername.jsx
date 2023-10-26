import { useMyProfileData } from '../../hooks/useMyProfileData'

export const ChangeUsername = ({ setUsername, myUsername }) => {
  return (
    <article className='flex items-center justify-center w-full my-5'>
      <label
        htmlFor='Username'
        className='block w-full px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 focus-within:text-blue-500'
      >

        <span
          className='text-xs font-medium transition-colors'
        >
          Nombre de usuario
        </span>

        <input
          autoComplete='off'
          type='text'
          id='Username'
          defaultValue={myUsername}
          className='w-full p-0 mt-1 text-white bg-transparent border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm'
          onChange={(e) => setUsername(e.target.value)}
          required
        />

      </label>
    </article>
  )
}
