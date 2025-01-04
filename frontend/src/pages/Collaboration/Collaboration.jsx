import { MdOutlineDocumentScanner, MdOutlineGroup } from "react-icons/md";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router";

const Collaboration = () => {
  const [loading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "Collaborate",
      to: "/dashboard/content-management/collaborate",
      icon: MdOutlineGroup,
    },
  ];

  const handleCreate = () => {
    setLoading(true);

    // Retrieve userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }

    const requestBody = {
      userId, // Add the retrieved userId
      content: "", // Set content to an empty string
    };

    axiosInstance
      .post("/col/collaborations", requestBody) // Send request with userId and empty content
      .then((res) => {
        const { success, collaboration } = res.data;

        if (success) {
          // Save the collaboration ID in localStorage
          localStorage.setItem("collab", collaboration.id);

          // Navigate to the specified route
          navigate(
            "/dashboard/content-management/collaborate/collaboration-box"
          );
        } else {
          console.error("Failed to create collaboration");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error creating collaboration:", err);
        setLoading(false);
      });
  };

  const handleJoin = (event) => {
    event.preventDefault();
    setLoading(true);

    // Retrieve userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      console.error("User not found in localStorage");
      setLoading(false);
      return;
    }

    // collaborationId from groupId
    const collaborationId = groupId;

    const requestBody = {
      collaborationId,
      userId,
    };
    localStorage.setItem("collab", collaborationId);
    navigate("/dashboard/content-management/collaborate/collaboration-box");
    // axiosInstance
    //   .post("/col/collaborations/add-user", requestBody) // Use the correct endpoint
    //   .then((res) => {
    //     const { success, collaboration } = res.data;

    //     if (success) {
    //       // Save the collaboration ID in localStorage
    //       localStorage.setItem("collab", collaborationId);

    //       // Navigate to the specified route
    //       navigate("/dashboard/content-management/collaborate/collaboration-box");
    //     } else {
    //       console.error("Failed to join collaboration");
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error joining collaboration:", err);
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <MdOutlineGroup className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Group Collaboration
          </span>
        </h1>

        <div className="flex justify-center gap-4 items-center">
          <Button onPress={handleCreate} color="primary">
            Collaborate With Others
          </Button>
          <Button
            onPress={() => {
              setGroupId("");
              onOpen();
            }}
            color="secondary"
          >
            Join Group
          </Button>
        </div>
        <div>
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
                <form onSubmit={handleJoin}>
                  <ModalHeader className="flex flex-col gap-1">
                    Join Group
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      label="Write something to begin"
                      placeholder="Please write something"
                      variant="bordered"
                      onChange={(e) => setGroupId(e.target.value)}
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
        {/* <div>
          <h1 className="my-8 mb-4 font-semibold tracking-wide ">
            Created Groups
          </h1>
          <ul className="list-disc list-inside">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default Collaboration;
