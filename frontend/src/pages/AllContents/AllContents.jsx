import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";

const AllContents = () => {
  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "All Content",
      to: "/dashboard/content-management/all-contents",
      icon: IoDocumentsOutline,
    },
  ];

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1>This is all contents page</h1>
      </div>
    </>
  );
};

export default AllContents;
