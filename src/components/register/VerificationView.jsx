import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { LoadingContext } from '../../context/loading'
import { sendVerificationEmail, verifyCode } from '../../api/urlsAuthentication'
import { Spinner } from '@nextui-org/react'
import { VerificationCodeContext } from '../../context/verificationCode'
import { FormDataContext } from '../../context/formData'

export const VerificationView = ({ canResendCode, setCanResendCode, setRemainingTime, remainingTime, setVerificationSuccess }) => {
  const { verificationCodeGenerated } = useContext(VerificationCodeContext)
  const [codeVerification, setCodeVerification] = useState(false)
  const [verificationView, setVerificationView] = useState(true)
  const { loading, setLoading } = useContext(LoadingContext)
  const { formData, setFormData } = useContext(FormDataContext)

  const handleResendCode = async () => {
    setLoading(true)
    try {
      await axios.post(sendVerificationEmail, {
        email: formData.email,
        username: formData.username,
        password: formData.password
      })

      setCanResendCode(false)
      setRemainingTime(180)

      setCodeVerification(true)

      setTimeout(() => {
        setCodeVerification(false)
      }, 3000)
    } catch (error) {
      console.error('Error al enviar el correo de verificación:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationCode = async () => {
    setLoading(true)
    try {
      // Llamar a la API para verificar el código ingresado
      const response = await axios.post(verifyCode, {
        codigo: formData.verificationCode,
        verification_code: verificationCodeGenerated,
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      if (response.data.message === 'Verificación exitosa') {
        setVerificationView(false)
        setVerificationSuccess(true)
        window.localStorage.removeItem('jwt')
        window.localStorage.removeItem('formData')
        window.localStorage.removeItem('Code verification')
      }
    } catch (error) {
      setFormData({ ...formData, verificationCode: '' })
      console.error('Error al verificar el código:', error)
    } finally {
      console.log(verificationCodeGenerated)
      setLoading(false)
    }
  }
  return (
    <>
    {verificationView && (
      <form method='POST'>

        <p className='font-semibold text-gray-700'>Se ha enviado un correo electrónico a <strong>{formData.email}</strong> con el código de verificación.</p>

        <input
          type='text'
          placeholder='Código de Verificación'
          value={formData.verificationCode}
          onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
          maxLength={6}
          className='block my-2 w-2/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 indent-2'
        />

        {loading
          ? (
            <Spinner animation="border" variant="primary" />
            )
          : (
            <div className='p-4'>
              <button
                onClick={handleVerificationCode}
                className='flex items-center justify-center w-full rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Verificar Código
              </button>

              <button
                onClick={handleResendCode}
                disabled={!canResendCode}
                className={`flex items-center justify-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ${canResendCode ? 'hover:bg-indigo-500' : 'opacity-50 cursor-not-allowed'
                  }`}
              >
                Reenviar Codigo {canResendCode ? '' : `(${remainingTime}s)`}
              </button>
            </div>
            )}

        {codeVerification && (
          <p className='text-gray-700'>Codigo Reenviado</p>
        )}
      </form>
    )}
    </>
  )
}
