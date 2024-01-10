import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
});

const token = localStorage.getItem("token");

if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;
