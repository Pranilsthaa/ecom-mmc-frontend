"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Star, Eye } from "lucide-react";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const galleryItems = [
    {
      id: 1,
      title: "Wedding Memories",
      category: "Wedding",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      views: 1200,
    },
    {
      id: 2,
      title: "Family Portrait",
      category: "Family",
      image: "/placeholder.svg?height=500&width=400",
      rating: 5,
      views: 890,
    },
    {
      id: 3,
      title: "Baby's First Steps",
      category: "Milestone",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      views: 2100,
    },
    {
      id: 4,
      title: "Anniversary Celebration",
      category: "Anniversary",
      image: "/placeholder.svg?height=600&width=400",
      rating: 5,
      views: 750,
    },
    {
      id: 5,
      title: "Graduation Day",
      category: "Achievement",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      views: 1500,
    },
    {
      id: 6,
      title: "Travel Adventures",
      category: "Travel",
      image: "/placeholder.svg?height=500&width=400",
      rating: 5,
      views: 980,
    },
  ];

  return (
    <section id="gallery" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-800">
            Our{" "}
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how we've helped families preserve their most precious memories
            with our beautiful raisin frames.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heart Icon */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                >
                  <Heart className="w-5 h-5 text-rose-600" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors duration-300">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-rose-600 hover:text-rose-700 font-semibold text-sm transition-colors duration-200"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
