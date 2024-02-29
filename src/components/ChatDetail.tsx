import { ChatApi } from '@/lib/api/chatApi'
import React, { useEffect, useState } from 'react'

type Props = {
  chatId: string
}
function ChatDetail(props: Props) {
  const { chatId } = props

  let [chatDetails, setChatDetails] = useState<any>({})

  useEffect(() => {
    async function fetchChatDetail() {
      const response = await ChatApi.getChatDetail(chatId)
      setChatDetails(response.data)
    }
    fetchChatDetail()

  }, [])
  console.log(chatId)
  const messages = [{ message: "Hello", sender: "user" }, { message: "Hi", sender: "bot" }, { message: "How are you?", sender: "user" }, { message: "I'm good, thanks", sender: "bot" }]
  return (
    <div className='w-full h-full flex flex-col px-4 py-4'>
      <div className='grow overflow-auto p-2 border-2 border-neutral rounded-xl'>
        {messages.map((message, index) => {
          return (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-primary' : 'bg-secondary'} text-white`}>
                {message.message}
              </div>
            </div>
          )
        })}
      </div>
      <form className='flex space-x-1 justify-center items-center mt-2'>
        <input type="text" className="input bg-secondary text-secondary-content w-full" />
        <input type="submit" value="Send" className="btn h-14 bg-primary text-primary-content" />
      </form>
    </div>
  )
}

export default ChatDetail