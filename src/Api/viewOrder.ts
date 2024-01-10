import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axiosRequest";
import { Order } from "../interfaces/order.interface";

export const viewOrder = async (
  orderId: string | undefined
): Promise<Order> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `/order/view/${orderId}`,
  };
  return await apiRequest<Order>(config);
};
