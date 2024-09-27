import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatList from './components/ChatList';
import MinChatList from './components/MinChatList';
import { createChat, editChatTitle,delChat, saveMessages, getChatMessages} from './service/api';
const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [minChatList, setMinChatList] = useState(false);
  // const [chatMesssages, setChatMessages] = useState()  //{id: chat_id, messages:[user,response,isLoading]}

  
  const getChatbotResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.  ');
      }, 3000); 
    });
  };

  // Create a new chat
  const createNewChat = async () => {
    const newChat = {
      id: Date.now(),
      title: 'Untitled Chat',
      messages: []
    };
    setChats([ newChat,...chats]);
    setSelectedChatId(newChat.id);
    const response = await createChat(newChat.id,newChat.title);
    const chat = await response.json();

  };


  //Selects the chat and get all the messages of that particular chat
  const selectChat = async (id) => {

    setSelectedChatId(id);

  };

  // Delete a chat
  const deleteChat = async (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
    const response = await delChat(id);
    const data = await  response.json();
    console.log(data.message);
    if (selectedChatId === id) {
      setSelectedChatId(null);
    }
  };

  // Update chat title
  const updateChatTitle = async (id, newTitle) => {
  
    setChats(
      chats.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      )
    );

    const response = await editChatTitle(id,newTitle);
    const data = await response.json();
    

  };


  
  const selectedChat =  chats.find((chat) => chat.id === selectedChatId);
  const minimiseChatList = () =>{
    setMinChatList(prev=>!prev)
}
  return (
    <div className="flex h-screen">
      {
        !minChatList ?
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          selectChat={selectChat}
          deleteChat={deleteChat}
          updateChatTitle={updateChatTitle}
          createNewChat={createNewChat}
          minimiseChatList={minimiseChatList}
          setChats={setChats}
          setSelectedChatId={setSelectedChatId}
          
        />
        : 
        <MinChatList minimiseChatList={minimiseChatList} />
      }
      
      <ChatWindow chat={selectedChat} getChatbotResponse={getChatbotResponse} selectedChatId={selectedChatId} />
    </div>
  );
};

export default App;

