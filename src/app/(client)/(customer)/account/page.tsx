"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Package,
  HelpCircle,
  Edit3,
  ChevronRight,
  Calendar,
  Star,
  Heart,
  MessageCircle,
  Clock,
  Shield,
  Camera,
  MapPin,
} from "lucide-react";
import Link from "next/link";

type TabType = "profile" | "orders" | "support";

const mockOrders = [
  {
    id: "MF-A1B2C3",
    date: "2024-01-15",
    status: "delivered",
    items: "Wedding garland frame",
    total: "$189.00",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: "MF-D4E5F6",
    date: "2024-01-08",
    status: "crafting",
    items: "Family portrait collection",
    total: "$145.00",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "MF-G7H8I9",
    date: "2023-12-20",
    status: "delivered",
    items: "Holiday bouquet preservation",
    total: "$225.00",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [editingProfile, setEditingProfile] = useState(false);

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "orders" as TabType, label: "Orders", icon: Package },
    { id: "support" as TabType, label: "Support", icon: HelpCircle },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          color: "text-[var(--color-accent)] bg-[var(--color-accent)]/10",
          label: "Delivered",
        };
      case "crafting":
        return {
          color: "text-[var(--color-primary)] bg-[var(--color-primary)]/10",
          label: "Being Crafted",
        };
      case "shipped":
        return { color: "text-blue-600 bg-blue-50", label: "On the Way" };
      default:
        return {
          color: "text-[var(--color-secondary)] bg-[var(--color-muted)]",
          label: "Processing",
        };
    }
  };

  const completedOrders = mockOrders.filter(
    (order) => order.status === "delivered"
  ).length;
  const totalSpent = mockOrders.reduce(
    (sum, order) => sum + Number.parseFloat(order.total.replace("$", "")),
    0
  );

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm mb-2">
          <Link href="/" className="text-[var(--color-primary)] underline">
            Home
          </Link>
          <span className="text-[var(--color-secondary)]">/</span>
          <span className="text-[var(--color-secondary)]">My Account</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold">
          Welcome back, Sarah!
        </h1>
        <p className="text-[var(--color-secondary)]">
          Your memory preservation journey
        </p>
      </div>

      {/* Top Navigation */}
      <div className="sticky top-16 card mb-6 overflow-hidden bg-[var(--color-muted)] z-1">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 px-4 transition-colors relative ${
                activeTab === tab.id
                  ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                  : "text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]/60"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <>
              {/* Profile Header Card */}
              <div className="card overflow-hidden">
                {/* Cover Background */}
                <div className="h-32 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Profile Content */}
                <div className="px-6 pb-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-xl">
                          <div className="w-full h-full rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 grid place-items-center">
                            <User className="w-12 h-12 text-[var(--color-primary)]" />
                          </div>
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white grid place-items-center shadow-lg hover:bg-[var(--color-primary)]/90 transition-colors">
                          <Camera className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 sm:mt-0 justify-center sm:justify-end">
                      <button
                        onClick={() => setEditingProfile(!editingProfile)}
                        className="btn btn-primary px-6 py-2 inline-flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        {editingProfile ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[var(--color-muted)]/40 border border-[var(--color-border)]">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--color-primary)]">
                        {mockOrders.length}
                      </div>
                      <div className="text-xs text-[var(--color-secondary)]">
                        Orders
                      </div>
                    </div>
                    <div className="text-center border-x border-[var(--color-border)]">
                      <div className="text-xl font-bold text-[var(--color-accent)]">
                        4.9
                      </div>
                      <div className="text-xs text-[var(--color-secondary)]">
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-[var(--color-primary)]">
                        ${totalSpent.toFixed(0)}
                      </div>
                      <div className="text-xs text-[var(--color-secondary)]">
                        Spent
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[var(--color-primary)]" />
                  Personal Information
                </h3>

                {editingProfile ? (
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--color-foreground)]">
                          First Name
                        </label>
                        <input
                          className="input w-full h-12"
                          defaultValue="Sarah"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-[var(--color-foreground)]">
                          Last Name
                        </label>
                        <input
                          className="input w-full h-12"
                          defaultValue="Johnson"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--color-foreground)]">
                        Email Address
                      </label>
                      <input
                        className="input w-full h-12"
                        type="email"
                        defaultValue="sarah.johnson@example.com"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--color-foreground)]">
                        Phone Number
                      </label>
                      <input
                        className="input w-full h-12"
                        defaultValue="+1 (555) 123-4567"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[var(--color-foreground)]">
                        Shipping Address
                      </label>
                      <textarea
                        className="input w-full min-h-[100px] resize-none"
                        defaultValue="123 Oak Street&#10;New York, NY 10001&#10;United States"
                        placeholder="Enter your full address"
                      />
                    </div>

                    <div className="flex gap-4 justify-center pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingProfile(false)}
                        className="btn btn-primary px-8 py-3 font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProfile(false)}
                        className="btn btn-ghost px-8 py-3 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white grid place-items-center">
                              <MessageCircle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold">Contact Information</h4>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wide mb-1">
                                Email
                              </p>
                              <p className="text-sm font-medium">
                                sarah.johnson@example.com
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wide mb-1">
                                Phone
                              </p>
                              <p className="text-sm font-medium">
                                +1 (555) 123-4567
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] text-white grid place-items-center">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold">Shipping Address</h4>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wide mb-1">
                              Address
                            </p>
                            <div className="text-sm font-medium space-y-1">
                              <p>123 Oak Street</p>
                              <p>New York, NY 10001</p>
                              <p className="text-[var(--color-secondary)]">
                                United States
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] grid place-items-center">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Change Password</h4>
                        <p className="text-sm text-[var(--color-secondary)]">
                          Update your account password
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)]/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] grid place-items-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email Preferences</h4>
                        <p className="text-sm text-[var(--color-secondary)]">
                          Manage your email notifications
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--color-secondary)]" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 grid place-items-center">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700">Sign Out</h4>
                        <p className="text-sm text-red-600">
                          Sign out of your account
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <>
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Your Orders</h2>
                  <Link href="/order" className="btn btn-primary px-4 py-2">
                    New Order
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    return (
                      <div
                        key={order.id}
                        className="p-4 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)]/60 transition-colors"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <img
                            src={order.image || "/placeholder.svg"}
                            alt="Order"
                            className="w-16 h-16 rounded-lg object-cover border border-[var(--color-border)]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">
                                Order {order.id}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                              >
                                {statusInfo.label}
                              </span>
                            </div>
                            <p className="text-sm text-[var(--color-secondary)]">
                              {order.items}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-[var(--color-secondary)]">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {order.date}
                            </span>
                            {order.rating && (
                              <div className="flex items-center gap-1">
                                {[...Array(order.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3 text-[var(--color-accent)] fill-current"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{order.total}</span>
                            <button className="btn btn-ghost px-3 py-1 text-sm inline-flex items-center gap-1">
                              View <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href="/order"
                  className="card p-6 hover:bg-[var(--color-muted)]/60 transition-colors"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] grid place-items-center mx-auto mb-3">
                      <Camera className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Frame More Memories</h3>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Start a new order
                    </p>
                  </div>
                </Link>
                <div className="card p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] grid place-items-center mx-auto mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1">Share Your Story</h3>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Leave a review
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Support Tab */}
          {activeTab === "support" && (
            <>
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4 text-center">
                  We're Here to Help
                </h2>
                <p className="text-[var(--color-secondary)] mb-6 text-center">
                  Questions about your order? Need help with something? We're
                  real people who care about your memories.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <button className="p-6 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)]/60 transition-colors">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] grid place-items-center mx-auto mb-3">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">Chat with Us</h3>
                      <p className="text-sm text-[var(--color-secondary)]">
                        Usually respond within 2 hours
                      </p>
                    </div>
                  </button>

                  <button className="p-6 rounded-xl border border-[var(--color-border)] hover:bg-[var(--color-muted)]/60 transition-colors">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] grid place-items-center mx-auto mb-3">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold mb-1">Common Questions</h3>
                      <p className="text-sm text-[var(--color-secondary)]">
                        Quick answers to frequent questions
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-center">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[var(--color-muted)]/60">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 grid place-items-center">
                      <MessageCircle className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-[var(--color-secondary)]">
                        hello@memoryframe.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[var(--color-muted)]/60">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 grid place-items-center">
                      <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">We're Available</p>
                      <p className="text-sm text-[var(--color-secondary)]">
                        Monday-Friday, 9AM-6PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-5 h-5 text-[var(--color-accent)]" />
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">
                      Your Privacy Matters
                    </h3>
                    <p className="text-sm text-[var(--color-secondary)]">
                      We never share your information and protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
