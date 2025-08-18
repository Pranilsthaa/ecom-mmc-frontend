import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

const addToCart = async (id: string) => {
  const res = await api.post("/carts/add", { product_id: id });
  return res.data;
};

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["add_to_cart"],
    mutationFn: addToCart,
    onSuccess: () => {
      toast.message("Item added to cart");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toast.message(error.response?.data.message);
      }
      return toast.message("Error adding item to cart");
    },
  });
};
