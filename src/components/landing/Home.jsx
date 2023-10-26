import { Link } from 'react-router-dom'
import { BASE_BACKEND_URL } from '../../api/baseUrl'

export function Home () {
  return (
    <div className='flex items-center justify-center max-w-5xl gap-8 py-20 mx-auto text-blue-600 max-md:flex-col-reverse'>
      <section className='flex flex-col max-w-xs gap-6 mx-10'>
        <h2 className='text-4xl font-black'>¿Qué somos y que proponemos?</h2>
        <p>Somos una plataforma en línea segura, inclusiva y atractiva para los usuarios de todas las edades y orígenes.</p>
        <Link to='/register' className='p-4 font-bold text-center text-white hover:shadow-xl hover:shadow-red-200 rounded-xl bg-palette-red'>
          Registrarse
        </Link>
      </section>
      <img src={`${BASE_BACKEND_URL}/media/images/banner-landing.webp`} className='max-w-xs lg:max-w-xl' alt='Banner linkify' />
    </div>
  )
}
