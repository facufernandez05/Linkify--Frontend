import { useEffect, useState } from 'react'
import { Footer } from '../components/landing/Footer'
import { Header, headerOptions } from '../components/landing/Header'
import { Home } from '../components/landing/Home'
import { Info } from '../components/landing/Info'
import { Terminos } from '../components/landing/Terminos'

export function LandingPage () {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  return (
    <main className='flex flex-col justify-between w-full min-h-screen bg-white'>
      <Header setShow={setShow} />
      <OptionsOffCanvas show={show} setShow={setShow} />
      <div className='flex flex-col w-full gap-10 mt-24 md:gap-20'>
        <Home />
        <Info />
        <Terminos />

      </div>
      <Footer />
    </main>
  )
}

function OptionsOffCanvas ({ show, setShow }) {
  return (
      <div className={`flex items-center w-full h-screen bg-palette-2 ${show ? 'block' : 'hidden'} fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out`}>
        <button className='absolute top-0 right-0 p-4 text-2xl text-white' onClick={() => setShow(false)}>
          X
        </button>

        <ul className='flex flex-col items-center w-full gap-8'>
        {headerOptions?.map(option => (
          <a key={option.href} href={option.href} onClick={() => setShow(false)}>
            <li className='text-2xl'>
              <p>{option.label}</p>
            </li>
          </a>
        ))}
        </ul>
      </div>
  )
}

export default LandingPage
