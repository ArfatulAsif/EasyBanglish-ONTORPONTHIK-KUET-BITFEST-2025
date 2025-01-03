const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { tokenValidate } = require('../middlewars/tokenValidate');

// Apply tokenValidate middleware with the role parameter
router.post('/create', tokenValidate('user'), chatController.chatCreate);
router.post('/message', tokenValidate('user'), chatController.messageCreateText);
router.put('/title', tokenValidate('user'), chatController.chatTitleChange);
router.delete('/delete', tokenValidate('user'), chatController.chatDelete);
router.get('/messages/:chat_id', tokenValidate('user'), chatController.getMessagesByChatId);
router.get('/chats', tokenValidate('user'), chatController.getAllChatsByUserId);

module.exports = router;
