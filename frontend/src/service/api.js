const BASE_URL = process.env.REACT_APP_BASE_URL;

//Request for creating a new chat
const createChat = async (id,title) =>{
    
    try{
        const response = await fetch(`${BASE_URL}/api/v1/createChat`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
                
            },
            body:JSON.stringify({id,title})
        })

        return response;
    }catch(error){
        console.error(error.message)
    }
}

//Request for renaming the chat's title
const editChatTitle = async (id,newTitle) =>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/editTitle`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',                 
            },
            body:JSON.stringify({id,newTitle})
        })

        return response;
    }catch(error){
        console.error(error.message)
    }
}
//Request for getting all the messages for a particular chat
const getChatMessages = async (id) =>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/getChatMessages/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json', 
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch chat messages: ${response.statusText}`);
        }

        return response;
    }catch(error){
        console.error(error.message)
    }
}
//Request for deleting the particular chat
const delChat = async(id) =>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/deleteChat`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json', 
                
            },
            body:JSON.stringify({id})
        })

        return response;
    }catch(error){
        console.error(error.message)
    }
}
//Request for all the chats created
const getAllChats =  async() =>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/getAllChats`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json', 
                
            }
        })

        return response;
    }catch(error){
        console.error(error.message)
    }
}

// Request for saving the each user input and response 
const saveMessages = async(id,user,botResponse) =>{
    console.log(id,user,botResponse);
    try{
        const response = await fetch(`${BASE_URL}/api/v1/saveMessages`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
                
            },
            body:JSON.stringify({chat_id: id, user, botResponse})
        })

        return response;
    }catch(error){
        console.error(error.message)
    }
}

export{createChat, editChatTitle, getChatMessages,delChat,getAllChats,saveMessages}