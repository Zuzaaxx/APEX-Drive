import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Start from './pages/Start.jsx'
import Login from './pages/Login.jsx'
import Cars from './pages/Cars.jsx'
import CarDetail from './pages/CarDetail.jsx'
import Vouchers from './pages/Vouchers.jsx'
import Register from './pages/Register.jsx'
import Checkout from './pages/Checkout.jsx'
import './App.css'

function getCurrentPath() {
  return window.location.pathname || '/'
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
    if (to === path) {
      return
    }

    window.history.pushState({}, '', to)
    setPath(to)
  }

  return (
    <>
      <Navbar onNavigate={navigate} currentPath={path} />
      {path === '/login' ? (
        <Login onNavigate={navigate} />
      ) : path === '/register' ? (
        <Register onNavigate={navigate} />
      ) : getCarSlug(path) ? (
        <CarDetail slug={getCarSlug(path)} onNavigate={navigate} />
      ) : path === '/cars' ? (
        <Cars onNavigate={navigate} />
      ) : path === '/vouchers' ? (
        <Vouchers onNavigate={navigate} />
      ) : path === '/checkout' ? (
        <Checkout onNavigate={navigate} />
      ) : (
        <Start onNavigate={navigate} />
      )}
    </>
  )
}

export default App
