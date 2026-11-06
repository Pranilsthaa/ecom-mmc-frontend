"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    function syncTheme() {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        // Use the system preference when browser storage is unavailable.
      }
      document.documentElement.dataset.theme =
        saved === "light" || saved === "dark"
          ? saved
          : preference.matches ? "dark" : "light";
    }
    syncTheme();
    preference.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      preference.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // The selected theme still applies for the current visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle light / dark mode"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:text-rose-600 dark:hover:text-rose-400"
    >
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
    </button>
  );
}
