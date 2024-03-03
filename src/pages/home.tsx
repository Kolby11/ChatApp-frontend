import ChatDetail from '@/components/ChatDetail';
import CreateChatModal from '@/components/CreateChatModal';
import { useSocket } from '@/contexts/SocketContext';
import { ChatApi } from '@/lib/api/chatApi';
import { Types } from '@/lib/types';
import React, { useState, useEffect } from 'react';

function Home() {
  const socket = useSocket();
  const [myChats, setMyChats] = useState<Types.ChatPreview[]>([]);
  const [openedChat, setOpenedChat] = useState<string>('');


  const handleOpenChat = (id: string) => {
    setOpenedChat(id);
  }

  const handleStartCall = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();
    socket.socket?.emit('start-call', { chatId });
  };

  const fetchMyChats = async () => {
    const response = await ChatApi.getMyChats();
    if (response.status === 200) {
      setMyChats(response.data);
    }
  }

  // Clean up the socket connection when the component unmounts
  useEffect(() => {
    fetchMyChats()
    if (myChats.length > 0) {
      setOpenedChat(myChats[0]._id);
    }
  }, []);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-1/4 bg-black h-full flex flex-col px-4 py-2'>
        {myChats.map((chat, index) => {
          return (
            <div key={index} className={`${openedChat === chat._id ? 'bg-secondary' : 'bg-black'} flex justify-between items-center  h-14  px-4 py-2 text-white`}>
              <button className='h-full grow' onClick={() => handleOpenChat(chat._id)}>{chat.name} </button>
              <button onClick={e => handleStartCall(e, chat._id)} className='h-full flex justify-center items-center'>
                <span className="material-symbols-outlined">
                  call
                </span>
              </button>
            </div>
          );

        })}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn mt-auto" onClick={() => document.getElementById('create_chat_modal').showModal()}>Start new chat</button>
        <CreateChatModal />
      </div>

      <div className='w-3/4 h-full flex justify-center items-center space-x-10'>
        <ChatDetail chatId={openedChat} />
      </div>
    </div >
  );
}

export default Home;
