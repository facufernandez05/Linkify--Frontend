import { useMyProfileData } from '../../hooks/useMyProfileData'

export const ChangeDescription = ({ setDescripcion, myUserDescription }) => {
  return (
    <article className='w-full my-5'>

      <label
        htmlFor='Username'
        className='block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 focus-within:text-blue-500'
      >

        <span
          className='text-xs font-medium transition-colors'
        >
          Descripción
        </span>

        <textarea
          autoComplete='off' type='text'
          defaultValue={myUserDescription}
          maxLength={50}
          className='w-full p-0 mt-1 text-white bg-transparent border-none h-14 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm max-h-24'
          onChange={(e) => setDescripcion(e.target.value)}
        />

      </label>
    </article>
  )
}
