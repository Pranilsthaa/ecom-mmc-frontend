"use client";
import { motion } from "motion/react";
import { Product } from "./ProductCard";
import { ShoppingCart } from "lucide-react";

export const AddToCartButton = ({ product }: { product: Product }) => {
  const onAddToCart = (id: number) => {};
  const onToggleWishlist = (id: number) => {};

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={product.inStock === false}
      className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
    >
      <ShoppingCart className="w-4 h-4" />
      {product.inStock === false ? "Out of Stock" : "Add to Cart"}
    </motion.button>
  );
};
