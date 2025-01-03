import axiosInstance from "../utils/axiosInstance";

export const getAllChats = async () => {
  const token = localStorage.getItem("token");

  const { data: response } = await axiosInstance.get(
    `/chat/chats?token=${token}`
  );

  return response;
};

export const createNewChat = async (message) => {
  const token = localStorage.getItem("token");

  const { data: response } = await axiosInstance.post(
    `/chat/create?token=${token}`,
    {
      message,
    }
  );

  console.log(response);

  return response;
};
