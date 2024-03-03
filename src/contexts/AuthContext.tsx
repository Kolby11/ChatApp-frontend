import { AuthApi } from '@/lib/api/authApi'
import { ReactNode, useContext, useEffect, useState } from 'react'

import { createContext } from 'react'

type AuthContextType = {
  accessToken: string | null
  isLoading: boolean
  login: (accessToken: string) => void
  logout: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  isLoading: true,
  login: () => { },
  logout: async () => {
    return false
  },
})

type ProviderProps = {
  children: ReactNode
}

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }: ProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const login = (accessToken: string) => setAccessToken(accessToken);

  const logout = async () => {
    const logoutResponse = await AuthApi.logout();
    if (logoutResponse.status === 204) {
      setAccessToken(null);
      return true
    }
    return false
  };

  const fetchAccessToken = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await AuthApi.refresh();
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}