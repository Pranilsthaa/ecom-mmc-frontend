"use client";

import { motion } from "motion/react";
import {
  Frame,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Heart,
} from "lucide-react";

export default function Footer() {
  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Story", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    services: [
      { name: "Wedding Frames", href: "#" },
      { name: "Family Portraits", href: "#" },
      { name: "Custom Orders", href: "#" },
      { name: "Bulk Orders", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Shipping Info", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
  };

  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-rose-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-amber-400 rounded-lg rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Frame className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
                MemoryFrame
              </h3>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Preserving your most precious memories with premium craftsmanship
              and attention to detail. Every frame tells a story, every memory
              deserves to last forever.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-rose-400" />
                <span>hello@memoryframe.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-rose-400" />
                <span>1-800-MEMORY-1</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>New York, NY</span>
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-rose-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-3">
                Follow Us
              </h5>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-rose-500 hover:to-orange-500 rounded-lg flex items-center justify-center transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-8 border-t border-gray-800"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-400">
                Get the latest news, offers, and memory preservation tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-white placeholder-gray-400 transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-8 border-t border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>&copy; 2024 MemoryFrame. All rights reserved.</span>
            <span>|</span>
            <a
              href="#"
              className="hover:text-rose-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="#"
              className="hover:text-rose-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-400 fill-current" />
            <span>for preserving memories</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
