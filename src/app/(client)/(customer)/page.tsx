"use client";

import CTA from "@/components/homePage/cta";
import Features from "@/components/homePage/features";
import Footer from "@/components/homePage/footer";
import Gallery from "@/components/homePage/gallery";
import Hero from "@/components/homePage/hero";
import HowItWorks from "@/components/homePage/howItWorks";
import Testimonials from "@/components/homePage/testimonials";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [eg, setEg] = useState<string>("No Auth");
  const dummyrequest = async () => {
    const response = await api.post("/order/get-order");
    setEg(response.data.message);
  };
  useEffect(() => {
    dummyrequest();
  }, []);

  return (
    <main className="relative">
      <Hero />
      <Features />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
