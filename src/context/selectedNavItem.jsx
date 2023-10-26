import { createContext, useState } from 'react'

export const SelectedContext = createContext()

export function SelectedProvider ({ children }) {
  const [selectedNavItem, setSelectedNavItem] = useState(
    window.localStorage.getItem('selectedNavItem') || 'inicio'
  )

  return (
    <SelectedContext.Provider value={{
      selectedNavItem,
      setSelectedNavItem
    }}>
      { children }
    </SelectedContext.Provider>
  )
}
