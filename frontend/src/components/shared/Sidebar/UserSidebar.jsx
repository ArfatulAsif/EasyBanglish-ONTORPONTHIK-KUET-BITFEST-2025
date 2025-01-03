import { Link, useLocation } from "react-router";
import { SidebarItem } from "./Sidebar";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";

const UserSidebar = () => {
  const location = useLocation();

  return (
    <div>
      {/* Dashboard Home Tab */}
      <Link to="/dashboard">
        <SidebarItem
          icon={<LuLayoutDashboard />}
          text="Dashboard"
          active={location?.pathname === "/dashboard"}
        />
      </Link>

      {/* Content Management Tab */}
      <Link to="/dashboard/content-management">
        <SidebarItem
          icon={<MdOutlineDocumentScanner />}
          text="Content Management"
          active={location?.pathname.includes("/dashboard/content-management")}
        />
      </Link>

      {/* Chatbot Tab */}
      <Link to="/dashboard/chatbot">
        <SidebarItem
          icon={<RiRobot3Line />}
          text="Chatbot"
          active={location?.pathname.includes("/dashboard/chatbot")}
        />
      </Link>
    </div>
  );
};

export default UserSidebar;
