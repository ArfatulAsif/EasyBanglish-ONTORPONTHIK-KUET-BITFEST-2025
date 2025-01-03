import { Outlet } from "react-router";
import CustomNavbar from "../../components/shared/CustomNavbar/CustomNavbar";
import { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    document.documentElement.classList.add("darkMode");
  });

  return (
    <div>
      <CustomNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
