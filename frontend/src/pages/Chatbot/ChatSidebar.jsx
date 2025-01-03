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
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { EditDocumentIcon } from "../../components/icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "../../components/icons/DeleteDocumentIcon";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiConversation } from "react-icons/bi";
import useChatbot from "../../hooks/useChatbot";
// import { FavouriteIcon } from "./FavouriteIcon";

const ChatSidebar = ({
  chats,
  isSidebarHidden,
  setIsSidebarHidden,
  selectedChat,
  setSelectedChat,
  setConversation,
  setConversationLoading,
}) => {
  const { createChat } = useChatbot();

  const [isNewChatCreating, setIsNewChatCreating] = useState(false);
  const [newChatText, setNewChatText] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chatToBeDeleted, setChatToBeDeleted] = useState("");
  const [isChatDeleting, setIsChatDeleting] = useState(false);

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [chatToBeRenamed, setChatToBeRenamed] = useState("");
  const [isChatRenaming, setIsChatRenaming] = useState(false);
  const [newRename, setNewRename] = useState("");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  console.log(chats);

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const handleRenameChat = (chatId) => {
    console.log(chatId);

    setShowRenameModal(true);
    setChatToBeRenamed(chatId);
  };

  const handleDeleteChat = (chatId) => {
    console.log(chatId);
    setShowDeleteModal(true);
    setChatToBeDeleted(chatId);
  };

  const handleCreateNewChat = () => {
    setNewChatText("");
    onOpen();
  };

  const handleCreateNewChatSubmit = async (e) => {
    e.preventDefault();
    if (newChatText.trim() === "") {
      toast.error("Please write something before submitting.");
      return;
    }
    // console.log("Form submitted with:", newChatText);

    console.log("creating new chat");
    await createChat(newChatText);
    console.log("done");

    onClose();
  };

  return (
    <div className={`flex flex-col gap-4`}>
      <div className="flex flex-col gap-2">
        <Tooltip
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
        </Tooltip>
        <Button
          disabled={isNewChatCreating}
          onPress={handleCreateNewChat}
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

          {isNewChatCreating && <Spinner className="mx-auto" color="white" />}
        </Button>
      </div>

      <div className="overflow-y-auto chatbot-sidebar-list-holder">
        <ul className="flex flex-col gap-2">
          {chats.map((chat) => {
            return (
              <li
                onClick={() => {
                  if (selectedChat !== chat.id) {
                    setConversationLoading(true);
                    setConversation([]);
                    setSelectedChat(chat);
                  }
                }}
                key={chat.id}
                className="py-2 px-4 bg-[#181a20] hover:bg-[#282c34] rounded-lg cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden relative group flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{chat.title}</span>
                </div>
                <Dropdown className="bg-[#27272A] text-white hover:text-white">
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
                </Dropdown>
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
            <form onSubmit={handleCreateNewChatSubmit}>
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
  );
};

export default ChatSidebar;
