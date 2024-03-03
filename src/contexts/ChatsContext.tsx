import { ReactNode, useState, useCallback, useContext } from "react";
import { createContext } from 'react';

type Chat = {
  _id: string,
  notifications: number,
};

type ChatsContextType = {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  resetNotifications: (chatId: string) => void;
  addNotifications: (chatId: string, newNotifications?: number) => void;
};


export const ChatsContext = createContext<ChatsContextType>({
  chats: [],
  setChats: () => { },
  resetNotifications: () => { },
  addNotifications: () => { },
});

type ProviderProps = {
  children: ReactNode;
};

export const useAddChatNotifications = () => {
  return useContext(ChatsContext).addNotifications;
}

export const useNotification = () => {
  return useContext(ChatsContext).chats;
}

export const useResetNotifications = () => {
  return useContext(ChatsContext).resetNotifications;
}

export function ChatsContextProvider({ children }: ProviderProps) {
  const [chats, setContextChats] = useState<Chat[]>([]);

  const setChats = (chats: Chat[]) => {
    setContextChats(chats);
  };

  const addNotifications = useCallback((chatId: string, number: number = 1) => {
    setContextChats(chats => {
      const chatIndex = chats.findIndex(chat => chat._id === chatId);

      if (chatIndex !== -1) {
        const updatedChats = [...chats];
        updatedChats[chatIndex] = { ...updatedChats[chatIndex], notifications: updatedChats[chatIndex].notifications + number };
        return updatedChats;
      } else {
        return [...chats, { _id: chatId, notifications: number }];
      }
    });
  }, []);

  const resetNotifications = (chatId: string) => {
    setContextChats(chats => {
      const chatIndex = chats.findIndex(chat => chat._id === chatId);
      if (chatIndex !== -1) {
        const updatedChats = [...chats];
        updatedChats[chatIndex] = { ...updatedChats[chatIndex], notifications: 0 };
        return updatedChats;
      } else {
        return chats;
      }
    });
  };

  return (
    <ChatsContext.Provider value={{ chats, setChats, addNotifications, resetNotifications }}>
      {children}
    </ChatsContext.Provider>
  );
}
