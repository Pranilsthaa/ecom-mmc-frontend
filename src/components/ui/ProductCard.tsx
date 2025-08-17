import Link from "next/link";
import { Star, ShoppingCart, TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";
import { AddToCartButton } from "./AddtoCardBtn";

export interface Product {
  name: string;
  slug: string;
  price: number;
  original_price?: number | null;
  image_url: string;
  image_alt: string;
  rating: number;
  review_count: number;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  available_sizes?: string[];
  color: string;
  in_stock: boolean;
  seo_title: string;
  seo_description: string;
  is_bestseller: boolean;
  is_new: boolean;
  category?: string;
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
  className = "",
}: ProductCardProps) {
  const discountPercentage = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

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
    <div className={`group relative ${className}`}>
      <Link href={`/products/${product.slug}`}>
        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl overflow-hidden group-hover:shadow-xl group-hover:border-[var(--color-primary)]/20 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Placeholder/Loading state */}
            {/* {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin" />
              </div>
            )} */}

            {/* Product Image */}
            <Image
              src={product.image_url}
              alt={product.image_alt}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110`}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Bestseller
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{discountPercentage}%
                </span>
              )}
              {product.in_stock === false && (
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quick Actions - Show on Hover */}
            <div className={`absolute top-3 right-3 flex flex-col gap-2 z-10`}>
              {/* Wishlist Button */}
              {/* <motion.button
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
              </motion.button> */}
            </div>
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
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-[var(--color-foreground)]">
                  ${product.price}
                </span>
                {product.original_price && (
                  <span className="text-sm text-[var(--color-secondary)] line-through">
                    ${product.original_price}
                  </span>
                )}
              </div>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
