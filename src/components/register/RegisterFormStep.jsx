import axios from 'axios'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadingContext } from '../../context/loading'
import { userRegister } from '../../api/urlsAuthentication'
import { Button, Input } from '@nextui-org/react'
import { ErrorContext } from '../../context/error'
import { FormDataContext } from '../../context/formData'
import { VerificationCodeContext } from '../../context/verificationCode'
import { EyeSlashFilledIcon } from '../../icons/EyeSlashedFilledIcon'
import { EyeFilledIcon } from '../../icons/EyeFilledIcon'

const styles = {
  label: 'text-gray-700',
  inputWrapper: [
    'border-2',
    'border-gray-400',
    'shadow-xl'
  ],
  input: 'text-gray-700'
}

export const RegisterFormStep = () => {
  const { verificationCodeGenerated, setVerificationCodeGenerated } = useContext(VerificationCodeContext)
  const { formData, setFormData } = useContext(FormDataContext)
  const { setLoading } = useContext(LoadingContext)
  const { setError } = useContext(ErrorContext)
  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false
  })

  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await axios.post(userRegister, formData)

      setError('')
      setFormData({ ...formData, email: response.data.email })
      setFormData({ ...formData, username: response.data.username })
      setFormData({ ...formData, password: response.data.password })

      window.localStorage.setItem('formData', JSON.stringify(formData))
      window.localStorage.setItem('Code verification', true)
      window.localStorage.setItem('jwt', response.data.codigo)
      window.location.href = '/register/code_verification'
    } catch (error) {
      if (error.response.data.error.includes('email', 'correo')) {
        setFormData({ ...formData, email: '' })
      }
      if (error.response.data.error.includes('nombre de usuario')) {
        setFormData({ ...formData, username: '' })
      }
      if (error.response.data.error.includes('contraseñas')) {
        setFormData({ ...formData, password: '' })
        setFormData({ ...formData, password2: '' })
      } else {
        console.error('Error en el registro:', error)
      }
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='flex flex-col space-y-6' method='POST'>

      {inputRegister.map((input, index) => (
        <Input
        key={index}
        label={input.label}
        type={input.type}
        onChange={(e) => setFormData({ ...formData, [input.value]: e.target.value })}
        variant='bordered'
        value={formData[input.value]}
        color={input.color}
        classNames={styles}
        />
      ))}

      <Input
        label='Contraseña'
        variant='bordered'
        color='danger'
        classNames={styles}
        endContent={
          <Button isIconOnly variant='light' className="focus:outline-none" onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}>
            {isVisible.password
              ? (
                <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                )
              : (
                <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                )}
          </Button>
        }
        type={isVisible.password ? 'text' : 'password'}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        />

      <Input
        label='Confirmar contraseña'
        variant='bordered'
        color='danger'
        classNames={styles}
        endContent={
          <Button isIconOnly variant='light' className="focus:outline-none" onClick={() => setIsVisible({ ...isVisible, confirmPassword: !isVisible.confirmPassword })}>
            {isVisible.confirmPassword
              ? (
                <EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
                )
              : (
                <EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
                )}
          </Button>
        }
        type={isVisible.confirmPassword ? 'text' : 'password'}
        value={formData.password2}
        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
        required
        />

      <footer className='flex-col'>
        <button
          onClick={handleRegister}
          className='flex items-center justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          <span className='m-auto'>Registrarse</span>
        </button>

        <p className='mt-10 text-sm text-center text-gray-600'>
          ¿Tienes una cuenta?{' '}
          <Link
            to='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            onClick={() => setError()}
          >
            Inicia sesión
          </Link>
        </p>
      </footer>

    </form>
  )
}

const inputRegister = [
  {
    label: 'Nombre y apellido',
    type: 'text',
    value: 'name',
    color: 'primary'
  },
  {
    label: 'Nombre de usuario',
    type: 'text',
    value: 'username',
    color: 'primary'
  },
  {
    label: 'Correo electrónico',
    type: 'email',
    value: 'email',
    color: 'primary'
  }
]
