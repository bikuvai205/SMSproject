import React from "react";
import { motion } from "framer-motion";

const Herosection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 h-screen">
      {/* SVG Background */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="pattern" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)" />
      </svg>

      {/* Blur Glow */}
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Adhyanam:{" "}
            <span className="text-blue-600">Smarter Student Management</span> System
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Adhyanam is a modern web-based student management system designed for simplifying academic administration. From attendance tracking to smart communication and performance monitoring, Adhyanam empowers institutions with a streamlined, user-friendly platform for both students and staff.
          </motion.p>

          {/* Button */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <a
              href="/register"
              className="rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Get Started →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Silver Divider Line */}
      <div className="w-full h-[2px] bg-gray-400 opacity-30 absolute bottom-0" />
    </div>
  );
};

export default Herosection;
