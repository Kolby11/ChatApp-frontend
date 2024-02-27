import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import Navbar from './components/Navbar'


function App() {
  return (
    <main className='App'>
      <Navbar />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
