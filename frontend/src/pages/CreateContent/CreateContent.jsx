import { useRef, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import TextEditor from "./TextEditor";

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
        <TextEditor editor={editor} content={content} setContent={setContent} />
      </div>
    </>
  );
};

export default CreateContent;
