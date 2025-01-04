import { TfiWrite } from "react-icons/tfi";
import { AiOutlineTranslation } from "react-icons/ai";
import { BiConversation } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/formatDate";
import DashboardCard from "./DashboardCard";

const DashboardHome = () => {
  // Breadcrumb links
  const breadcrumbLinks = [
    { text: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
  ];

  // States
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/auth/analytics?token=${localStorage.getItem("token")}`)
      .then((res) => {
        console.log(res.data.data);
        setAnalyticsData(res.data.data);
      });
  }, []);

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
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
            subtitle={"Message Count"}
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
      </div>
    </>
  );
};

export default DashboardHome;
