import { Outlet } from "react-router";
import VantaGlobe from "../../components/VantaGlobe/VantaGlobe";
import Logo from "../../components/shared/Logo/Logo";
import { useEffect } from "react";

const AuthLayout = () => {
  useEffect(() => {
    document.documentElement.classList.add("darkMode");
  });

  return (
    <div className="flex flex-col h-screen relative">
      <div className="">
        <VantaGlobe />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3">
        <div className="flex justify-center">
          <Logo showText />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
