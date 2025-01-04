import React, { useEffect, useState, useRef } from "react";
import { LuFileText } from "react-icons/lu";
import { MdOutlineDocumentScanner, MdOutlineGroup } from "react-icons/md";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";

const CollaborationBox = () => {
  const [sharedText, setSharedText] = useState(""); // For real-time collaboration
  const socketRef = useRef(null); // WebSocket reference
  const [loading, setLoading] = useState(false);

  const handleTranslate = () => {
    setLoading(true);
    axiosInstance
      .post(`/ai/content-convert?token=${localStorage.getItem("token")}`, {
        prompt: sharedText,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setSharedText(res.data.bangla);
        handleInputChange({ target: { value: res.data.bangla } });
        // setSpellingMistakes(res.data.spelling || null);
        toast.success("Text translated successfully.");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/col/collaborations/${localStorage.getItem("collab")}`)
      .then((res) => {
        const txt = res?.data?.collaboration?.content;

        if (txt) {
          setSharedText(txt);
        }
      });
  }, []);

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
    {
      text: "Collaboration Box",
      to: "/dashboard/content-management/collaborate/collaboration-box",
      icon: LuFileText,
    },
  ];

  useEffect(() => {
    // Retrieve collab ID from localStorage
    const collabId = localStorage.getItem("collab");
    if (!collabId) {
      console.error("Collaboration ID not found in localStorage.");
      return;
    }

    // Connect to WebSocket server
    const socket = new WebSocket("ws://192.168.14.51:8000");
    socketRef.current = socket;

    socket.onopen = () => {
      // Register collaboration ID on connection
      socket.send(JSON.stringify({ type: "register", id: collabId }));
      console.log(
        "WebSocket connected and registered with collab ID:",
        collabId
      );
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === "sync") {
        setSharedText(data); // Update the text content in real-time
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      // Cleanup on component unmount
      socket.close();
    };
  }, []);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setSharedText(newText);

    // Send synchronization message to the server
    const collabId = localStorage.getItem("collab");
    if (socketRef.current && collabId) {
      socketRef.current.send(
        JSON.stringify({ type: "sync", id: collabId, message: newText })
      );
    }
  };

  const handleSave = () => {
    setLoading(true);
    const collabId = localStorage.getItem("collab");
    if (!collabId) {
      console.error("Collaboration ID not found.");
      return;
    }

    const requestBody = {
      content: sharedText, // Send the full content
    };

    axiosInstance
      .put(`/col/collaborations/${collabId}`, requestBody)
      .then((res) => {
        const { success } = res.data;
        if (success) {
          toast.success("Collaboration Updated");
        } else {
          console.error("Failed to update collaboration.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error saving collaboration:", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Group ID: {localStorage.getItem("collab")}
          </span>
        </h1>
        <Textarea
          value={sharedText}
          onChange={handleInputChange}
          minRows={15}
          maxRows={20}
          placeholder="Write here..."
        />
        <div className="flex gap-4">
          <Button
            isLoading={loading}
            onPress={handleTranslate}
            color="secondary"
            className="mt-4"
          >
            Translate
          </Button>
          <Button
            isLoading={loading}
            onPress={handleSave}
            color="primary"
            className="mt-4"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default CollaborationBox;
