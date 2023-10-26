import { createContext, useState } from 'react'

export const VerificationCodeContext = createContext()

export function VerficationCodeProvider ({ children }) {
  const initialJwt = window.localStorage.getItem('jwt')
  const [verificationCodeGenerated, setVerificationCodeGenerated] = useState(initialJwt)

  return (
    <VerificationCodeContext.Provider value={{
      verificationCodeGenerated,
      setVerificationCodeGenerated
    }}>
      { children }
    </VerificationCodeContext.Provider>
  )
}
