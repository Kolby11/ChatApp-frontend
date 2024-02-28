import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login } from './pages/login'
import { Register } from './pages/register'
import Navbar from './components/Navbar'


function App() {
  return (
    <main className='App h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
