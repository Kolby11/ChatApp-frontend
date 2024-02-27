import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <nav className="justify-between h-16 navbar bg-primary">
      <select data-choose-theme className=' select'>
        {themes.map((theme) => {
          return (<option value={theme}>{theme.slice(0, 1).toUpperCase() + theme.slice(1)}</option>)
        })}
      </select>
      <div className='flex justify-center items-center space-x-4'>
        <Link to="/login" className="link btn btm-nav-sm">Login</Link>
        <Link to="/register" className="link btn btm-nav-sm">Register</Link>
      </div>
    </nav >
  )
}

export default Navbar