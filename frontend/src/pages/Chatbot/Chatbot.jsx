import { RiRobot3Line } from "react-icons/ri";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useRef, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { BiConversation } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { RxCopy } from "react-icons/rx";
import { TiPinOutline } from "react-icons/ti";
import ChatbotTextBox from "./ChatbotText";
import useChatbot from "../../hooks/useChatbot";
import toast from "react-hot-toast";

const Chatbot = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    {
      text: "Chatbot",
      to: "/dashboard/chatbot",
      icon: RiRobot3Line,
    },
  ];

  // States
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [conversationLoading, setConversationLoading] = useState(false);

  // Refs
  const scrollRef = useRef(null);

  // Load chats
  const { chats } = useChatbot();

  // Message styling classes
  const promptClasses =
    "w-[80%] bg-[#522258] text-white ml-auto mr-3 rounded-xl px-5 py-3";
  const responseClasses =
    "w-[80%] bg-[#C8A1E0] text-black ml-2 rounded-xl px-5 py-3";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Text Copied");
      },
      (err) => {
        console.error("Failed to copy text to clipboard:", err);
      }
    );
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4 h-screen mb-12">
        <div className="flex flex-col md:grid grid-cols-5 h-[95%]">
          {!isSidebarHidden && (
            <div className="col-span-1 px-2">
              <ChatSidebar
                chats={chats}
                isSidebarHidden={isSidebarHidden}
                setIsSidebarHidden={setIsSidebarHidden}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                setConversation={setConversation}
                setConversationLoading={setConversationLoading}
              />
            </div>
          )}
          <div
            className={`mt-5 md:mt-0 mx-2 ${
              isSidebarHidden ? "col-span-5" : "col-span-4"
            }`}
          >
            <div className="flex gap-4 items-center">
              {isSidebarHidden && (
                <div>
                  <Tooltip
                    color="primary"
                    size="sm"
                    placement="right"
                    content="Show sidebar"
                    closeDelay={100}
                    showArrow
                  >
                    <Button
                      className="self-start"
                      onPress={() => setIsSidebarHidden(!isSidebarHidden)}
                      size="sm"
                    >
                      <TbLayoutSidebarLeftExpand className="text-xl" />
                    </Button>
                  </Tooltip>
                </div>
              )}
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Chatbot
              </span>
            </div>

            {/* main content */}
            <div className="mt-2 chatbot-chat-holder rounded-lg p-3 bg-gray-900 h-full relative">
              <div
                ref={scrollRef}
                className="h-[85%] pb-4 overflow-y-auto flex flex-col gap-6"
              >
                {!selectedChat && (
                  <h1 className="text-xl flex gap-3 items-center justify-center h-full">
                    <BiConversation className="text-3xl text-primary" />
                    <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      Create a new conversation
                    </span>
                  </h1>
                )}
                {selectedChat && (
                  <>
                    {selectedChat.length === 0 && (
                      <h1 className="text-xl flex gap-3 items-center justify-center h-full">
                        <BsChatLeftText className="text-3xl text-secondary" />
                        <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                          Write something to begin
                        </span>
                      </h1>
                    )}
                    {selectedChat?.messages.map((message) => {
                      return (
                        <div key={message.id}>
                          <div
                            className={`${
                              message.sender === "user"
                                ? promptClasses
                                : responseClasses
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          {message.sender === "bot" && (
                            <>
                              <div
                                onClick={() => copyToClipboard(message.text)}
                                className="group flex gap-2 items-center h-[20px] ml-3 mt-2 cursor-pointer"
                              >
                                <RxCopy className="group-hover:text-primary transition-all duration-200" />
                                <span className="text-white group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200">
                                  Copy to clipboard
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <div className="h-[15%] flex flex-col justify-end">
                {selectedChat && (
                  <ChatbotTextBox
                    chatId={selectedChat}
                    conversation={conversation}
                    setConversation={setConversation}
                    // reloadConversation={reloadConversation}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
