import { useRef, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import TextEditor from "./TextEditor";
import SpeechRecognition from "./SpeechRecognition";
import { Button } from "@nextui-org/react";
import { IoMic } from "react-icons/io5";

const CreateContent = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "Create New Content",
      to: "/dashboard/content-management/new-content",
      icon: TiDocumentAdd,
    },
  ];

  // Refs
  const editor = useRef(null);

  // States
  const [content, setContent] = useState("");

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <MdOutlineDocumentScanner className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Create New Content
          </span>
        </h1>
        <div>
          <SpeechRecognition content={content} setContent={setContent} />
        </div>
        <TextEditor editor={editor} content={content} setContent={setContent} />
      </div>
    </>
  );
};

export default CreateContent;
