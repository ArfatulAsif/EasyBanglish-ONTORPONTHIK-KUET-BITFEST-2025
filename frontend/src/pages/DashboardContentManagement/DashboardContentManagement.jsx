import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import SectionCard from "../../components/shared/SectionCard/SectionCard";
import { TiDocumentAdd } from "react-icons/ti";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";

const DashboardContentManagement = () => {
  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
  ];

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Create New Content */}
        <SectionCard
          title={"Create New Content"}
          icon={<TiDocumentAdd className="text-2xl" />}
          to="new-content"
          loading={false}
          total={10}
          hideTotal={true}
          error={false}
        />

        {/* All Contents */}
        <SectionCard
          title={"All Contents"}
          icon={<IoDocumentsOutline className="text-2xl" />}
          to="all-contents"
          loading={false}
          total={10}
          error={false}
        />

        {/* Exported Files */}
        <SectionCard
          title={"Exported Files"}
          icon={<FaRegFilePdf className="text-2xl" />}
          to="exported-files"
          loading={false}
          total={10}
          error={false}
        />
      </div>
    </>
  );
};

export default DashboardContentManagement;
