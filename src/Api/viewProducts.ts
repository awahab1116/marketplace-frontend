import { AxiosRequestConfig } from "axios";
import { apiRequest } from "./axiosRequest";
import { Product } from "../interfaces/product.interface";

export const viewProducts = async (): Promise<Product[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "/product/view",
  };
  return await apiRequest<Product[]>(config);
};
