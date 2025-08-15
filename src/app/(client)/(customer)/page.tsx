import Hero from "@/components/homePage/hero";
import FeaturedProductsLoading from "@/components/homePage/FeaturedProductsLoading";
import HomePageClient from "@/components/homePage/HomePageClient";
import { Metadata } from "next";
import { Suspense } from "react";
import FeaturedProduct from "@/components/homePage/featuredProduct";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Premium Picture Frames | Custom Framing Solutions",
    description:
      "Discover our featured collection of premium picture frames including handcrafted wooden frames and modern metal designs. Free shipping on orders over $50.",
    keywords:
      "picture frames, custom framing, wooden frames, metal frames, photo frames",
    openGraph: {
      title: "Premium Picture Frames | Custom Framing Solutions",
      description: "Shop our curated collection of premium picture frames",
      images: ["/og-image.jpg"],
    },
  };
}

export default async function HomePage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Categories and CTA Sections (Client-side for animations) */}
      <HomePageClient />

      {/* Featured Products (Server-side rendered) */}
      <Suspense fallback={<FeaturedProductsLoading />}>
        <FeaturedProduct />
      </Suspense>
    </main>
  );
}
