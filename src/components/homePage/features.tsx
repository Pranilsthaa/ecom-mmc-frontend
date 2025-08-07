"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Heart, Shield, Truck, Clock, Users, Leaf } from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "-30px"]);

  const features = [
    {
      icon: Heart,
      title: "Family-Owned & Personal",
      description:
        "Sarah & Mike personally oversee every order. We're not a factory - we're a family business that cares about your memories as much as you do.",
      color: "rose",
      highlight: "Personal touch guaranteed",
    },
    {
      icon: Leaf,
      title: "Sustainable Raisin Wood",
      description:
        "Our signature raisin wood comes from responsibly managed forests. Each piece has unique grain patterns that make your frame one-of-a-kind.",
      color: "amber",
      highlight: "Eco-friendly choice",
    },
    {
      icon: Users,
      title: "Free Design Consultation",
      description:
        "Stuck on layout or sizing? Our team offers complimentary 15-minute calls to help you create the perfect arrangement for your space.",
      color: "orange",
      highlight: "Real humans, not bots",
    },
    {
      icon: Truck,
      title: "White-Glove Delivery",
      description:
        "Every frame is hand-packed with custom foam inserts. We've shipped over 2,800 frames with zero damage claims (knock on wood!).",
      color: "rose",
      highlight: "Zero damage record",
    },
    {
      icon: Clock,
      title: "Rush Orders Available",
      description:
        "Need it fast? We offer 5-day rush service for those last-minute gifts or special occasions. Just give us a call and we'll make it happen.",
      color: "amber",
      highlight: "We've got your back",
    },
    {
      icon: Shield,
      title: "Lifetime Craftsmanship Promise",
      description:
        "If anything ever goes wrong with the craftsmanship (not normal wear), we'll fix or replace it. No questions asked, no time limit.",
      color: "orange",
      highlight: "We stand behind our work",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      rose: "bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white",
      amber:
        "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
      orange:
        "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-32 h-32 border border-rose-200 rounded-full opacity-20"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-24 h-24 border border-amber-200 rounded-lg rotate-12 opacity-20"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Why Families Choose{" "}
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              MemoryFrame
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another frame company. We're craftspeople who
            understand that your photos deserve more than mass-produced frames.
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Currently crafting 47 orders</span>
            </div>
            <span>•</span>
            <span>Est. delivery: 7-10 days</span>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group  bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300  relative overflow-hidden"
            >
              {/* Highlight Badge */}
              <div className="absolute top-2 -right-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {feature.highlight}
              </div>

              <div className="space-y-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${getColorClasses(
                    feature.color
                  )}`}
                >
                  <feature.icon className="w-8 h-8 transition-colors duration-300" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with more personality */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 space-y-4"
        >
          <p className="text-gray-600 text-lg">
            Ready to see the MemoryFrame difference?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Your Custom Order
          </motion.button>
          <p className="text-sm text-gray-500">
            No commitment • Free consultation • 30-day guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
