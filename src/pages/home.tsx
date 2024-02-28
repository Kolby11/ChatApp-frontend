import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';



function Home() {
  const chats = ["awd", "awdas", "sdasd", "hgfh", "zxc"]
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

  // Clean up the socket connection when the component unmounts
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-1/4 bg-black h-full flex flex-col'>
        {chats.map((chat, index) => {
          return (
            <button key={index} className={`text-white h-14 flex justify-between items-center px-4 py-2 ${openedChat === chat ? 'bg-secondary' : 'bg-black'}`} onClick={() => handleOpenChat(chat)}>{chat} <button onClick={e => handleStartCall(e)} className=''>
              <span className="material-symbols-outlined">
                call
              </span>
            </button></button>
          );

        })}
      </div>

      <div className='w-3/4 h-full flex justify-center items-center space-x-10'>

        <button className='btn btn-primary' onClick={handleConnect}>Connect</button>
        <button className='btn btn-primary' onClick={handleDisconnect}>Disconnect</button>
      </div>
    </div >
  );
}

export default Home;
