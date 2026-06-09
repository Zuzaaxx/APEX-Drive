import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Start from './pages/Start.jsx'
import Login from './pages/Login.jsx'
import Cars from './pages/Cars.jsx'
import CarDetail from './pages/CarDetail.jsx'
import Vouchers from './pages/Vouchers.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/Account.jsx'
import About from './pages/About.jsx'
import Notify from './pages/Notify.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

import { getCarBySlug } from './data/cars.js'

function getCurrentPath() {
  return window.location.pathname || '/'
}

function getPathname(route) {
  const withoutHash = route.split('#')[0] || '/'
  return withoutHash.split('?')[0] || '/'
}

function getCarSlug(path) {
  if (!path.startsWith('/cars/')) {
    return null
  }
  return path.slice('/cars/'.length) || null
}

function App() {
  const [path, setPath] = useState(getCurrentPath)

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCurrentPath())
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to) => {
    const targetPath = getPathname(to)
    const hash = to.includes('#') ? to.slice(to.indexOf('#')) : ''

    if (targetPath === path) {
      if (hash) {
        window.setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      } else {
        window.history.replaceState({}, '', to)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    window.history.pushState({}, '', to)
    setPath(targetPath)
  }

  return (
    <>
      <Navbar onNavigate={navigate} currentPath={path} />
      {path === '/login' ? (
        <Login onNavigate={navigate} />
      ) : path === '/register' ? (
        <Register onNavigate={navigate} />
      ) : getCarSlug(path) ? (
        getCarBySlug(getCarSlug(path)) ? (
          <CarDetail slug={getCarSlug(path)} onNavigate={navigate} />
        ) : (
          <NotFound onNavigate={navigate} />
        )
      ) : path === '/cars' ? (
        <Cars onNavigate={navigate} />
      ) : path === '/vouchers' ? (
        <Vouchers onNavigate={navigate} />
      ) : path === '/account' ? (
        <Account onNavigate={navigate} />
      ) : path === '/about' ? (
        <About onNavigate={navigate} />
      ) : path === '/notify' ? (
        <Notify onNavigate={navigate} />
      ) : path === '/' ? (
        <Start onNavigate={navigate} />
      ) : (
        <NotFound onNavigate={navigate} />
      )}
    </>
  )
}

export default App
