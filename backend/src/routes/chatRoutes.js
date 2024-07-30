const express = require('express');
const router = express.Router();
const { getExperts, getChatRequest, getChatForUserId, createMessages, getMessageForChatId } = require('../controllers/chatController');

router.get('/experts', getExperts);
router.post('/chats/request', getChatRequest);
router.get('/chats/:userId', getChatForUserId);
router.get('/messages/:chatId', getMessageForChatId);
router.post('/messages', createMessages);

module.exports = router;
