import { LuLayoutDashboard } from "react-icons/lu";
import PageHeader from "../../components/shared/PageHeader/PageHeader";

const DashboardHome = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    { text: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
  ];

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1>THis is main home</h1>
      </div>
    </>
  );
};

export default DashboardHome;
