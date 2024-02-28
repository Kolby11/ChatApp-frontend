import { createContext } from 'react'

type Auth = {
  isAuth: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<Auth>({
  isAuth: false,
  login: () => {}, // Provide a noop function as a placeholder
  logout: () => {},
})
