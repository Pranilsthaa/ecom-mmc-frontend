"use client";
import { motion } from "motion/react";
import { Product } from "./ProductCard";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/hooks/api/useAddToCart";

export const AddToCartButton = ({ product }: { product: Product }) => {
  const { mutate: addToCart, isSuccess } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={product.in_stock === false}
      className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingCart className="w-4 h-4" />
      {product.in_stock === false ? "Out of Stock" : "Add to Cart"}
    </motion.button>
  );
};
