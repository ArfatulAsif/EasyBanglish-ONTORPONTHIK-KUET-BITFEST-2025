import { PiUserSound } from "react-icons/pi";
import { RxCopy } from "react-icons/rx";
import { RiRobot3Line } from "react-icons/ri";
import { BsChatLeftText, BsSendArrowUp } from "react-icons/bs";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Switch,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { BiConversation } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import useChatbot from "../../hooks/useChatbot";
import { SlOptions } from "react-icons/sl";
import { EditDocumentIcon } from "../../components/icons/EditDocumentIcon";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const Chatbot = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Text Copied");
      },
      (err) => {}
    );
  };

  const breadcrumbLinks = [
    { text: "Chatbot", to: "/dashboard/chatbot", icon: RiRobot3Line },
  ];

  // states
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isNewChatCreating, setIsNewChatCreating] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newChatText, setNewChatText] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPdfMode, setIsPdfMode] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  // Hooks
  // const { chats, createChat } = useChatbot();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  // Custom classes
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const promptClasses =
    "w-[80%] bg-[#522258] text-white ml-auto mr-3 rounded-xl px-5 py-3";
  const responseClasses =
    "w-[80%] bg-[#C8A1E0] text-black ml-2 rounded-xl px-5 py-3";

  // Refs
  const scrollRef = useRef(null);

  useEffect(() => {}, [selectedChatId, selectedMessages]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axiosInstance.get(`/chat/chats?token=${token}`).then((res) => {
      setChats(res?.data.chats?.reverse());
    });
  }, []);

  // Handlers
  const handleCreateNewChat = (e) => {
    e.preventDefault();

    setIsNewChatCreating(true);
    onClose();

    const token = localStorage.getItem("token");

    axiosInstance
      .post(`/chat/create?token=${token}`, {
        message: newChatText,
      })
      .then((res) => {
        const token = localStorage.getItem("token");

        axiosInstance
          .get(`/chat/chats?token=${token}`)
          .then((res) => {
            setChats(res?.data.chats?.reverse());
          })
          .then(setIsNewChatCreating(false));
      });
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    if (isPdfMode) {
      axiosInstance
        .post(`/ai/pdf-search?token=${token}`, {
          chat_id: selectedChatId,
          prompt: e.target.promptMsg.value,
        })
        .then((res) => {
          console.log(res.data);
          setSelectedMessages(res.data.message);
          setPrompt("");
          // scroll to bottom
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
          setLoading(false);
        });
    } else {
      axiosInstance
        .post(`/chat/message?token=${token}`, {
          chat_id: selectedChatId,
          text: e.target.promptMsg.value,
        })
        .then((res) => {
          setSelectedMessages(res.data.message);
          setPrompt("");
          // scroll to bottom
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
          setLoading(false);
        });
    }
  };

  const handlePlayVoice = (text) => {
    console.log(text);
    setVoiceLoading(true);

    axiosInstance
      .post(`/ai/generate-voice?token=${localStorage.getItem("token")}`, {
        prompt: text,
      })
      .then((res) => {
        console.log(res.data);
        setVoiceLoading(false);
        setAudioUrl(res?.data?.audio);
      })
      .catch(() => {
        setVoiceLoading(false);
      });
  };

  useEffect(() => {
    // Play the audio as soon as the URL is set
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [audioUrl]);

  return (
    <>
      <div>
        {voiceLoading && (
          <div className="absolute bg-[rgba(0,0,0,0.8)] rounded-lg h-[80vh] w-[80vw] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
            <h1 className="animate-pulse relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              Voice Loading...
            </h1>
          </div>
        )}
        <PageHeader breadcrumbLinks={breadcrumbLinks} />

        <div className="p-4 grid grid-cols-4 gap-4">
          {/* Sidebar */}
          <div className={`flex flex-col gap-4 h-full max-h-[90vh]`}>
            <div className="flex flex-col gap-2">
              {/* <Tooltip
                placement="right"
                content="Hide sidebar"
                color="primary"
                closeDelay={100}
                showArrow
              >
                <Button
                  className="self-start"
                  onPress={() => setIsSidebarHidden(!isSidebarHidden)}
                  size="sm"
                >
                  <TbLayoutSidebarLeftCollapse className="text-xl" />
                </Button>
              </Tooltip> */}
              <Button
                disabled={isNewChatCreating}
                onPress={() => {
                  setNewChatText("");
                  onOpen();
                }}
                className="bg-[#282c34] text-white shadow-lg w-full flex gap-2 items-center justify-between group"
              >
                {!isNewChatCreating && (
                  <>
                    <div className="flex items-center justify-start gap-2">
                      <BiConversation />
                      <span>New Chat</span>
                    </div>
                    <CiEdit className="hidden group-hover:block font-bold text-[18px]" />
                  </>
                )}

                {isNewChatCreating && (
                  <Spinner className="mx-auto" color="white" />
                )}
              </Button>
            </div>

            <div className="overflow-y-auto chatbot-sidebar-list-holder">
              <ul className="flex flex-col gap-2">
                {chats.map((chat) => {
                  return (
                    <li
                      onClick={() => {
                        setSelectedMessages(chat.messages);
                        setSelectedChatId(chat.id);
                        localStorage.setItem("selectedChatId", chat.id);
                      }}
                      key={chat.id}
                      className="py-2 px-4 bg-[#181a20] hover:bg-[#282c34] rounded-lg cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden relative group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span>{chat.title}</span>
                      </div>
                      {/* <Dropdown className="bg-[#27272A] text-white hover:text-white">
                  <DropdownTrigger>
                    <div className="hidden rounded-md absolute top-1/2 -translate-y-1/2 right-[10px] h-[20px] w-[30px] bg-gray-700 group-hover:flex justify-center items-center">
                      <SlOptions />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    aria-label="Dropdown menu with description"
                  >
                    <DropdownItem
                      color="primary"
                      key="edit"
                      showDivider
                      description="Rename this chat"
                      startContent={
                        <EditDocumentIcon className={iconClasses} />
                      }
                      onClick={() => handleRenameChat(chat.id)}
                    >
                      Rename
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      description="Delete this chat"
                      startContent={
                        <DeleteDocumentIcon
                          className={iconClasses + "text-danger"}
                        />
                      }
                      onClick={() => handleDeleteChat(chat.id)}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* New Chat Modal */}
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              placement="top-center"
              onOpenChange={onOpenChange}
              classNames={{
                backdrop:
                  "bg-gradient-to-t from-gray-900 to-gray-500/50 backdrop-opacity-90",
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <form onSubmit={handleCreateNewChat}>
                    <ModalHeader className="flex flex-col gap-1">
                      New Chat
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        label="Write something to begin"
                        placeholder="Please write something"
                        variant="bordered"
                        onChange={(e) => setNewChatText(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </form>
                )}
              </ModalContent>
            </Modal>
          </div>

          {/* Main Content */}
          <div className="col-span-3 chatbot-chat-holder rounded-lg p-3 bg-gray-900 h-full max-h-[90vh] relative">
            <div
              ref={scrollRef}
              className="h-[85%] pb-4 overflow-y-auto flex flex-col gap-6"
            >
              {!selectedMessages && (
                <h1 className="text-xl flex gap-3 items-center justify-center h-full">
                  <BiConversation className="text-3xl text-primary" />
                  <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Create a new conversation
                  </span>
                </h1>
              )}
              {selectedMessages && (
                <>
                  {selectedMessages?.length === 0 && (
                    <h1 className="text-xl flex gap-3 items-center justify-center h-full">
                      <BsChatLeftText className="text-3xl text-primary" />
                      <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Write something to begin
                      </span>
                    </h1>
                  )}
                  {selectedMessages?.map((message) => {
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
                              onClick={() => handlePlayVoice(message.text)}
                              className="group flex gap-2 items-center h-[20px] ml-3 mt-2 cursor-pointer"
                            >
                              <PiUserSound className="group-hover:text-primary transition-all duration-200" />
                              <span className="text-white group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200">
                                Play Voice
                              </span>
                            </div>
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
                  {selectedChatId && (
                    <Switch isSelected={isPdfMode} onValueChange={setIsPdfMode}>
                      PDF Reference Mode
                    </Switch>
                  )}
                </>
              )}
            </div>

            {/* Textbox */}
            <div className="h-[15%] flex flex-col justify-end">
              {selectedChatId && (
                <form
                  onSubmit={handlePromptSubmit}
                  className="flex items-center gap-2"
                >
                  <Textarea
                    name="promptMsg"
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
                  >
                    {loading ? (
                      <Spinner className="text-2xl" color="white" />
                    ) : (
                      <BsSendArrowUp className="text-2xl" />
                    )}{" "}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
