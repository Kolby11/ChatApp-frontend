import { createContext, useContext, useState } from "react";

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
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};