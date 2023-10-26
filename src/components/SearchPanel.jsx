import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { searchUsers } from '../api/urlsUsers'
import { BASE_BACKEND_URL } from '../api/baseUrl'

export function SearchPanel ({ setVisibleSearchPanel }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]) // Si la búsqueda está vacía, limpiamos los resultados
        return
      }

      try {
        const response = await axios.get(searchUsers, {
          params: { search_query: searchQuery }
        })
        setSearchResults(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    // Agregamos un retardo para evitar peticiones excesivas al servidor mientras el usuario escribe
    const delayTimer = setTimeout(fetchData, 300)

    // Limpiar el temporizador en cada cambio de búsqueda
    return () => clearTimeout(delayTimer)
  }, [searchQuery])

  return (
    <>
      <div className='relative'>
        <input
          type='text'
          id='search-input'
          placeholder='Buscar'
          value={searchQuery}
          autoComplete='off'
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full h-12 rounded-full indent-4 py-2.5 pe-10 shadow-sm border-palette-5 bg-palette-3 text-palette-white sm:text-sm '
        />

        <span className='absolute inset-y-0 grid w-10 end-0 place-content-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </span>

        <ul className='absolute z-50 w-full mt-2 overflow-auto rounded-md cursor-pointer bg-palette-3 max-h-64'>
        {searchResults.map((result) => (
          <Link
            onClick={() => setVisibleSearchPanel(false)}
            key={result.user.id}
            to={`profile/${result.user.username}`}
          >
            <li className='box-border relative left-0 flex w-full gap-2 py-3 pl-2 overflow-hidden list-none hover:bg-palette-4'>
              <img className='flex object-cover w-10 h-10 mt-auto mb-auto mr-0 transition-all rounded-full' src={`${BASE_BACKEND_URL}${result.foto_perfil}`} alt='Foto de perfil' />
              <span className='flex items-center text-lg transition-all'>{result.user.username}</span>
            </li>
          </Link>
        ))}
        </ul>
      </div>

    </>
  )
}

export default SearchPanel
