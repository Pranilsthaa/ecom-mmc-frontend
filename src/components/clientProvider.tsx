"use client";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/stores/useAuthStore";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";

const QClientProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const { setUser } = useAuthStore();
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QClientProvider;
