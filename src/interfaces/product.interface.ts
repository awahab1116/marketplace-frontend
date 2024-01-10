export interface Product {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  description: string | null;
  price: string;
  quantity: number;
  image: string | null;
}
