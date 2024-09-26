"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const chat_controller_1 = require("../controllers/chat-controller");
router.route('/createChat').post(chat_controller_1.createChat); //creates a new chat
router.route('/saveMessages').post(chat_controller_1.saveMessages); //save each user input and corresponding response to that
router.route('/editTitle').patch(chat_controller_1.editTitle); //renames the title of the chat
router.route('/getChatMessages/:id').get(chat_controller_1.getChatMessages); //get the message of a chat id
router.route('/deleteChat').delete(chat_controller_1.deleteChat); // deletes the chat and the chat messages 
router.route('/getAllChats').get(chat_controller_1.getAllChats); // fetches all the chats from the chats table
exports.default = router;
