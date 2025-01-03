import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";
import { Link, useLocation } from "react-router";
import { SidebarItem } from "./Sidebar";

const AdminSidebar = () => {
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

      {/* Dashboard Users Tab */}
      <Link to="/dashboard/users">
        <SidebarItem
          icon={<FaRegUserCircle />}
          text="Users"
          active={location?.pathname === "/dashboard/users"}
        />
      </Link>

      {/* Dashboard History Tab */}
      <Link to="/dashboard/history">
        <SidebarItem
          icon={<MdOutlineManageHistory />}
          text="History"
          active={location?.pathname === "/dashboard/history"}
        />
      </Link>

      {/* Dashboard Settings Tab */}
      <Link to="/dashboard/settings">
        <SidebarItem
          icon={<IoSettingsOutline />}
          text="Settings"
          active={location?.pathname === "/dashboard/settings"}
        />
      </Link>
    </div>
  );
};

export default AdminSidebar;
