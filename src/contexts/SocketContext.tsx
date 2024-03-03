import { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useAddChatNotifications } from './ChatsContext';

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

type SendMessageProps = {
  message: string;
  chatId: string;
};

export const useSocketSendMessage = () => {
  const { socket } = useSocket();

  return (props: SendMessageProps) => {
    if (socket) {
      socket.emit('messageSend', JSON.stringify(props));
    }
  };

}

export function SocketContextProvider({ children }: ProviderProps) {
  const accessToken = useAuth().accessToken
  const updateNotifications = useAddChatNotifications();
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = () => {
    if (!accessToken) return;
    const newSocket = io('http://localhost:3000', { extraHeaders: { authorization: accessToken } });
    setSocket(newSocket);

    newSocket.on('messageReceived', (data) => {
      data = JSON.parse(data);
      updateNotifications(data._id);
    });
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

    return () => {
      if (socket) {
        socket.off('messageReceived');
        socket.disconnect();
      }
    };
  }, [accessToken]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
