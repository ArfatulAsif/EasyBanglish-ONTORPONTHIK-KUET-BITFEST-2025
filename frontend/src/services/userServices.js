import axiosInstance from "../utils/axiosInstance";

export const getAllUsers = async () => {
  const { data: response } = await axiosInstance.get("/auth/users");

  return response.users;
};
