import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SelectedContext } from '../../context/selectedNavItem'

export const Notificaciones = () => {
  const { selectedNavItem, setSelectedNavItem } = useContext(SelectedContext)
  return (
    <Link
      to='/notifications'
      className={`flex rounded-full lg:rounded-lg justify-center lg:justify-start items-center lg:gap-2 w-10 h-10 lg:px-4 lg:py-2 hover:bg-palette-2 lg:max-h-14 lg:w-full lg:h-14 ${
                  selectedNavItem === 'notificaciones' ? 'lg:text-palette-blue border lg:border-transparent' : ''
              }`}
      onClick={() => {
        setSelectedNavItem('notificaciones')
        window.localStorage.setItem('selectedNavItem', 'notificaciones')
      }}
    >
      <i className='text-xl opacity-75 fa-solid fa-bell' />
      <span className='hidden text-xl font-medium lg:block'>Notificaciones</span>
    </Link>
  )
}
