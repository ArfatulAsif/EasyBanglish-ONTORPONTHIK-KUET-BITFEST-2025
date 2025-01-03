import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";

const CreateContent = () => {
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

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1>This is create content page</h1>
      </div>
    </>
  );
};

export default CreateContent;
