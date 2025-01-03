import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Sidebar, { SidebarItem } from "../../components/shared/Sidebar/Sidebar";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("darkMode");
  });

  return (
    <div className="">
      <div className="flex">
        <Sidebar>
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
        </Sidebar>

        {/* Outlet */}
        <div className="w-full h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
