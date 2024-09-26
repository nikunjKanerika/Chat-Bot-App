import { Router } from "express";
const router = Router()

import {createChat,saveMessages,editTitle,deleteChat,getAllChats, getChatMessages} from '../controllers/chat-controller'

router.route('/createChat').post(createChat);  //creates a new chat
router.route('/saveMessages').post(saveMessages);  //save each user input and corresponding response to that
router.route('/editTitle').patch(editTitle);   //renames the title of the chat
router.route('/getChatMessages/:id').get(getChatMessages);   //get the message of a chat id
router.route('/deleteChat').delete(deleteChat); // deletes the chat and the chat messages 
router.route('/getAllChats').get(getAllChats); // fetches all the chats from the chats table


export default router;