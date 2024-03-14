import { useNotification, useResetNotifications } from '@/contexts/ChatsContext';
import { useSocket } from '@/contexts/SocketContext';
import React from 'react'

type Props = {
  chat: {
    _id: string;
    name: string;
  };
  openedChat: string;
  setOpenedChat: (id: string) => void;
}

function ChatPreview({ chat, openedChat, setOpenedChat }: Props) {
  const chatNotifications = useNotification();
  const resetNotifications = useResetNotifications();
  const { socket } = useSocket();

  const notificationCount = chatNotifications.find(cn => cn._id === chat._id)?.notifications || 0;

  const handleStartCall = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();
    socket?.emit('start-call', { chatId });
  };

  const handleOpenChat = (id: string) => {
    setOpenedChat(id);
    resetNotifications(id);
  };

  return (
    <div className={`${openedChat === chat._id ? 'bg-primary' : ' bg-secondary'} btn flex justify-between items-center h-14 px-4 py-2 text-white`}>
      <button className='h-full grow' onClick={() => handleOpenChat(chat._id)}>
        <div className='flex space-x-2'>
          {notificationCount > 0 && <span className='bg-red-500 text-white rounded-full px-2'>{notificationCount}</span>}
          <p>{chat.name}</p>
        </div>
      </button>
      <button onClick={e => handleStartCall(e, chat._id)} className='h-full flex justify-center items-center'>
        <span className="material-symbols-outlined">call</span>
      </button>
    </div>
  );
}

export default ChatPreview;