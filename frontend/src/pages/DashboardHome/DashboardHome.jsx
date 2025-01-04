import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineTranslation } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { FaRegCircleUser, FaWpexplorer } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import DashboardCard from "./DashboardCard";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const DashboardHome = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    { text: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
  ];

  // States
  const [analyticsData, setAnalyticsData] = useState(null);
  const [adminAnalyticsData, setAdminAnalyticsData] = useState(null);

  const role = JSON.parse(localStorage.getItem("user")).role;
  console.log(role);

  useEffect(() => {
    if (role === "user") {
      axiosInstance
        .get(`/auth/analytics?token=${localStorage.getItem("token")}`)
        .then((res) => {
          console.log(res.data.data);
          setAnalyticsData(res.data.data);
        });
    }
  }, [role]);

  useEffect(() => {
    if (role === "admin") {
      axiosInstance
        .get(`/auth/all?token=${localStorage.getItem("token")}`)
        .then((res) => {
          console.log(res.data.data);
          setAdminAnalyticsData(res.data.data);
        });
    }
  }, [role]);

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        {role === "user" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#18181B] rounded-md p-6">
              <h1 className="font-bold tracking-wide text-primary flex items-center gap-2 text-lg">
                <FaRegCircleUser /> <span>{analyticsData?.user?.name}</span>
              </h1>
              <h2 className=" text-gray-400">{analyticsData?.user?.email}</h2>
              <h3 className="text-xs text-gray-400">
                Registered: {formatDate(analyticsData?.user?.createdAt)}
              </h3>
            </div>
            <DashboardCard
              title={analyticsData?.messageCount}
              subtitle={"Chatbot Interactions"}
              icon={<BiConversation className="text-2xl" />}
            />
            <DashboardCard
              title={analyticsData?.translatedWords}
              subtitle={"Translated Words"}
              icon={<AiOutlineTranslation className="text-2xl" />}
            />
            <DashboardCard
              title={analyticsData?.writtenStories}
              subtitle={"Written Stories"}
              icon={<TfiWrite className="text-2xl" />}
            />
          </div>
        )}

        {role === "admin" && (
          <>
            <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
              <TbDeviceDesktopAnalytics className="text-3xl text-primary" />
              <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Analytics
              </span>
            </h1>

            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>User ID</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Chatbot Interactions</TableColumn>
                <TableColumn>Translated Words</TableColumn>
                <TableColumn>Written Stories</TableColumn>
              </TableHeader>
              <TableBody>
                {adminAnalyticsData &&
                  adminAnalyticsData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.user?.id}</TableCell>
                      <TableCell>{data.user?.name}</TableCell>
                      <TableCell>{data.user?.email}</TableCell>
                      <TableCell>{data?.messageCount}</TableCell>
                      <TableCell>{data?.translatedWords}</TableCell>
                      <TableCell>{data?.writtenStories}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
