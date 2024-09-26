import { useEffect, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import { getAllChats } from '../service/api';
import {ReactComponent as Logo} from '../assets/kanerika_main.svg'
const ChatList = ({ chats, setChats,selectedChatId,minimiseChatList, selectChat, deleteChat, updateChatTitle, createNewChat }) => {
  const [editTitleId, setEditTitleId] = useState(null); //For editing the selected chat id
  const [newTitle, setNewTitle] = useState('');  //For a new title of a chat
  const [openMenuId, setOpenMenuId] = useState(null); // To track the open dropdown for each chat
  const [hoveredChatId, setHoveredChatId] = useState(null); // To track the hovered chat

  const handleEditTitle = (id, title) => {
    setEditTitleId(id);
    setNewTitle(title);
    setOpenMenuId(null); 
  };

  const handleSaveTitle = (id) => {
    updateChatTitle(id, newTitle);
    setEditTitleId(null);
  };

  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); 
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getAllChats();
        if (response.ok) {
          const chats = await response.json();
    
          const updatedChats = chats.map(chat => ({
            ...chat,
            messages: [],
          }));
  
          setChats(updatedChats);
        } else {
        //   console.error('No chats found');
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    fetchChats();
  }, []);
  return (
    <div className="w-1/5 pt-2 pr-0 pl-1 flex flex-col" style={{ backgroundColor: '#f9f9f9' }}>
      {/* Header with Title and create chat icon */}
      <div className="flex flex-row mb-6 justify-between shadow-sm p-2">
        
        {/* <h2 className="text-xl font-semibold pt-1 text-gray-500">Kanerika</h2> */}
        
        <Logo className='w-28'/> 
        
        
        {/* create a chat button  */}
        <div className='flex justify-between'>
        <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill='currentColor'
            className="size-8 hover:cursor-pointer text-gray-500  hover:bg-gray-300 rounded-lg"
            onClick={createNewChat}
          > 
            <path 
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" 
              clipRule="evenodd" 
            
            />
        </svg>
        {/* close bar button  */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-8 text-gray-500 hover:cursor-pointer hover:bg-gray-300 rounded-lg"
            onClick={minimiseChatList}
            >
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18 18 6M6 6l12 12" 
                />
           
        </svg>
        </div>
        

      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto pr-2 ">
        {chats.length === 0 ? (
          <p className='text-gray-800'>No saved chats</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`mb-2 p-2 text-sm text-gray-800 rounded-lg ${
                selectedChatId === chat.id
                  ? 'bg-gray-200' // Stick to gray-500 when selected
                  : 'hover:bg-gray-200' // Apply hover only when not selected
              } hover:cursor-pointer`}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
              onClick={()=>selectChat(chat.id)}
            >
              {editTitleId === chat.id ? (
                <div className="flex space-x-2 h-6">
                  <input
                    type="text"
                    className="flex-1 py-0.5 rounded focus:outline-sky-600 overflow-auto bg-gray-200 text-black"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        handleSaveTitle(chat.id);  
                        }
                    }}
                  />
                  
                </div>
              ) : (
                <div className="flex justify-between items-center " >
                  <p
                    className="cursor-pointer font-medium overflow-hidden whitespace-nowrap"
                    
                  >
                    {chat.title}
                  </p>
                  {hoveredChatId === chat.id && (
                    <div className="relative">
                      <EllipsisHorizontalIcon
                        className="h-5 w-5 text-gray-400 hover:text-gray-500 hover:cursor-pointer"
                        onClick={() => handleMenuClick(chat.id)}
                      />
                      {openMenuId === chat.id && (
                        <div className="absolute right-0 bg-white border rounded-lg shadow-lg z-40">
                          <p
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                            onClick={() => handleEditTitle(chat.id, chat.title)}
                          >
                            Rename
                          </p>
                          <p
                            className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                            onClick={() => deleteChat(chat.id)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
