import { useContext, useEffect, useState } from 'react'
import { BASE_BACKEND_URL } from '../api/baseUrl'
import { LoadingContext } from '../context/loading'
import { VerificationView } from '../components/register/VerificationView'

const logoUrl = '/media/icons/logo_text.webp'

export function VerificationViewPage () {
  const { loading } = useContext(LoadingContext)

  const [verificationSuccess, setVerificationSuccess] = useState()

  const [remainingTime, setRemainingTime] = useState(60)
  const [canResendCode, setCanResendCode] = useState()
  const [redirectCount, setRedirectCount] = useState(3)

  useEffect(() => {
    if (verificationSuccess) {
      const interval = setInterval(() => {
        setRedirectCount((prevCount) => prevCount - 1)
      }, 1000)

      if (redirectCount === 0) {
        clearInterval(interval)
        window.location.href = '/login'
      }

      return () => clearInterval(interval)
    }
  }, [verificationSuccess, redirectCount])

  useEffect(() => {
    let timer

    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1)
      }, 1000)
    } else {
      setCanResendCode(true)
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [remainingTime])

  return (
  <div className='flex flex-col justify-center min-h-screen px-6 py-12 bg-gradient-to-tr from-blue-400 to-red-300 lg:px-8'>
    <main className='h-full p-6 mx-auto overflow-y-auto bg-gray-200 border-2 border-gray-300 rounded-md shadow-sm md:max-w-screen-sm w-80 md:w-96'>

    <header className='flex items-center justify-center w-full'>
      <img src={BASE_BACKEND_URL + logoUrl } alt='Logo' className='object-cover w-40 h-20' />
    </header>

    <VerificationView
    canResendCode={canResendCode}
    setCanResendCode={setCanResendCode}
    remainingTime={remainingTime}
    setRemainingTime={setRemainingTime}
    setVerificationSuccess={setVerificationSuccess}
    />

    {verificationSuccess !== undefined && (
      <>
        {verificationSuccess
          ? (
            <>
              {loading
                ? (
                  <Spinner size='lg' />
                  )
                : (
                  <div className='flex flex-col justify-center'>
                    <h2 className='text-2xl text-black'>¡Código verificado con éxito! Puedes iniciar sesión ahora.</h2>
                    <p className='text-xl text-black'>Redireccionando al inicio de sesión en
                      <span className='text-black'> {redirectCount}</span>
                    </p>

                    <i className='mx-auto text-4xl text-green-600 fa-solid fa-check' />
                  </div>
                  )}
            </>
            )
          : (
            <p className='mt-4 text-red-500'>El código es incorrecto. Por favor, verifica nuevamente.</p>
            )}

      </>
    )}
    </main>
  </div>
  )
}

export default VerificationViewPage
