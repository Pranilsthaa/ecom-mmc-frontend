"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  Play,
  Star,
  Award,
  Heart,
  Camera,
  Frame,
} from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Advanced parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Smooth spring animations
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springTextY = useSpring(textY, { stiffness: 150, damping: 25 });
  const springImageY = useSpring(imageY, { stiffness: 120, damping: 20 });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Parallax Background */}
      <motion.div
        style={{ y: springY, opacity, scale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-rose-400 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-400 rounded-full animate-ping delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-orange-400 rounded-full animate-ping delay-1400" />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-rose-300 rounded-full animate-ping delay-300" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content with Parallax */}
        <motion.div
          style={{ y: springTextY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 lg:pr-8"
        >
          {/* Authentic Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-200/50 shadow-sm"
          >
            <Award className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-medium text-gray-700">
              since 2023
            </span>
          </motion.div>

          {/* More Human Heading */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-gray-800">Turn Your</span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Favorite Photos
              </span>
              <br />
              <span className="text-gray-800 text-4xl lg:text-5xl">
                into Heirlooms
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl font-light"
            >
              We're Sarah & Mike, and we started MemoryFrame after struggling to
              find quality frames for our own wedding photos. Now we help
              families across America preserve their most treasured moments in
              handcrafted raisin wood frames.
            </motion.p>
          </div>

          {/* More authentic stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-8"
          >
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-gray-700 font-semibold">4.8/5</span>
              <span className="text-gray-500 text-sm">(2,847 reviews)</span>
            </div>
          </motion.div>

          {/* Human-like CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Get Started - It's Easy!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-rose-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>See How We Do It</span>
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center space-x-6 text-sm text-gray-500 pt-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>2,847 happy families</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
              <span>Free shipping nationwide</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - More Realistic Hero Image */}
        <motion.div
          style={{ y: springImageY }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:pl-8"
        >
          <div className="relative">
            {/* Main Frame Mockup */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-2xl overflow-hidden border-8 border-amber-800/20 transform rotate-2"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform -rotate-3">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Your Story
                    </h3>
                    <p className="text-gray-600 text-sm">Beautifully Framed</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-amber-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating authentic elements */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                x: [0, 3, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-100 transform -rotate-6"
            >
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-rose-600" />
                <span className="text-sm font-medium text-gray-700">
                  Handcrafted
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                x: [0, -2, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-100 transform rotate-3"
            >
              <div className="flex items-center space-x-2">
                <Frame className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">
                  Premium Wood
                </span>
              </div>
            </motion.div>

            {/* Small floating hearts */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 -right-8 text-rose-400"
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-1/3 -left-6 text-amber-400"
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-xs text-gray-500 font-medium">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-rose-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
