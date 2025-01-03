import axiosInstance from "../utils/axiosInstance";

export const getAllLogs = async () => {
  const { data: response } = await axiosInstance.get("/auth/history");

  console.log(response);

  return response;
};
