import { Product } from "@/components/ui/ProductCard";
import { cookies, headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCartItems = async (): Promise<{ data: Product[] }> => {
  const cookie = (await cookies()).get("access_token")?.value || "";
  const response = await fetch(`${API_URL}/carts`, {
    headers: {
      Cookie: `access_token=${cookie}`,
    },
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return response.json();
};
