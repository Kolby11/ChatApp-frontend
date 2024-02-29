import ChatDetail from '@/components/ChatDetail';
import CreateChatModal from '@/components/CreateChatModal';
import { ChatApi } from '@/lib/api/chatApi';

import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';



function Home() {
  const [myChats, setMyChats] = useState<{}[]>([]);
  const [openedChat, setOpenedChat] = useState<string>('');
  const [socket, setSocket] = useState<Socket | undefined>(undefined);


  const handleConnect = () => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    console.log('Connected to socket!');
  };

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(undefined);
      console.log('Disconnected from socket!');
    }
  };

  const handleOpenChat = (id: string) => {
    setOpenedChat(id);
  }

  const handleStartCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (socket) {
      socket.emit('start-call', 'test');
      console.log('Started a call!');
    }
  };

  const fetchMyChats = async () => {
    const response = await ChatApi.getMyChats();
    if (response.status === 200) {
      console.log(response);
      setMyChats(response.data);
    }
  }

  // Clean up the socket connection when the component unmounts
  useEffect(() => {
    fetchMyChats()
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-1/4 bg-black h-full flex flex-col px-4 py-2'>
        {myChats.map((chat, index) => {
          return (
            <button key={index} className={`text-white h-14 flex justify-between items-center px-4 py-2 ${openedChat === chat ? 'bg-secondary' : 'bg-black'}`} onClick={() => handleOpenChat(chat._id)}>{chat.name} <button onClick={e => handleStartCall(e)} className=''>
              <span className="material-symbols-outlined">
                call
              </span>
            </button></button>
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
