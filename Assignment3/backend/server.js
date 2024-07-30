const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'calm-essence-db.cpjso9ykqf1z.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '#WebGroup8',
    database: 'calm_essence'  // Replace with your actual database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Fetch all experts
app.get('/experts', (req, res) => {
    const query = "SELECT email, full_name, phone_number FROM `users` WHERE `user_type` = 'expert'";
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Create chat request
app.post('/chats/request', (req, res) => {
    const { user_id1, user_id2, user1_name, user2_name, last_message_text } = req.body;
    const query = "INSERT INTO `chat` (`user_id1`, `user_id2`, `user1_name`, `user2_name`, `is_chat_accepted`, `last_message_text`) VALUES (?, ?, ?, ?, TRUE, ?)";
    db.query(query, [user_id1, user_id2, user1_name, user2_name, last_message_text], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ chatId: results.insertId });
        }
    });
});

// Fetch all available chats for user
app.get('/chats/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT chat_id, user_id1, user_id2, user1_name, user2_name, is_chat_accepted, last_message_text FROM `chat` WHERE `user_id1` = ? OR `user_id2` = ?";
    db.query(query, [userId, userId], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Fetch one-to-one chats for chat id
app.get('/messages/:chatId', (req, res) => {
    const chatId = req.params.chatId;
    const query = "SELECT * FROM `message` WHERE `chat_id` = ? ORDER BY `created_at` ASC";
    db.query(query, [chatId], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Create message or send message
app.post('/messages', (req, res) => {
    const { chat_id, sender_id, message_text } = req.body;
    const query = "INSERT INTO `message` (`chat_id`, `sender_id`, `message_text`) VALUES (?, ?, ?)";
    db.query(query, [chat_id, sender_id, message_text], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ messageId: results.insertId });
        }
    });
});
