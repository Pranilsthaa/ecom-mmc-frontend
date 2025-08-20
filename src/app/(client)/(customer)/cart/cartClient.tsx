"use client";

import { motion } from "motion/react";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const cartItems = [
  {
    id: 1,
    name: "Classic Wooden Frame",
    price: 89,
    quantity: 2,
    image: "/placeholder-frame-1.jpg",
    size: "8x10 inches",
  },
  {
    id: 2,
    name: "Modern Metal Frame",
    price: 65,
    quantity: 1,
    image: "/placeholder-frame-2.jpg",
    size: "5x7 inches",
  },
];

export default function CartClient({ cartItems }) {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="pt-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] mb-4">
            Shopping Cart
          </h1>
          <p className="text-[var(--color-secondary)]">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <ShoppingCart className="w-24 h-24 text-[var(--color-secondary)] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[var(--color-secondary)] mb-8">
              Looks like you haven't added any frames yet
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary)]/90 transition-colors flex items-center space-x-2 mx-auto"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 flex items-center gap-6"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-foreground)] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[var(--color-secondary)] text-sm mb-2">
                        Size: {item.size}
                      </p>
                      <p className="text-2xl font-bold text-[var(--color-foreground)]">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[var(--color-border)] rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-[var(--color-muted)] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-[var(--color-muted)] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 sticky top-24"
              >
                <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-secondary)]">
                      Subtotal
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-secondary)]">
                      Shipping
                    </span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-secondary)]">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[var(--color-border)] pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-[var(--color-muted)]/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-[var(--color-secondary)]">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  </div>
                )}

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-foreground)] py-3 rounded-xl font-medium transition-all duration-300"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
