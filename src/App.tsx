import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login } from './pages/login'
import { Register } from './pages/register'
import Home from './pages/home'


function App() {
  return (
    <main className='App h-screen flex flex-col'>
      <Navbar />
      <div className='pt-16 grow'>

      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
