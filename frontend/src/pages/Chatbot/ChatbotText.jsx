import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BsSendArrowUp } from "react-icons/bs";
// import { getChatbotPrompt } from "../../utils/getAiPrompts";
import toast from "react-hot-toast";

const ChatbotTextBox = () => {
  const [prompt, setPrompt] = useState("");
  const handlePromptSubmit = (event) => {
    event.preventDefault();

    if (prompt === "") {
      toast.error("Please type something");
      return;
    }
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
        disabled={false}
        type="submit"
        className="h-[50px]"
        radius="md"
        color="primary"
      >
        {false ? (
          <Spinner className="text-2xl" color="white" />
        ) : (
          <BsSendArrowUp className="text-2xl" />
        )}
      </Button>
    </form>
  );
};

export default ChatbotTextBox;
