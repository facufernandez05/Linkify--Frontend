import { Link } from 'react-router-dom'
import estilos from '../../styles/BorderHeader.module.css'

export function Header ({ setShow }) {
  function scrollToTop () {
    if (window.scrollY !== 0) {
      window.scrollTo(0, 0)
    }
  }
  return (
    <>
    <nav className="fixed top-0 left-0 flex items-center justify-between w-full p-6 bg-white border-b-2 shadow-xl">

      <button className='p-2 md:hidden' onClick={() => setShow(true)}>
        <i className="text-2xl cursor-pointer fa-solid fa-bars text-palette-blue"></i>
      </button>

      <button onClick={scrollToTop}>
        <h1 className="font-sans text-2xl font-black text-palette-blue">
          Linkify
        </h1>
      </button>

      <ul className="flex gap-2 md:gap-10 max-md:hidden">
        {headerOptions?.map(option => (
          <a key={option.href} href={option.href}>
            <li className={estilos.border}>
              <p>{option.label}</p>
            </li>
          </a>
        ))}
      </ul>

      <Link to='/login' className='p-2 font-bold text-gray-800 transition-colors hover:text-palette-red max-md:border max-md:rounded-xl max-md:border-palette-red max-md:text-palette-red '>
        <span>Iniciar sesión</span>
      </Link>
    </nav>
    </>
  )
}

export const headerOptions = [
  {
    label: 'Información',
    href: '#info'
  },
  {
    label: 'Terminos',
    href: '#terminos'
  },
  {
    label: 'Contacto',
    href: '#contacto'
  }
]
