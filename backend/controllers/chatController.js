// chatController.js
const prisma = require('@prisma/client').PrismaClient;
const axios = require('axios');
const prismaClient = new prisma();

// Chat Creation API
exports.chatCreate = async (req, res) => {
    const user_id = req.user.id;  // Get user ID from the validated token
    const message = req.body.message;  // The user's message
    
    try {
      // Call external API to generate text and title
      const aiResponse = await axios.post(`${process.env.base_url}/ai/generate-first`, {
        text: message
      });
  
      const title = aiResponse.data.jsonData.title;
      const msg = aiResponse.data.jsonData.message;
  
      // Count the number of words in the user's message
      const wordCount = message.split(/\s+/).length;  // Split by whitespace and count words
  
      // Save chat in the Chat table
      const chat = await prismaClient.chat.create({
        data: {
          userId: user_id,
          title,
          createdAt: new Date()
        }
      });
  
      // Save user message
      await prismaClient.message.create({
        data: {
          chatId: chat.id,
          sender: 'user',
          text: message,
          time: new Date()
        }
      });
  
      // Save bot response
      await prismaClient.message.create({
        data: {
          chatId: chat.id,
          sender: 'bot',
          text: msg,
          time: new Date()
        }
      });
  
      // Check if the user exists in the Analytics model
      const userAnalytics = await prismaClient.analytics.findFirst({
        where: { userId: user_id }
      });
  
      if (userAnalytics) {
        // If the user exists, increment the word count
        await prismaClient.analytics.update({
          where: { userId: user_id },
          data: {
            translatedWords: userAnalytics.translatedWords + wordCount,
            messageCount: userAnalytics.messageCount + 1
          }
        });
      } else {
        // If the user doesn't exist, create a new Analytics entry
        await prismaClient.analytics.create({
          data: {
            userId: user_id,
            translatedWords: wordCount,  // Initialize with the word count of the first message
            writtenStories: 0,
            messageCount: 1  // This is the first message
          }
        });
      }
  
      // Return the response with the chat ID and title
      res.status(201).json({ success: true, chatId: chat.id, title });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

// Message Creation API
exports.messageCreateText = async (req, res) => {
    const { chat_id, text } = req.body;
    const user_id = req.user.id;  // Get user ID from the validated token
  
    try {
      let sender = 'user';
      let aiMessage = null;
  
      // Count the number of words in the user's message
      const wordCount = text.split(/\s+/).length;  // Split by whitespace and count words
  
      // Call external API to generate a response if the sender is the user
    //   if (sender === 'user') {
    //     const aiResponse = await axios.post(`${process.env.base_url}/ai/generate-text`, {
    //       prompt: text
    //     });
    //     aiMessage = aiResponse.data.text;
    //   }
     aiMessage = "ওকে"
  
      // Save the user's message
      const userMessage = await prismaClient.message.create({
        data: {
          chatId: chat_id,
          sender: 'user',
          text,
          time: new Date()
        }
      });
  
      // Save the bot's response if applicable
      if (aiMessage) {
        await prismaClient.message.create({
          data: {
            chatId: chat_id,
            sender: 'bot',
            text: aiMessage,
            time: new Date()
          }
        });
      }
  
      // Check if the user exists in the Analytics model
      const userAnalytics = await prismaClient.analytics.findFirst({
        where: { userId: user_id }
      });

      // Check if the user exists in the Analytics model
      const userMessages = await prismaClient.message.findMany({
        where: { chatId: chat_id }
      });
  
      if (userAnalytics) {
        // If the user exists, increment the word count
        await prismaClient.analytics.update({
          where: { id: userAnalytics.id },
          data: {
            translatedWords: userAnalytics.translatedWords + wordCount
          }
        });
      } else {
        // If the user doesn't exist, create a new Analytics entry
        await prismaClient.analytics.create({
          data: {
            userId: user_id,
            translatedWords: wordCount,  // Initialize with the word count of the first message
            writtenStories: 0,
            messageCount: 1  // Assuming this is the first message
          }
        });
      }
  
      // Return the response with the user and bot messages
      res.status(201).json({ success: true, userMessage, botMessage: aiMessage ? aiMessage : null, message: userMessages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

// Chat Title Change API
exports.chatTitleChange = async (req, res) => {
  const { chat_id, new_title } = req.body;
  try {
    const updatedChat = await prismaClient.chat.update({
      where: { id: chat_id },
      data: { title: new_title, updatedAt: new Date() }
    });
    res.status(200).json({ success: true, updatedChat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Chat Delete API
exports.chatDelete = async (req, res) => {
  const { chat_id } = req.body;
  try {
    await prismaClient.message.deleteMany({ where: { chatId: chat_id } });
    await prismaClient.chat.delete({ where: { id: chat_id } });
    res.status(200).json({ success: true, message: 'Chat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Chat Controller - Get all chats by user ID with messages
exports.getAllChatsByUserId = async (req, res) => {
    const user_id = req.user.id;  // Get user ID from the validated token
    try {
      // Fetch all chats of the user along with the messages
      const chats = await prismaClient.chat.findMany({
        where: {
          userId: user_id
        },
        include: {
          messages: true  // Include all messages within each chat
        }
      });
  
      if (chats.length === 0) {
        return res.status(404).json({ success: false, message: 'No chats found for this user' });
      }
  
      res.status(200).json({ success: true, chats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

// Chat Controller - Get all messages by chat ID
exports.getMessagesByChatId = async (req, res) => {
    const { chat_id } = req.params;  // Get chat_id from URL parameters
    try {
      // Fetch all messages for the specific chat
      const messages = await prismaClient.message.findMany({
        where: {
          chatId: parseInt(chat_id)  // Ensure the chat ID is an integer
        },
        orderBy: {
          time: 'asc'  // Order messages by time (optional)
        }
      });
  
      if (messages.length === 0) {
        return res.status(404).json({ success: false, message: 'No messages found for this chat' });
      }
  
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  