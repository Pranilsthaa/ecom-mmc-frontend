import CTA from "@/components/home/cta";
import Features from "@/components/home/features";
import Gallery from "@/components/home/gallery";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import type { Metadata } from "next";

const title = "MemoryFrame | Handcrafted Frames for Your Favorite Memories";
const description =
  "Preserve your favorite photos in handcrafted wood frames. Explore MemoryFrame, our process, and the stories behind every keepsake.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MemoryFrame",
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
};

// Organization data only. No rating or review markup until the figures on the
// page come from real, verifiable reviews.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MemoryFrame",
  description,
  foundingDate: "2023",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // Escape "<" so the JSON can never close the script tag early.
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
