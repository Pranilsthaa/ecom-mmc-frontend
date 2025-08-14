"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect } from "react";
import { useValidateUser } from "@/hooks/api/useValidateUser";
import { useAuthStore } from "@/stores/useAuthStore";
import Modal from "@/components/ui/modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data, isSuccess, isError } = useValidateUser();
  // const { setUser, logout } = useAuthStore();

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     setUser(data); // save valid user to store
  //   }
  //   if (isError) {
  //     logout(); // clear user if validation fails
  //   }
  // }, [isSuccess, isError, data, setUser]);
  return (
    <>
      <Modal />
      {children}
    </>
  );
}
