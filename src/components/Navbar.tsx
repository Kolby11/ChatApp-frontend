import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'
import { themeChange } from 'theme-change'

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
]

function Navbar() {
  const user = useUser()
  const { accessToken, logout } = useAuth()

  const handleLogout = async () => {
    const loggedOut = await logout()
    if (loggedOut) {
      redirect('/login')
    }
  }

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <nav className="navbar absolute h-16 justify-between bg-primary">
      <select data-choose-theme className=" select">
        {themes.map((theme, i) => {
          return <option value={theme} key={i}>{theme.slice(0, 1).toUpperCase() + theme.slice(1)}</option>
        })}
      </select>
      <div className="flex items-center justify-center space-x-4">
        {accessToken ? (
          <>
            <p>{user?.username}</p>
            <Link to="/Home" className="btn link btm-nav-sm">Home</Link>
            <button className="btn link btm-nav-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn link btm-nav-sm">
              Login
            </Link>
            <Link to="/register" className="btn link btm-nav-sm">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  )
}

export default Navbar
