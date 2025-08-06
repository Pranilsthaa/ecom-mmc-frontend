"use client";
import Navbar from "@/components/navbar";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Toaster />
      <Navbar />
      {children}
    </div>
  );
};

export default ClientLayout;
