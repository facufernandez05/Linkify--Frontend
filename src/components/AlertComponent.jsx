export function AlertComponent ({ setShowAlert }) {
  return (
    <div className='fixed left-0 right-0 flex justify-center top-4'>
      <div
        role='alert'
        className='relative p-4 bg-white border border-gray-100 shadow-xl rounded-xl'
      >
        <div className='flex items-start gap-4'>
          <span className='text-green-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </span>

          <div className='flex-1'>
            <strong className='block font-medium text-gray-900'> Cambios guardados </strong>

            <p className='mt-1 text-sm text-gray-700'>
              La contraseña se guardo correctamente.
            </p>
          </div>

          <button
            className='text-gray-500 transition hover:text-gray-600'
            onClick={() => setShowAlert(false)}
          >
            <span className='sr-only'>Dismiss popup</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
