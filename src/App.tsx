import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login } from './pages/login'
import { Register } from './pages/register'
import Home from './pages/home'
import { ChatsContextProvider } from './contexts/ChatsContext'
import { AuthContextProvider } from './contexts/AuthContext'
import { SocketContextProvider } from './contexts/SocketContext'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContextProvider } from './contexts/UserContext'


function App() {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <ChatsContextProvider>
          <main className='App h-screen flex flex-col'>
            <Navbar />
            <div className='pt-16 grow'></div>
            <Routes>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<SocketContextProvider><Home /></SocketContextProvider>} />
              </Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </ChatsContextProvider>
      </AuthContextProvider >
    </UserContextProvider>
  );
}

export default App
