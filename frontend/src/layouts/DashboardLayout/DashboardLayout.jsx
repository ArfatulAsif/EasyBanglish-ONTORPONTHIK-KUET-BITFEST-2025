import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/shared/Sidebar/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import UserSidebar from "../../components/shared/Sidebar/UserSidebar";
import AdminSidebar from "../../components/shared/Sidebar/AdminSidebar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.classList.add("darkMode");
  });

  return (
    <div className="">
      <div className="flex">
        <Sidebar>
          {/* User Sidebar */}
          {user && user.role === "user" && <UserSidebar />}

          {/* Admin Sidebar */}
          {user && user.role === "admin" && <AdminSidebar />}
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
