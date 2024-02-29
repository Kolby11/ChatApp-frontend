import React, { useEffect, useState } from 'react'
import { UserApi } from '@/lib/api/userApi';
import { Types } from '@/lib/types';
import { ChatApi } from '@/lib/api/chatApi';

function CreateChatModal() {
  const [chatName, setChatName] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [allUsers, setAllUsers] = useState<Types.UserPublic[]>([]);

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      const newSelectedUsers = selectedUsers.filter(user => user !== userId);
      setSelectedUsers(newSelectedUsers);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  }

  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  }


  const fetchAllUsers = async () => {
    const response = await UserApi.getAllUsers();
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      setAllUsers(data);
    }
  }

  const handleCreateChat = async () => {
    const response = await ChatApi.createChat({ name: chatName, userIds: selectedUsers });
    console.log(response);
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return (
    <dialog id="create_chat_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Start new chat!</h3>
        <div>
          <input type="text" className="input w-full mt-2" placeholder="Chat name" value={chatName} onChange={handleChatNameChange} />
          <h4 className=' mt-2'>Select users: </h4>
          <ul className='overflow-auto h-32 space-y-2 px-4 py-2'>
            {allUsers.map((user, index) => {
              return <li key={index}>
                <button className='flex justify-center items-center' onClick={() => handleSelectUser(user._id)}>
                  <span className="material-symbols-outlined">
                    {selectedUsers.includes(user._id) ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                  {user.email}
                </button>
              </li>;
            })}
          </ul>
        </div>
        <div className="modal-action">
          <form method="dialog" className='flex justify-between items-center w-full'>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            <button className="btn btn-primary" type="submit" onClick={handleCreateChat}>Create</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default CreateChatModal