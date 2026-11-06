"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Gift, Clock, Shield } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-white rounded-lg rotate-12 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Preserve Your
              <br />
              <span className="text-amber-100">Precious Memories?</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of families who have trusted us to transform their
              most treasured moments into beautiful, lasting keepsakes. Start
              your memory preservation journey today.
            </p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90"
          >
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-amber-200" />
              <span className="font-medium">20% Off First Order</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-amber-200" />
              <span className="font-medium">7-10 Day Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-amber-200" />
              <span className="font-medium">Lifetime Guarantee</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-50 text-rose-600 px-10 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-2xl flex items-center space-x-2 group"
            >
              <span>Start Your Order Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 px-10 py-4 rounded-full font-bold text-lg transition-all duration-200 backdrop-blur-sm"
            >
              View Pricing
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-8 border-t border-white/20"
          >
            <p className="text-white/80 text-sm mb-4">
              Trusted by families nationwide
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2,500+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10,000+</div>
                <div className="text-sm">Memories Preserved</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
