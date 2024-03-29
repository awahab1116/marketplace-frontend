import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axiosRequest";
import { PlaceOrderBody } from "../interfaces/placeOrderBody.interface";

export const placeOrder = async (data: PlaceOrderBody[]): Promise<string> => {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "/order/place",
    data,
  };
  return await apiRequest<string>(config);
};
