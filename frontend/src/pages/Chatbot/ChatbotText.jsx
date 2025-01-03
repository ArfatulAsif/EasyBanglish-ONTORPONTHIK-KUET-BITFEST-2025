import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsSendArrowUp } from "react-icons/bs";
import useChatbot from "../../hooks/useChatbot";
import toast from "react-hot-toast";

const ChatbotTextBox = ({ chats, selectedChat, setSelectedChat }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { newMessage, refreshMessages } = useChatbot();

  useEffect(() => {
    const oldSelectedChat = selectedChat;
    console.log(oldSelectedChat);
  }, [chats]);

  const handlePromptSubmit = async (event) => {
    event.preventDefault();

    if (prompt === "") {
      toast.error("Please type something");
      return;
    }

    setLoading(true);
    const data = await newMessage(selectedChat?.id, prompt);
    setLoading(false);
  };

  return (
    <form onSubmit={handlePromptSubmit} className="flex items-center gap-2">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        minRows={2}
        maxRows={3}
        radius="md"
        placeholder="Enter your description"
        className="w-full"
      />

      <Button
        disabled={loading}
        type="submit"
        className="h-[50px]"
        radius="md"
        color="primary"
        // onPress={handlePromptSubmit}
      >
        {loading ? (
          <Spinner className="text-2xl" color="white" />
        ) : (
          <BsSendArrowUp className="text-2xl" />
        )}
      </Button>
    </form>
  );
};

export default ChatbotTextBox;
