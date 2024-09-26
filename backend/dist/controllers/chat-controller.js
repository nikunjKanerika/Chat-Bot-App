"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = exports.deleteChat = exports.getChatMessages = exports.editTitle = exports.saveMessages = exports.createChat = void 0;
const db_1 = require("../db/db");
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title } = req.body;
    console.log(req.body);
    if (!id || !title) {
        return res.status(400).json({ error: 'ID and title are required.' });
    }
    try {
        const query = 'INSERT INTO chats (id, title) VALUES ($1, $2) RETURNING *';
        const values = [id, title];
        const result = yield db_1.client.query(query, values);
        const newChat = result.rows[0];
        res.status(201).json({ message: 'Successfully created' });
    }
    catch (error) {
        console.error('Error creating chat:', error.message);
        res.status(500).json({ error: 'An error occurred while creating the chat.' });
    }
});
exports.createChat = createChat;
const saveMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id, user, botResponse } = req.body;
    if (!chat_id || !user || botResponse === undefined) {
        return res.status(400).json({ error: 'Chat ID, user, and response are required.' });
    }
    try {
        // Insert a new message into the messages table
        const query = 'INSERT INTO messages (chat_id, user_input, response) VALUES ($1, $2, $3) RETURNING *';
        const values = [chat_id, user, botResponse];
        const result = yield db_1.client.query(query, values);
        const newMessage = result.rows[0];
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error saving message:', error.message);
        res.status(500).json({ error: 'An error occurred while saving the message.' });
    }
});
exports.saveMessages = saveMessages;
const editTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newTitle } = req.body;
    if (!id || !newTitle) {
        return res.status(400).json({ error: 'Chat ID and new title are required.' });
    }
    try {
        // Update the title 
        const query = 'UPDATE chats SET title = $1 WHERE id = $2 RETURNING *';
        const values = [newTitle, id];
        const result = yield db_1.client.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Chat not found.' });
        }
        const updatedChat = result.rows[0];
        console.log(updatedChat);
        res.status(200).json(updatedChat);
    }
    catch (error) {
        console.error('Error updating chat title:', error.message);
        res.status(500).json({ error: 'An error occurred while updating the chat title.' });
    }
});
exports.editTitle = editTitle;
const getChatMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Chat ID is required.' });
    }
    try {
        // retrieve messages for the specified chat_id 
        const query = 'SELECT user_input,response FROM messages WHERE chat_id = $1 ORDER BY id ASC';
        const values = [id];
        const result = yield db_1.client.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'No messages found for this chat.' });
        }
        const messages = result.rows;
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error retrieving messages:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving the messages.' });
    }
});
exports.getChatMessages = getChatMessages;
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Chat ID is required.' });
    }
    try {
        const query = 'DELETE FROM chats WHERE id=$1';
        const values = [id];
        const result = yield db_1.client.query(query, values);
        if (result.rowCount == 0) {
            res.status(404).json({ error: 'Chat not found' });
        }
        res.status(200).json({ message: 'Chat deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting chat:', error.message);
        res.status(500).json({ error: 'An error occurred while deleting the chat.' });
    }
});
exports.deleteChat = deleteChat;
const getAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT id,title from chats ORDER BY id DESC';
        const result = yield db_1.client.query(query);
        if (result.rowCount == 0) {
            return res.status(404).json({ error: 'No chat found' });
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error('Error fetching chats:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllChats = getAllChats;
