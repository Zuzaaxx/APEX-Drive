import { useEffect, useState } from 'react'
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
    path === '/login' ? (
      <Login onNavigate={navigate} />
    ) : (
      <Start onNavigate={navigate} />
    )
  )
}

export default App
