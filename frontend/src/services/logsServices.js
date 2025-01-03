import axiosInstance from "../utils/axiosInstance";

export const getAllLogs = async () => {
  console.log(localStorage.getItem("token"));
  const { data: response } = await axiosInstance.get("/auth/history", {
    params: {
      token: localStorage.getItem("token"),
    },
  });

  console.log(response);

  return response;
};
