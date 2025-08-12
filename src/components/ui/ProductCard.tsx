"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  category?: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: number) => void;
  isInWishlist?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  index = 0,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className = "",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => {
      const filled = i < Math.floor(rating);
      const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5;

      return (
        <Star
          key={i}
          className={`w-4 h-4 ${
            filled
              ? "text-amber-400 fill-current"
              : halfFilled
              ? "text-amber-400 fill-current opacity-50"
              : "text-gray-300"
          }`}
        />
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl overflow-hidden group-hover:shadow-xl group-hover:border-[var(--color-primary)]/20 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Placeholder/Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
              </div>
            )}

            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.isNew && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  New
                </motion.span>
              )}
              {product.isBestseller && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"
                >
                  <TrendingUp className="w-3 h-3" />
                  Bestseller
                </motion.span>
              )}
              {discountPercentage > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                >
                  -{discountPercentage}%
                </motion.span>
              )}
              {product.inStock === false && (
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quick Actions - Show on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 flex flex-col gap-2 z-10"
            >
              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  isInWishlist
                    ? "bg-rose-500 text-white shadow-lg"
                    : "bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Product Name */}
            <h3 className="font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm font-medium text-[var(--color-foreground)] ml-1">
                {product.rating}
              </span>
              <span className="text-sm text-[var(--color-secondary)]">
                ({product.reviews})
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[var(--color-foreground)]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[var(--color-secondary)] line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
