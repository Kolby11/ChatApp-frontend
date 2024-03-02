import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAuth } from './AuthContext';

type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  connectSocket: () => { },
  disconnectSocket: () => { },
});

export const useSocket = () => useContext(SocketContext);

type ProviderProps = {
  children: React.ReactNode;
};

export function SocketContextProvider({ children }: ProviderProps) {
  const accessToken = useAuth().accessToken
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    if (!accessToken) return;
    const newSocket = io('http://localhost:3000', { auth: { token: accessToken } }); // Replace with your server URL
    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  // Automatically connect the socket when the provider is mounted
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
