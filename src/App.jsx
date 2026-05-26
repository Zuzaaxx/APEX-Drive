import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Start from './pages/Start.jsx'
import Login from './pages/Login.jsx'
import './App.css'

function getCurrentPath() {
  return window.location.pathname || '/'
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
      {path === '/login' ? <Login onNavigate={navigate} /> : <Start />}
    </>
  )
}

export default App
