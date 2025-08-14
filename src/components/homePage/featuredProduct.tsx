import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductCard, { Product } from "../ui/ProductCard";
import { ProductsAPI } from "@/lib/productsAPI";

interface FeaturedProductProps {
  initialProducts?: Product[];
}

const FeaturedProduct: React.FC<FeaturedProductProps> = async ({}) => {
  const featuredProducts = await ProductsAPI.getFeaturedProducts();
  return (
    <section className="py-16 bg-[var(--color-muted)]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Featured Products
            </h2>
            <p className="text-[var(--color-secondary)] text-lg">
              Our most popular frames, loved by customers
            </p>
          </div>
          <Link href="/shop">
            <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-[var(--color-primary)]/90 transition-colors">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
