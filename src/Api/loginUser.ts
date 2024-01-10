import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axiosRequest";
import { User } from "../interfaces/user.interface";

interface ApiResponse {
  user: User;
  access_token: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginBody): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/auth/login",
    data,
  };
  return await apiRequest<ApiResponse>(config);
};
