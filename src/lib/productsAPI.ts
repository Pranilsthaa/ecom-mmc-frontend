import { Product } from "@/components/ui/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeaturedProducts = async (): Promise<{ data: Product[] }> => {
  const response = await fetch(`${API_URL}/products?is_featured=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }
  return response.json();
};
