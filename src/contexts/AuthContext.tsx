import { ReactNode, useContext, useState } from 'react'

import { createContext } from 'react'

type AuthContextType = {
  accessToken: string | null
  login: (accessToken: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: () => { },
  logout: () => { },
})

type ProviderProps = {
  children: ReactNode
}
export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }: ProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const login = (accessToken: string) => setAccessToken(accessToken)
  const logout = () => setAccessToken(null)

  return <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>
}
