import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.14.51:8000",
  // baseURL: "https://7c2f-103-74-84-172.ngrok-free.app",
});

export default axiosInstance;
