import { Product } from "./product.interface";

export interface Order {
  id: number;
  updatedAt: string;
  createdAt: string;
  totalAmount: string;
  status: string;
  checkoutSessionId: string;
  products: Product[];
}
