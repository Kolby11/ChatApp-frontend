import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { UserApi } from "@/lib/api/userApi";

type User = {
  _id: string,
  username: string,
  email: string,
};

type UserContextType = {
  user: User | null,
  setUser: (user: User) => void,
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
});

export const useUser = () => useContext(UserContext).user;
export const useSetUser = () => useContext(UserContext).setUser;

type ProviderProps = {
  children: React.ReactNode;
};

export function UserContextProvider({ children }: ProviderProps) {
  const accessToken = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    if (!accessToken) return;
    const userResponse = await UserApi.getCurrentUser();
    setUser(userResponse.data);
  }

  useEffect(() => {
    fetchUser();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};