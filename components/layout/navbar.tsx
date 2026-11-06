"use client";

import Link from "next/link";
import { Frame, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import ThemeToggle from "@/components/theme/theme-toggle";

const links = [
  { href: "/#features", label: "Why MemoryFrame" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#testimonials", label: "Reviews" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="flex h-20 items-center justify-between gap-3">
          <Link href="/#home" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="MemoryFrame home">
            <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-sm">
              <Frame className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight sm:text-2xl">MemoryFrame</span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-rose-600 dark:hover:text-rose-400">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/#contact" className="hidden rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 sm:block">
              Get in touch
            </Link>
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
              className="flex size-11 items-center justify-center rounded-full border border-border lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" className={`${open ? "flex lg:hidden" : "hidden"} flex-col gap-1 border-t border-border py-4`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium text-muted hover:bg-surface hover:text-rose-600 dark:hover:text-rose-400">
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold text-rose-600 dark:text-rose-400">Get in touch</Link>
        </div>
      </nav>
    </header>
  );
}
