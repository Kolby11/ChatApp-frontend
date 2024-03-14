import { useSocketSendMessage } from '@/contexts/SocketContext'
import { ChatApi } from '@/lib/api/chatApi'
import { Types } from '@/lib/types'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from './ui/FormInput'
import { useUser } from '@/contexts/UserContext'
import { useNotification, useResetNotifications } from '@/contexts/ChatsContext'

type Props = {
  chatId: string
}

function ChatDetail(props: Props) {
  const user = useUser()
  const sendMessage = useSocketSendMessage()
  const chatNotifications = useNotification();
  const { chatId } = props

  let [chatDetails, setChatDetails] = useState<Types.ChatDetail | null>(null)

  type SendMessageValues = {
    message: string
  }

  const { register, handleSubmit } = useForm<SendMessageValues>()

  const onSubmit: SubmitHandler<SendMessageValues> = async data => {
    sendMessage({ message: data.message, chatId })

    // On submit add message to chatDetails only in memory -- can be unreliable
    if (user && chatDetails) {
      setChatDetails({
        ...chatDetails,
        messages: [
          ...chatDetails.messages,
          {
            message: data.message,
            user: {
              _id: user?._id,
              username: user?.username
            }
          }
        ]
      })
    }
  }

  async function fetchChatDetail() {
    if (!chatId) return
    const response = await ChatApi.getChatDetail(chatId)
    setChatDetails(response.data)
  }

  useEffect(() => {
    fetchChatDetail()

  }, [props, user])

  const resetNotifications = useResetNotifications();


  useEffect(() => {
    if (chatNotifications.find(cn => cn._id === chatId)?.notifications) {
      fetchChatDetail();
      resetNotifications(chatId);
    }
  }, [chatNotifications]);

  return (
    <div className='w-full h-full flex flex-col px-4 py-4'>
      <div className='grow overflow-auto p-2 border-2 border-neutral rounded-xl'>
        {chatDetails?.messages?.map((message, index) => {
          return (
            <div key={index} className={`flex ${message.user._id === user?._id ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`flex-col ${message.user._id === user?._id ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-2 rounded-lg ${message.user._id === user?._id ? 'bg-primary' : 'bg-secondary'} text-white`}>
                  {message.message}
                </div>
                <p className=' text-xs'>{message.user.username}</p>
              </div>
            </div>
          )
        })}
      </div>
      <form className='flex space-x-1 justify-center items-center mt-2' onSubmit={handleSubmit(onSubmit)}>
        <FormInput inputProps={register('message')} type="text" />
        <input type="submit" value="Send" className="btn h-14 bg-primary text-primary-content" />
      </form>
    </div>
  )
}

export default ChatDetail