import { LuFileText } from "react-icons/lu";
import { MdOutlineDocumentScanner, MdOutlineGroup } from "react-icons/md";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { Textarea } from "@nextui-org/react";

const CollaborationBox = () => {
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

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          {/* <LuFileText className="text-3xl text-primary" /> */}
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Group ID: 123
          </span>
        </h1>
        <Textarea placeholder="Write here..." minRows={15} maxRows={20} />
      </div>
    </>
  );
};

export default CollaborationBox;
