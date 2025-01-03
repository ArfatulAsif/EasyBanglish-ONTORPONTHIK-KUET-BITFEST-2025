import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

export const register = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/reg", {
      name,
      email,
      password,
    });

    toast.success(response.data?.message || "User registered successfully.");

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error registering user.");
  }
};

export const login = async (email, password) => {
  try {
    const { data: response } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    toast.success(response?.message);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);

    return response.user;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error logging in.");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success("Logout successful.");
};

export const isUserAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
