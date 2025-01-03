import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Auth from "../pages/Auth/Auth";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout/MainLayout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import DashboardSettings from "../pages/DashboardSettings/DashboardSettings";
import DashboardUsers from "../pages/DashboardUsers/DashboardUsers";
import DashboardLogs from "../pages/DashboardLogs/DashboardLogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "Users",
        element: <DashboardUsers />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
      {
        path: "history",
        element: <DashboardLogs />,
      },
    ],
  },
]);

export default router;
