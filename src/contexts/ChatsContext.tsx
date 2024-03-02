import { ReactNode, useState } from "react"
import { createContext } from 'react'

type Chat = {
  id: string,
  notifications: number,
}

type ChatsContextType = {
  chats: Chat[]
  setChats: (chats: Chat[]) => void
}

export const ChatsContext = createContext<ChatsContextType>({
  chats: [],
  setChats: () => { },
})

type ProviderProps = {
  children: ReactNode
}

export function ChatsContextProvider({ children }: ProviderProps) {
  const [chats, setContextChats] = useState<Chat[]>([])

  const setChats = (chats: Chat[]) => {
    setContextChats(chats)
  }

  return (
    <ChatsContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatsContext.Provider>
  )
}