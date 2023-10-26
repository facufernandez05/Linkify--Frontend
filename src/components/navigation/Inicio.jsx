import { useContext } from 'react'
import { SelectedContext } from '../../context/selectedNavItem'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  const { selectedNavItem, setSelectedNavItem } = useContext(SelectedContext)
  return (
    <Link
      to='/'
      className={`flex rounded-full lg:rounded-lg justify-center lg:justify-start items-center lg:gap-2 w-10 h-10 lg:px-4 lg:py-2 hover:bg-palette-2 lg:max-h-14 lg:w-full lg:h-14 ${
                  selectedNavItem === 'inicio' ? 'lg:text-palette-blue border lg:border-transparent' : ''
              }`}
      onClick={() => {
        setSelectedNavItem('inicio')
        window.localStorage.setItem('selectedNavItem', 'inicio')
      }}
    >
      <i className='text-xl fa-solid fa-house' />
      <span className='hidden text-xl font-medium lg:block'>Inicio</span>
    </Link>
  )
}
