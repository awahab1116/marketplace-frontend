import { AxiosRequestConfig } from "axios";
import axiosInstance from "./index";

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
