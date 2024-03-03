import ChatDetail from '@/components/ChatDetail';
import ChatPreview from '@/components/ChatPreview';
import CreateChatModal from '@/components/CreateChatModal';
import { ChatApi } from '@/lib/api/chatApi';
import { Types } from '@/lib/types';
import { useState, useEffect } from 'react';

function Home() {
  const [myChats, setMyChats] = useState<Types.ChatPreview[]>([]);
  const [openedChat, setOpenedChat] = useState<string>('');

  const fetchMyChats = async () => {
    const response = await ChatApi.getMyChats();
    if (response.status === 200) {
      setMyChats(response.data);
      if (response.data.length > 0) {
        setOpenedChat(response.data[0]._id);
      }
    }
  };

  useEffect(() => {
    fetchMyChats();
  }, []);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-1/4 bg-black h-full flex flex-col px-4 py-2'>
        {myChats.map((chat, index) => (
          <ChatPreview
            key={index}
            chat={chat}
            openedChat={openedChat}
            setOpenedChat={setOpenedChat}
          />
        ))}
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

