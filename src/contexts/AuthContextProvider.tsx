import { ReactNode, useState } from 'react'
import { AuthContext } from './AuthContext'

type Props = {
  children: ReactNode // Use ReactNode for typing children
}

export function AuthContextProvider({ children }: Props) {
  const [isAuth, setIsAuth] = useState(false)

  const login = () => setIsAuth(true)
  const logout = () => setIsAuth(false)

  return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>
}
