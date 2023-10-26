import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'
import { SelectedProvider } from './context/selectedNavItem'
import { LoadingProvider } from './context/loading'
import { Spinner } from '@nextui-org/react'

import { IndexPage } from './pages/IndexPage'
import { FormDataProvider } from './context/formData'
import { VerficationCodeProvider } from './context/verificationCode'

const VerificationViewPage = lazy(() => import('./pages/VerificationViewPage'))
const NavBar = lazy(() => import('./components/NavBar'))
const SideBar = lazy(() => import('./components/SideBar'))
const RegisterForm = lazy(() => import('./pages/RegisterPage'))
const PostView = lazy(() => import('./components/posts/PostView'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const Config = lazy(() => import('./pages/ConfigPage'))
const AddPost = lazy(() => import('./components/posts/AddPost'))
const EditProfile = lazy(() => import('./components/profile/EditProfile'))
const SearchPanel = lazy(() => import('./components/SearchPanel'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const LoginForm = lazy(() => import('./pages/LoginPage'))

function App () {
  const token = window.localStorage.getItem('token')
  const verification = window.localStorage.getItem('Code verification')
  const isLoggedIn = !!token
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const [visibleSearchPanel, setVisibleSearchPanel] = useState(false)
  const [navBarView, setNavBarView] = useState(true)

  useEffect(() => {
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }
  , [token])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('selectedNavItem')
    setLoggedIn(false)
  }

  return (
    <BrowserRouter basename='/frontend'>

      {loggedIn
        ? (
        <LoadingProvider>

          <SelectedProvider>
            <Suspense fallback={<Spinner />}>
              <SideBar setNavBarView={setNavBarView} />
            </Suspense>
          </SelectedProvider>

          <div className='flex h-[calc(100vh-84px)] overflow-hidden'>
              {navBarView
                ? <Suspense fallback={<Spinner />}>
                    <NavBar />
                  </Suspense>
                : null}

            <div className={`flex flex-col flex-1 overflow-hidden overflow-y-auto ${
              navBarView ? 'max-md:mb-14 ' : ''
            }`}>

            <Suspense fallback={<Spinner className='mt-4' size='lg' />}>
              {visibleSearchPanel && <SearchPanel setVisibleSearchPanel={setVisibleSearchPanel} />}

              <Routes>
                <Route path='/' element={<IndexPage />} />
                <Route path='/publicacion/:id' element={<PostView />} />
                <Route path='/profile/:username' element={<ProfilePage />} />
                <Route path='/notifications' element={<NotificationsPage />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/configuracion' element={<Config handleLogout={handleLogout} />} />
                <Route path='/crear_publicacion' element={<AddPost setNavBarView={setNavBarView} />} />
                <Route path='/update_profile' element={<EditProfile />} />
              </Routes>
            </Suspense>

            </div>
          </div>
          </LoadingProvider>
          )
        : (
          <Suspense fallback={<Spinner />}>
            <FormDataProvider>
              <VerficationCodeProvider>
                <Routes>
                  <Route path='/' element={<LandingPage setLoggedIn={setLoggedIn} />} />
                  <Route path='/register' element={<RegisterForm setLoggedIn={setLoggedIn} />} />
                  <Route path='/register/code_verification' element={verification ? <VerificationViewPage setLoggedIn={setLoggedIn} /> : <Navigate to='/register' />} />
                  <Route path='/login' element={<LoginForm setLoggedIn={setLoggedIn} />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </VerficationCodeProvider>
            </FormDataProvider>
          </Suspense>
          )
      }

    </BrowserRouter>
  )
}

export default App
