import { createContext, useState } from 'react'

export const FormDataContext = createContext()

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
  password2: '',
  verificationCode: ''
}

export function FormDataProvider ({ children }) {
  const initialFormData = JSON.parse(window.localStorage.getItem('formData')) || initialState
  const [formData, setFormData] = useState(initialFormData)

  return (
    <FormDataContext.Provider value={{
      formData,
      setFormData
    }}>
      { children }
    </FormDataContext.Provider>
  )
}
