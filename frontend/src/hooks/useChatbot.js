import { useState, useEffect } from "react";
import { getAllUsers } from "../services/userServices";
import {
  addNewMessage,
  createNewChat,
  getAllChats,
} from "../services/chatbotServices";

const useChatbot = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllChats();

      setChats(data.chats?.reverse());

      console.log(data.chats);
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      setError(errorMessage || "Failed to fetch chats.");
    } finally {
      setLoading(false);
    }
  };

  const createChat = async (message) => {
    setLoading(true);
    setError(null);

    try {
      const data = await createNewChat(message);

      setChats((prevChats) => [...prevChats, data.chat]);

      console.log(data);
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      setError(errorMessage || "Failed to create new chat.");
    } finally {
      setLoading(false);
    }
  };

  const newMessage = async (chatId, message) => {
    setLoading(true);
    setError(null);

    try {
      const data = await addNewMessage(
        parseInt(localStorage.getItem("selectedChatId")),
        localStorage.getItem("prompt")
      );
      // setRefetch(!refetch);

      console.log(data.message);
      setSelectedMessages(data.message);
      // setSelectedChat(data);
      return data;
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      setError(errorMessage || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = () => {
    setRefetch(!refetch);
  };

  useEffect(() => {
    fetchChats();
  }, [refetch]);

  return {
    chats,
    loading,
    error,
    createChat,
    newMessage,
    refreshMessages,
    selectedMessages,
    setSelectedMessages,
    setSelectedChatId,
    refetch: () => fetchChats(),
  };
};

export default useChatbot;
