"use client";

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {eg}
    </main>
  );
}
