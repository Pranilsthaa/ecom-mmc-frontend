"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Frame } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Wedding Frames",
    description: "Preserve your special day with elegant wedding photo frames",
    href: "/categories/wedding",
    image: "/placeholder-wedding.jpg",
    productCount: 24,
    featured: true,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 2,
    name: "Baby & Kids",
    description: "Capture precious moments of your little ones",
    href: "/categories/baby",
    image: "/placeholder-baby.jpg",
    productCount: 18,
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Family Portraits",
    description: "Beautiful frames for family memories",
    href: "/categories/family",
    image: "/placeholder-family.jpg",
    productCount: 32,
    featured: true,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Art & Prints",
    description: "Showcase your artwork and favorite prints",
    href: "/categories/art",
    image: "/placeholder-art.jpg",
    productCount: 45,
    featured: false,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: 5,
    name: "Vintage Style",
    description: "Classic and vintage-inspired frame designs",
    href: "/categories/vintage",
    image: "/placeholder-vintage.jpg",
    productCount: 28,
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 6,
    name: "Modern Minimalist",
    description: "Clean, contemporary frames for modern spaces",
    href: "/categories/modern",
    image: "/placeholder-modern.jpg",
    productCount: 21,
    featured: false,
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 7,
    name: "Custom Sizes",
    description: "Any size, any dimension - we'll make it perfect",
    href: "/categories/custom",
    image: "/placeholder-custom.jpg",
    productCount: 0,
    featured: false,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 8,
    name: "Flower Preservation",
    description: "Preserve wedding bouquets and special flowers",
    href: "/categories/flowers",
    image: "/placeholder-flowers.jpg",
    productCount: 12,
    featured: true,
    gradient: "from-rose-400 to-red-500",
  },
];

export default function CategoriesPage() {
  const featuredCategories = categories.filter((cat) => cat.featured);
  const allCategories = categories.filter((cat) => !cat.featured);

  return (
    <main className="pt-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-6">
            Shop by Category
          </h1>
          <p className="text-xl text-[var(--color-secondary)] max-w-3xl mx-auto">
            Find the perfect frame for every occasion. From wedding memories to
            family portraits, we have specialized collections to match your
            needs.
          </p>
        </motion.div>

        {/* Featured Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">
            Featured Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <Link href={category.href}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <div
                      className={`aspect-[4/3] bg-gradient-to-br ${category.gradient} flex items-center justify-center relative`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      <Frame className="w-16 h-16 text-white relative z-10" />

                      {/* Product count badge */}
                      {category.productCount > 0 && (
                        <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {category.productCount} items
                        </div>
                      )}
                    </div>

                    <div className="p-6 bg-[var(--color-background)] border border-[var(--color-border)] border-t-0 rounded-b-2xl">
                      <h3 className="font-bold text-[var(--color-foreground)] mb-2 group-hover:text-rose-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[var(--color-secondary)] text-sm mb-4">
                        {category.description}
                      </p>
                      <div className="flex items-center text-rose-600 font-medium text-sm group-hover:text-rose-700 transition-colors">
                        <span>Shop Now</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8">
            All Categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <Link href={category.href}>
                  <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 hover:border-rose-500 hover:shadow-lg transition-all duration-300 group">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Frame className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-semibold text-[var(--color-foreground)] mb-2 group-hover:text-rose-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[var(--color-secondary)] text-sm mb-3">
                      {category.description}
                    </p>

                    {category.productCount > 0 && (
                      <p className="text-xs text-[var(--color-secondary)]">
                        {category.productCount} products
                      </p>
                    )}

                    <div className="flex items-center text-rose-600 font-medium text-sm mt-3 group-hover:text-rose-700 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We specialize in custom orders. Tell us about your vision and we'll
            create the perfect frame for your unique needs.
          </p>
          <Link href="/custom">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-rose-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Frame className="w-5 h-5" />
              <span>Create Custom Order</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
