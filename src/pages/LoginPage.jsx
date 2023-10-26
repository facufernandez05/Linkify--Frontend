import { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { loginUrl } from '../api/urlsAuthentication'
import { Button, Input, Spinner } from '@nextui-org/react'
import { EyeFilledIcon } from '../icons/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../icons/EyeSlashedFilledIcon'
import { LoadingContext } from '../context/loading'
import { ErrorContext } from '../context/error'

const styles = {
  label: 'text-sm font-medium text-gray-500',
  inputWrapper: [
    'border border-gray-400'
  ],
  input: 'text-sm font-medium text-gray-700'
}

export function LoginForm ({ setLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const { error, setError } = useContext(ErrorContext)
  const { loading, setLoading } = useContext(LoadingContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(loginUrl, { username, password })
      const token = response.data.token
      window.localStorage.setItem('token', token)
      setLoggedIn(true)
      setPassword('')
      setUsername('')
      window.location.href = '/'
    } catch (error) {
      setUsername('')
      setPassword('')
      setError('Nombre de usuario o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center min-h-screen py-12 flex-1px-6 bg-gradient-to-tr from-blue-400 to-red-300 lg:px-8'>
      <main className='flex flex-col h-full gap-4 p-6 mx-auto overflow-y-auto bg-gray-200 border-2 border-gray-300 rounded-md shadow-sm md:max-w-screen-sm w-80'>
        <div>
          <h2 className='py-4 text-2xl font-bold leading-9 tracking-tight text-center text-gray-700'>
            Inicio de sesión
          </h2>
        </div>

        {error && <p className='flex mb-4 text-red-500'>{error}</p>}

        {loading
          ? <Spinner size='lg' />
          : (
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' method='POST'>

              <Input
              variant='bordered'
              color='primary'
              className="max-w-xs"
              label='Nombre de usuario'
              classNames={styles}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              />

              <Input
              label='Contraseña'
              variant='bordered'
              color='primary'
              classNames={styles}
              endContent={
                <Button isIconOnly variant='light' className="focus:outline-none" onClick={() => setIsVisible(!isVisible)}>
                  {isVisible
                    ? (
                      <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                      )
                    : (
                      <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                      )}
                </Button>
              }
              type={isVisible ? 'text' : 'password'}
              className="max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />

              <div>
                <button
                  type='submit'
                  onClick={handleLogin}
                  className='flex items-center justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Iniciar Sesión
                </button>
              </div>
          </form>

            <p className='mt-8 text-sm text-center text-gray-600'>
              ¿No tienes una cuenta?{' '}
              <Link
                to='/register'
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                onClick={() => setError()}
              >
                Regístrate
              </Link>
            </p>
            </div>
            )}

      </main>
    </div>
  )
}

export default LoginForm
