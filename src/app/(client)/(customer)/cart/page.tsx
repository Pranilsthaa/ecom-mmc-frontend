import { getCartItems } from "@/lib/server/cartAPI";
import CartClient from "./cartClient";

export default async function CartPage() {
  const response = await getCartItems();
  return <CartClient cartItems={response.data} />;
}
