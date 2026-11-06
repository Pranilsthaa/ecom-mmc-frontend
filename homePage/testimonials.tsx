"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Star, Quote, MapPin, Calendar } from "lucide-react";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const testimonials = [
    {
      id: 1,
      name: "Jessica Martinez",
      role: "Mom of 3",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I was honestly skeptical about ordering frames online, but wow! The quality blew me away. Sarah personally called me to discuss the layout for my kids' school photos. The frames arrived perfectly packaged, and they look absolutely stunning in our hallway. My mother-in-law keeps asking where I got them!",
      location: "Denver, CO",
      date: "3 weeks ago",
      verified: true,
    },
    {
      id: 2,
      name: "Robert & Linda Chen",
      role: "Celebrating 30 years",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "We wanted something special for our anniversary photos, not just another generic frame from the store. Mike helped us choose the perfect raisin wood finish that matches our dining room furniture. The craftsmanship is incredible - you can feel the quality. Worth every penny!",
      location: "Portland, OR",
      date: "1 month ago",
      verified: true,
    },
    {
      id: 3,
      name: "Amanda Thompson",
      role: "Recent bride",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Planning a wedding is stressful enough, but MemoryFrame made this part so easy! They worked with my weird timeline (needed them in 2 weeks) and even sent me photos during the process. My wedding photos look like they belong in a museum. All my friends are asking for the contact info!",
      location: "Nashville, TN",
      date: "2 weeks ago",
      verified: true,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-gradient-to-br from-rose-50/50 to-amber-50/50 relative overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-rose-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-amber-300 rounded-lg rotate-45"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800">
            Real Stories from{" "}
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Real Families
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what families are saying
            about their MemoryFrame experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 relative group"
            >
              {/* Verified Badge */}
              {testimonial.verified && (
                <div className="absolute -top-3 right-6">
                  <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Verified</span>
                  </div>
                </div>
              )}

              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-6">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{testimonial.date}</span>
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed text-base">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-rose-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Authentic Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              number: "2,847",
              label: "Frames Delivered",
              subtext: "and counting!",
            },
            {
              number: "4.8★",
              label: "Average Rating",
              subtext: "from real reviews",
            },
            {
              number: "12,000+",
              label: "Photos Framed",
              subtext: "memories preserved",
            },
            {
              number: "98.5%",
              label: "Would Recommend",
              subtext: "to friends & family",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center space-y-2 group"
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-700 font-semibold">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.subtext}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Join the families who've made MemoryFrame part of their story
          </p>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <span>★★★★★</span>
            <span>•</span>
            <span>Featured in Better Homes & Gardens</span>
            <span>•</span>
            <span>Family Business of the Year 2023</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
