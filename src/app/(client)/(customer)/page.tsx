"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  ArrowRight,
  Frame,
  Heart,
  TrendingUp,
  Package,
  Shield,
} from "lucide-react";
import ProductCard, { type Product } from "@/components/ui/ProductCard";
import { useState } from "react";
import Hero from "@/components/homePage/hero";

// Enhanced mock data with better product information
const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Classic Wooden Frame",
    price: 89,
    originalPrice: 120,
    image: "/placeholder-frame-1.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: false,
    isBestseller: true,
    category: "Wooden Frames",
    description: "Handcrafted from premium oak wood with a natural finish",
    sizes: ["5x7", "8x10", "11x14", "16x20"],
    colors: ["Natural", "Dark Walnut", "White Wash"],
    inStock: true,
  },
  {
    id: 2,
    name: "Modern Metal Frame",
    price: 65,
    originalPrice: null,
    image: "/placeholder-frame-2.jpg",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isBestseller: false,
    category: "Metal Frames",
    description: "Sleek aluminum frame perfect for contemporary spaces",
    sizes: ["4x6", "5x7", "8x10", "12x16"],
    colors: ["Silver", "Black", "Gold"],
    inStock: true,
  },
  {
    id: 3,
    name: "Vintage Gold Frame",
    price: 145,
    originalPrice: 180,
    image: "/placeholder-frame-3.jpg",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isBestseller: true,
    category: "Vintage Collection",
    description: "Ornate gold-leafed frame with intricate baroque details",
    sizes: ["8x10", "11x14", "16x20", "20x24"],
    colors: ["Antique Gold", "Silver Leaf"],
    inStock: true,
  },
  {
    id: 4,
    name: "Minimalist Black Frame",
    price: 75,
    originalPrice: null,
    image: "/placeholder-frame-4.jpg",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isBestseller: false,
    category: "Modern Collection",
    description: "Clean lines and matte black finish for a modern aesthetic",
    sizes: ["5x7", "8x10", "11x14"],
    colors: ["Matte Black", "Glossy Black"],
    inStock: false, // Example of out of stock item
  },
];

const categories = [
  { name: "Wedding Frames", href: "/categories/wedding", icon: "💍" },
  { name: "Baby Photos", href: "/categories/baby", icon: "👶" },
  { name: "Family Portraits", href: "/categories/family", icon: "👨‍👩‍👧‍👦" },
  { name: "Art Prints", href: "/categories/art", icon: "🎨" },
  { name: "Custom Sizes", href: "/categories/custom", icon: "📐" },
  { name: "Vintage Style", href: "/categories/vintage", icon: "🕰️" },
];

export default function HomePage() {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    // You could show a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />
      {/* Categories Section */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Shop by Category
            </h2>
            <p className="text-[var(--color-secondary)] text-lg max-w-2xl mx-auto">
              Find the perfect frame for any occasion or memory
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="block p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl hover:border-rose-500 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-[var(--color-foreground)] group-hover:text-rose-600 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[var(--color-muted)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] mb-4">
                Featured Products
              </h2>
              <p className="text-[var(--color-secondary)] text-lg">
                Our most popular frames, loved by customers
              </p>
            </div>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-[var(--color-primary)]/90 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={wishlistItems.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Frame Your Memories?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their most
              precious moments
            </p>
            <Link href="/custom">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rose-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
              >
                <Frame className="w-5 h-5" />
                <span>Start Custom Order</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
