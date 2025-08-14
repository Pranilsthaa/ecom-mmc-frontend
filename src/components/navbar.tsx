"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Frame,
  Menu,
  X,
  ShoppingBag,
  User,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import ThemeSelect from "./ui/themeSelect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGlobalModalStore } from "@/stores/useGlobalModalStore";
import LoginForm from "./forms/loginform";
import { useLogin } from "@/hooks/api/useLogin";
import LoginSignupSwitcher from "./forms/LoginSignupSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemsCount] = useState(0); // TODO: Connect to cart store
  const pathname = usePathname();

  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Custom Frames", href: "/custom" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };
  const { openModal } = useGlobalModalStore();

  const toggleLoginModal = () => {
    openModal(<LoginSignupSwitcher />);
  };
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all bg-[var(--color-background)] duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Frame className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                MemoryFrame
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`text-[var(--color-foreground)] hover:text-rose-600 font-medium transition-colors duration-200 relative group ${
                    isActiveRoute(item.href) ? "text-rose-600" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 group-hover:w-full transition-all duration-300 ${
                      isActiveRoute(item.href) ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-[var(--color-foreground)] hover:text-rose-600 transition-colors duration-200 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Authentication Section */}
            {user ? (
              /* Account Button for authenticated users */
              <Link href="/account">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-[var(--color-foreground)] hover:text-rose-600 transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                </motion.button>
              </Link>
            ) : (
              /* Login button for unauthenticated users - same design as mobile */
              <motion.button
                onClick={toggleLoginModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </motion.button>
            )}

            {/* Theme Select */}
            <ThemeSelect />

            {/* CTA Button */}
            <Link href="/custom">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Custom Order</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button and Auth for unauthenticated users */}
          <div className="lg:hidden flex items-center space-x-3">
            {!user && (
              <motion.button
                onClick={toggleLoginModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[var(--color-foreground)] hover:text-rose-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--color-background)]/95 backdrop-blur-md border-t border-[var(--color-border)]"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-[var(--color-foreground)] hover:text-rose-600 font-medium py-2 transition-colors duration-200 ${
                      isActiveRoute(item.href) ? "text-rose-600" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                {user && (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-[var(--color-foreground)] hover:text-rose-600 transition-colors duration-200 relative"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-[var(--color-foreground)] hover:text-rose-600 transition-colors duration-200"
                    >
                      <User className="w-5 h-5" />
                    </Link>
                  </div>
                )}

                {/* Mobile Theme Select */}
                <ThemeSelect />
              </div>

              <Link href="/custom">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Custom Order</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
