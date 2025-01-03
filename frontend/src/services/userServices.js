import axiosInstance from "../utils/axiosInstance";

export const getAllUsers = async () => {
  const { data: response } = await axiosInstance.get(
    `/auth/users?token=${localStorage.getItem("token")}`
  );

  return response.users;
};
