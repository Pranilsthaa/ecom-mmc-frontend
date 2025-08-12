"use client";

import { motion } from "motion/react";
import { Camera, Frame, Upload, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const orderSteps = [
  {
    id: 1,
    title: "Choose Frame Type",
    description: "Select from our premium frame collection",
    icon: Frame,
    completed: false,
  },
  {
    id: 2,
    title: "Upload Photos",
    description: "Add your precious memories",
    icon: Upload,
    completed: false,
  },
  {
    id: 3,
    title: "Customize",
    description: "Size, color, and finishing options",
    icon: Camera,
    completed: false,
  },
];

export default function CustomOrderPage() {
  return (
    <main className="pt-20 min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-6">
            Create Your Custom Frame
          </h1>
          <p className="text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
            Transform your favorite photos into beautiful, handcrafted frames.
            Our expert artisans will create something truly special for you.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                    step.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-[var(--color-border)] text-[var(--color-secondary)]"
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < orderSteps.length - 1 && (
                  <div
                    className={`h-1 w-24 mx-4 ${
                      step.completed
                        ? "bg-green-500"
                        : "bg-[var(--color-border)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {orderSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-semibold text-[var(--color-foreground)] mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--color-secondary)] text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Photo Frames */}
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-8 hover:border-[var(--color-primary)] transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                Photo Frames
              </h3>
              <p className="text-[var(--color-secondary)] mb-6">
                Upload your digital photos and we'll create beautiful custom
                frames. Perfect for family photos, wedding pictures, and special
                moments.
              </p>
              <ul className="text-left space-y-2 mb-8 text-[var(--color-secondary)]">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Digital upload process
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Premium print quality
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Multiple size options
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Express shipping available
                </li>
              </ul>
              <Link href="/custom/photos">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start Photo Order</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Flower/Garland Preservation */}
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-8 hover:border-[var(--color-primary)] transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Frame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">
                Flower Preservation
              </h3>
              <p className="text-[var(--color-secondary)] mb-6">
                Preserve your wedding bouquet, anniversary flowers, or special
                garlands in a beautiful custom frame that will last forever.
              </p>
              <ul className="text-left space-y-2 mb-8 text-[var(--color-secondary)]">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Professional preservation
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Pickup or shipping options
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Custom display layouts
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Lifetime guarantee
                </li>
              </ul>
              <Link href="/custom/flowers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start Flower Order</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
            Why Choose MemoryFrame?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-[var(--color-secondary)] text-sm">
                Premium materials and expert craftsmanship with lifetime
                warranty
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Frame className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Custom Design</h3>
              <p className="text-[var(--color-secondary)] text-sm">
                Personalized consultation and design process for every order
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Expert Care</h3>
              <p className="text-[var(--color-secondary)] text-sm">
                Professional handling and preservation of your precious memories
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
