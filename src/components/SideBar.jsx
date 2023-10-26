import { Link } from 'react-router-dom'
import { SearchPanel } from './SearchPanel'
import { useContext } from 'react'
import { SelectedContext } from '../context/selectedNavItem'
import { LogoApp } from './Icons'

export function SideBar ({ setNavBarView }) {
  const { setSelectedNavItem } = useContext(SelectedContext)

  return (
    <>
      <div className='flex items-center w-full h-20 border-b-2 bg-palette-1 border-palette-2'>
        <section className='mx-2 w-14'>
          <Link
            to='/'
            onClick={() => {
              setNavBarView(true)
              setSelectedNavItem('inicio')
            }}
          >
            <LogoApp className='items-center object-cover w-10 h-10 mx-auto md:mx-4 md:h-14 md:w-14'/>
          </Link>
        </section>

        <section className='w-full max-md:mx-4 md:mx-auto md:w-1/2 lg:w-1/3'>
          <SearchPanel />
        </section>

        <section className='flex items-center justify-center'>
          <Link
            to='/crear_publicacion'
            className='relative mx-4 text-sm font-medium text-white md:mr-8 md:inline-block group focus:outline-none focus:ring'
          >

            <span
              className='absolute inset-0 hidden border border-red-600 md:block group-active:border-red-500'
            />
            <span
              className='flex justify-center px-10 py-3 transition-transform bg-red-600 border border-red-600 md:px-12 md:flex md:items-center active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1 max-md:rounded-md'
            >
              <i className='md:mr-2 fa-solid fa-plus' />
              <p className='hidden md:block'>Crear</p>
            </span>
          </Link>
        </section>

      </div>
    </>
  )
}

export default SideBar
