import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'

function App() {
  return (
    <main className=" flex min-h-screen w-screen items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
