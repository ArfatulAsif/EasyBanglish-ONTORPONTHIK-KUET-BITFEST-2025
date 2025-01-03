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
import DashboardContentManagement from "../pages/DashboardContentManagement/DashboardContentManagement";
import CreateContent from "../pages/CreateContent/CreateContent";
import AllContents from "../pages/AllContents/AllContents";
import ExportedFiles from "../pages/ExportedFiles/ExportedFiles";
import Chatbot from "../pages/Chatbot/Chatbot";
import Contribute from "../pages/Contribute/Contribute";
import VerifyContributions from "../pages/VerifyContributions/VerifyContributions";
import Explore from "../pages/Explore/Explore";
import Collaboration from "../pages/Collaboration/Collaboration";
import CollaborationBox from "../pages/Collaboration/CollaborationBox";

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
      {
        path: "content-management",
        element: <DashboardContentManagement />,
      },
      {
        path: "content-management/new-content",
        element: <CreateContent />,
      },
      {
        path: "content-management/all-contents",
        element: <AllContents />,
      },
      {
        path: "content-management/collaborate",
        element: <Collaboration />,
      },
      {
        path: "content-management/collaborate/collaboration-box",
        element: <CollaborationBox />,
      },
      {
        path: "content-management/exported-files",
        element: <ExportedFiles />,
      },
      {
        path: "chatbot",
        element: <Chatbot />,
      },
      {
        path: "contribute",
        element: <Contribute />,
      },
      {
        path: "/dashboard/verify-contributions",
        element: <VerifyContributions />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
    ],
  },
]);

export default router;
