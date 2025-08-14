"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Frame } from "lucide-react";

const categories = [
  { name: "Wedding Frames", href: "/categories/wedding", icon: "💍" },
  { name: "Baby Photos", href: "/categories/baby", icon: "👶" },
  { name: "Family Portraits", href: "/categories/family", icon: "👨‍👩‍👧‍👦" },
  { name: "Art Prints", href: "/categories/art", icon: "🎨" },
  { name: "Custom Sizes", href: "/categories/custom", icon: "📐" },
  { name: "Vintage Style", href: "/categories/vintage", icon: "🕰️" },
];

export default function HomePageClient() {
  return (
    <>
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
    </>
  );
}
