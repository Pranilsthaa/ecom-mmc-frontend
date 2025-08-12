"use client";

import { motion } from "motion/react";
import Features from "@/components/homePage/features";
import HowItWorks from "@/components/homePage/howItWorks";
import Gallery from "@/components/homePage/gallery";
import Testimonials from "@/components/homePage/testimonials";
import Footer from "@/components/homePage/footer";
import {
  Package,
  Shield,
  Award,
  Users,
  Heart,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative">
      {/* About Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 bg-[var(--color-muted)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-[var(--color-foreground)]">About</span>
              <br />
              <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                Our Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-[var(--color-secondary)] leading-relaxed max-w-3xl mx-auto"
            >
              For over 15 years, we've been crafting premium custom frames that
              preserve your most precious memories. What started as a small
              family business has grown into a trusted name in quality framing,
              serving thousands of customers worldwide.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  15+
                </div>
                <div className="text-sm text-[var(--color-secondary)]">
                  Years of Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  50K+
                </div>
                <div className="text-sm text-[var(--color-secondary)]">
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  100K+
                </div>
                <div className="text-sm text-[var(--color-secondary)]">
                  Frames Crafted
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">
                  4.9
                </div>
                <div className="text-sm text-[var(--color-secondary)]">
                  Average Rating
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)]">
                Our Mission
              </h2>
              <p className="text-lg text-[var(--color-secondary)] leading-relaxed">
                We believe that every memory deserves to be beautifully
                preserved. Our mission is to create premium, handcrafted frames
                that not only protect your precious moments but enhance them,
                turning every photo into a work of art.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)]">
                      Quality First
                    </h4>
                    <p className="text-[var(--color-secondary)]">
                      Premium materials and expert craftsmanship in every frame
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)]">
                      Personal Touch
                    </h4>
                    <p className="text-[var(--color-secondary)]">
                      Custom solutions tailored to your unique needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[var(--color-accent)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--color-foreground)]">
                      Lifetime Value
                    </h4>
                    <p className="text-[var(--color-secondary)]">
                      Durable frames with lifetime warranty and support
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-[var(--color-muted)] rounded-3xl p-8 shadow-xl border border-[var(--color-border)]">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[var(--color-background)] p-6 rounded-2xl text-center shadow-sm">
                    <Award className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-3" />
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                      Award Winning
                    </h4>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Recognized for excellence
                    </p>
                  </div>
                  <div className="bg-[var(--color-background)] p-6 rounded-2xl text-center shadow-sm">
                    <Users className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-3" />
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                      Expert Team
                    </h4>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Skilled craftspeople
                    </p>
                  </div>
                  <div className="bg-[var(--color-background)] p-6 rounded-2xl text-center shadow-sm">
                    <Heart className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-3" />
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                      Passion Driven
                    </h4>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Love what we do
                    </p>
                  </div>
                  <div className="bg-[var(--color-background)] p-6 rounded-2xl text-center shadow-sm">
                    <Clock className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-3" />
                    <h4 className="font-semibold text-[var(--color-foreground)] mb-2">
                      Fast Delivery
                    </h4>
                    <p className="text-sm text-[var(--color-secondary)]">
                      Quick turnaround
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[var(--color-muted)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-foreground)] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-[var(--color-secondary)] text-lg max-w-2xl mx-auto">
              Here's what sets us apart in the world of custom framing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[var(--color-background)] p-8 rounded-2xl shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-all duration-300"
            >
              <Shield className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                Lifetime Warranty
              </h3>
              <p className="text-[var(--color-secondary)]">
                We stand behind our work with a comprehensive lifetime warranty
                on all our frames.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--color-background)] p-8 rounded-2xl shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-all duration-300"
            >
              <Package className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                Free Shipping
              </h3>
              <p className="text-[var(--color-secondary)]">
                Enjoy free shipping on all orders, carefully packaged to arrive
                in perfect condition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[var(--color-background)] p-8 rounded-2xl shadow-lg border border-[var(--color-border)] hover:shadow-xl transition-all duration-300"
            >
              <Star className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-3">
                5-Star Service
              </h3>
              <p className="text-[var(--color-secondary)]">
                Our customer service team is dedicated to ensuring your complete
                satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Features />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <Footer />
    </main>
  );
}
