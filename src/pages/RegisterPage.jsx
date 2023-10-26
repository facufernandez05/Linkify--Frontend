import { useContext } from 'react'
import { RegisterFormStep } from '../components/register/RegisterFormStep'
import { LoadingContext } from '../context/loading'
import { Spinner } from '@nextui-org/react'
import { BASE_BACKEND_URL } from '../api/baseUrl'
import { ErrorContext } from '../context/error'

const logoUrl = '/media/icons/logo_text.webp'

export function RegisterForm () {
  const { loading } = useContext(LoadingContext)

  const { error } = useContext(ErrorContext)

  return (
    <div className='flex flex-col justify-center min-h-screen px-6 py-12 bg-gradient-to-tr from-blue-400 to-red-300 lg:px-8'>
      <main className='h-full p-6 mx-auto overflow-y-auto bg-gray-200 border-2 border-gray-300 rounded-md shadow-sm md:max-w-screen-sm w-80 md:w-96'>

        {!loading &&
        <header className='flex items-center justify-center w-full'>
          <img src={BASE_BACKEND_URL + logoUrl } alt='Logo' className='object-cover w-40 h-20' />
        </header>
        }

        {!loading && error && <p className='mb-4 text-center text-red-500'>{error}</p>}

        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          {loading
            ? (
                <Spinner className='flex justify-center mx-auto' size='lg' />
              )
            : (
                <RegisterFormStep />
              )}
        </div>
      </main>
    </div>
  )
}

export default RegisterForm
