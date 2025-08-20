import { Product } from "@/components/ui/ProductCard";
import { serverApi } from "./serverApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedProducts = async (): Promise<{ data: Product[] }> => {
  const response = await serverApi.get(`${API_URL}/products?is_featured=true`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch featured products");
  }
  return response.data;
};
