import { useState, useEffect } from "react";
import { getAllUsers } from "../services/userServices";
import { createNewChat, getAllChats } from "../services/chatbotServices";

const useChatbot = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllChats();

      setChats(data.chats);

      console.log(data);
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

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    error,
    createChat,
    refetch: () => fetchChats(),
  };
};

export default useChatbot;
