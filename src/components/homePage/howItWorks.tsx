"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Upload, Palette, Hammer, Truck } from "lucide-react";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Photos",
      description:
        "Simply upload your precious memories through our secure platform. We accept all major formats.",
      step: "01",
    },
    {
      icon: Palette,
      title: "Choose Your Style",
      description:
        "Select from our premium raisin frame collection and customize colors, sizes, and layouts.",
      step: "02",
    },
    {
      icon: Hammer,
      title: "Expert Crafting",
      description:
        "Our skilled artisans carefully craft your frame using museum-grade materials and techniques.",
      step: "03",
    },
    {
      icon: Truck,
      title: "Delivered to You",
      description:
        "Your beautifully framed memories are carefully packaged and delivered to your doorstep.",
      step: "04",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-32 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-background)] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-rose-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-amber-300 rounded-lg rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800">
            How It{" "}
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From upload to delivery, we make preserving your memories simple and
            stress-free.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-rose-200 to-amber-200 z-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    className="h-full bg-gradient-to-r from-rose-500 to-orange-500 origin-left"
                  />
                </div>
              )}

              <div className="relative z-10 text-center space-y-6">
                {/* Step Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 text-white font-bold text-xl rounded-full shadow-lg"
                >
                  {step.step}
                </motion.div>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto border border-gray-100"
                >
                  <step.icon className="w-10 h-10 text-rose-600" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Order Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
