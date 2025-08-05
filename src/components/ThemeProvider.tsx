"use client";

import React, { useEffect, useState } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setTheme(theme);
  }, []);

  return <div>{children}</div>;
};

export default ThemeProvider;
