import { Inicio } from './navigation/Inicio'
import { Notificaciones } from './navigation/Notificaciones'
import { Ajustes } from './navigation/Ajustes'
import { Chat } from './navigation/Chat'
import { SelectedProvider } from '../context/selectedNavItem'
import { Profile } from './navigation/Profile'

export const NavBar = () => (
  <SelectedProvider>
    <section className='fixed bottom-0 z-40 flex items-center justify-between w-full py-2 mr-4 border-t-2 md:mr-0 md:static md:flex-col h-max md:p-0 md:h-full bg-palette-1 md:border-r-2 md:border-t-0 border-palette-2 lg:w-64 md:w-20'>

      <ul className='flex items-center justify-around w-full md:mt-2 md:gap-5 md:flex-col'>
        <li className='lg:h-auto lg:w-[92%] flex items-center'>
          <Inicio />
        </li>

        <li className='w-10 h-10 lg:h-auto lg:w-[92%]'>
          <Notificaciones />
        </li>

        <li className='w-10 h-10 lg:h-auto lg:w-[92%]'>
          <Chat />
        </li>

        <li className='w-10 h-10 lg:h-auto lg:w-[92%]'>
          <Ajustes />
        </li>
      </ul>

      <article className='sticky w-[23%] h-auto flex justify-center md:block inset-x-0 bottom-0 md:w-full md:border-t border-palette-2'>
        <Profile />
      </article>

    </section>
  </SelectedProvider>
)

export default NavBar
