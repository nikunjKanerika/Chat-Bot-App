import { useRef, useState, useEffect } from 'react';
import { getChatMessages } from '../service/api';
import { saveMessages } from '../service/api';
import logo from '../assets/kanerika_logo.jpg'
import StartChat from './StartChat';
const ChatWindow = ({ chat, getChatbotResponse,selectedChatId }) => {
    const [inputText, setInputText] = useState('');
    const [disableSend, setDisableSend] = useState(false);
    const [chatMessages,setChatMessages] = useState([])
    const recentChatRef = useRef(null);
  
    // Scroll to the recent chat && enable the send button
    useEffect(() => {
       
      if (recentChatRef.current) {
        recentChatRef.current.scrollIntoView({ behavior: 'smooth' });
      }

          const lastMessage = chatMessages ? chatMessages[chatMessages.length - 1] : '';
            if (lastMessage && !lastMessage.isLoading) {
              setDisableSend(false); 
            }
      
    }, [chatMessages,selectedChatId]);
    
    useEffect(()=>{
        const fetchMessages = async () =>{
            const response = await getChatMessages(selectedChatId);
            setChatMessages([])
            if (response?.ok) {
            const data = await response.json();

            const updatedData = data.map(item => ({
            ...item,
            isLoading: false
            }));

            console.log(updatedData);
            setChatMessages(updatedData);
            } else {
            console.error('Error in fetching messages,dddddddddddd');
            }

        }
        fetchMessages();
    },[selectedChatId])

    const sendMessage = async (text) => {
        console.log(text);
        const userMessage = { user_input: text, response: '', isLoading: true };

// Update the chatMessages by appending the userMessage
        setChatMessages((prevMessages) => [
        ...prevMessages,    
        userMessage         
        ]);
      
   const response = await getChatbotResponse();

   setChatMessages((prevMessages) => {
    
        const updatedMessages = [...prevMessages];

        const lastIndex = updatedMessages.length - 1;

        
        updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            response: response,  
            isLoading: false,    
        }

        setChatMessages(updatedMessages);
    });
    // console.log(selectedChatId,userMessage.user,response);
        const res = await saveMessages(selectedChatId,text,response);
        const data = await res.json();
      };


    const handleSendMessage = () => {
      if (inputText.trim() !== '') {
        setDisableSend(true)
        sendMessage(inputText);
        setInputText('');
  
        setTimeout(() => {
          if (recentChatRef.current) {
            recentChatRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
  
    return (
      <div className="flex-1 bg-white pb-8 pt-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 pr-20 pl-20">
          {chatMessages ? (
            chatMessages && chatMessages.length > 0 ? (
              chatMessages?.map((message, index) => (
                <div key={index} className="mb-4">
                  {/* User message */}
                  <div className="flex justify-end items-center space-x-2">
                  

                    <div className="bg-gray-100 text-gray-700 p-3 rounded-2xl max-w-xs break-words">
                      {message.user_input}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>

                  </div>
  
                  {/* Chatbot response */}
                  <div className="flex justify-start items-start mt-2 -space-x-3">
                    <img src={logo} alt="bot-logo" width={35} className='mr-2 mt-3'/>
                    <div className="bg-white text-gray-700 p-3 rounded-2xl w-full break-words">
                      {         
                        message.isLoading ? (
                        <div className='mt-2'>
                            <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-200 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        </div>
                      ) : (
                        message.response
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <StartChat />
            )
          ) : (
            <p className="text-gray-800">Create a new chat.</p>
          )}
  
          <div ref={recentChatRef}></div>
        </div>
  
        {/* Container for textarea and send button */}
        <div className="flex items-center justify-between bg-gray-100 relative w-3/4 m-auto p-2 rounded-2xl">
          <textarea
            className="resize-none w-full bg-gray-100 text-black border-none rounded-2xl p-2 focus:outline-none"
            placeholder="Type a message..."
            value={inputText}
            rows="1"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !disableSend) {
                handleSendMessage();
                e.preventDefault();
              }
            }}
          />
          {/* Send button */}
          
          <div className="flex items-center ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`text-gray-900 cursor-pointer hover:text-gray-500 hover:cursor-pointer size-9 ${
                inputText.trim() === '' ? 'opacity-50' : ''
              }`}
              
              onClick={!disableSend ? handleSendMessage : null} 
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatWindow;
  
