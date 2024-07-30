const {getConnection} = require('../models/db');

// Fetch all experts
// app.get('/experts',
const getExperts = async (req, res) => {
    try {
        const connection = await getConnection();

        const query = "SELECT email, full_name, phone_number FROM `users` WHERE `user_type` = 'expert'";
        const [results] = await connection.query(query);

        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create chat request
// app.post('/chats/request',

const getChatRequest = async (req, res) => {
    try {
        const connection = await getConnection();
        const { user_id1, user_id2, user1_name, user2_name, last_message_text } = req.body;
        const query = "INSERT INTO `chat` (`user_id1`, `user_id2`, `user1_name`, `user2_name`, `is_chat_accepted`, `last_message_text`) VALUES (?, ?, ?, ?, TRUE, ?)";
        const [results] = await connection.query(query, [user_id1, user_id2, user1_name, user2_name, last_message_text]);

        res.status(201).json({ chatId: results.insertId });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Fetch all available chats for user
// app.get('/chats/:userId',

const getChatForUserId = async (req, res) => {
    try {
        const connection = await getConnection();
        const userId = req.params.userId;
        const query = "SELECT chat_id, user_id1, user_id2, user1_name, user2_name, is_chat_accepted, last_message_text FROM `chat` WHERE `user_id1` = ? OR `user_id2` = ?";
        const [results] = await connection.query(query, [userId, userId]);

        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};



// Fetch one-to-one chats for chat id
// app.get('/messages/:chatId',

const getMessageForChatId = async (req, res) => {
    try {
        const connection = await getConnection();
        const chatId = req.params.chatId;
        const query = "SELECT * FROM `message` WHERE `chat_id` = ? ORDER BY `created_at` ASC";
        const [results] = await connection.query(query, [chatId]);

        res.status(200).json(results);
    } catch (err) {
        res.status(500).send(err);
    }
};


// Create message or send message
// app.post('/messages',

const createMessages = async (req, res) => {
    try {
        const connection = await getConnection();
        const { chat_id, sender_id, message_text } = req.body;
        const query = "INSERT INTO `message` (`chat_id`, `sender_id`, `message_text`) VALUES (?, ?, ?)";
        const [results] = await connection.query(query, [chat_id, sender_id, message_text]);

        res.status(201).json({ messageId: results.insertId });
    } catch (err) {
        res.status(500).send(err);
    }
};



module.exports = {getExperts, getChatRequest, getChatForUserId, getMessageForChatId, createMessages};
