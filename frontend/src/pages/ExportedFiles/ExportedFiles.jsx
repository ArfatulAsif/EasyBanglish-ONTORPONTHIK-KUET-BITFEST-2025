import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";

const ExportedFiles = () => {
  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "Create New Content",
      to: "/dashboard/content-management/exported-files",
      icon: FaRegFilePdf,
    },
  ];

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1>This is exported files page</h1>
      </div>
    </>
  );
};

export default ExportedFiles;
