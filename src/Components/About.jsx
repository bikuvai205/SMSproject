import React from "react";
import { motion } from "framer-motion";
import bikash from "../assets/image/bikash.png";
import dinesh from "../assets/image/dinesh.png";
import prajjwal from "../assets/image/prajjwal.png";

// Reusable slide-in and fade-in variants for text
const slideFadeVariant = (direction = "top", delay = 0) => ({
  initial: { opacity: 0, y: direction === "top" ? -50 : 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 1, ease: "easeOut", delay },
});

// Simple fade-in variant for profile cards
const fadeInVariant = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: false, amount: 0.3 },
  transition: { duration: 1, ease: "easeOut", delay },
});

// Developer Data
const team = [
  {
    name: "Bikash Timalsina",
    role: "Full-Stack Learner",
    desc: "Exploring both frontend & backend with a passion for clean, practical systems.",
    image: bikash,
  },
  {
    name: "Dinesh Kharel",
    role: "Frontend Enthusiast",
    desc: "Loves building intuitive interfaces and improving user experience.",
    image: dinesh,
  },
  {
    name: "Prajjwal Koirala",
    role: "Backend Explorer",
    desc: "Focused on logic, databases, and making systems reliable and scalable.",
    image: prajjwal,
  },
];

const About = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900 py-20 px-5 sm:px-10 md:px-20">
      
      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-blue-900 dark:text-white text-center"
        {...slideFadeVariant("top", 0)}
      >
        About <span className="text-blue-700">Us</span>
      </motion.h2>

      {/* Paragraphs */}
      <motion.div
        className="max-w-4xl mx-auto text-center mt-6"
        {...slideFadeVariant("bottom", 0.1)}
      >
        <p className="text-lg text-blue-700 dark:text-gray-300 leading-relaxed">
          Adhyanam — derived from Sanskrit, meaning 'study' — is a modern student management platform created by a team of three passionate student developers. While our core mission is to help institutions manage student information efficiently, our broader vision is to enhance the overall study environment with technology-driven tools like attendance tracking, grading systems, and performance insights.
        </p>
        <p className="mt-6 text-lg text-blue-700 dark:text-gray-300 leading-relaxed">
          As first-time developers, we're diving deep into both frontend and backend development, exploring real-world challenges hands-on. Our project is not only a technical milestone but also a step toward improving how education is administered. We're committed to releasing updates and new features in the future to make Adhyanam even more impactful.
        </p>
      </motion.div>

      {/* Developer Cards */}
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-all duration-300"
            {...fadeInVariant(idx * 0.1 + 0.1)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-400 dark:border-blue-600"
            />
            <h3 className="mt-4 text-xl font-semibold text-blue-900 dark:text-white">
              {member.name}
            </h3>
            <p className="text-blue-700 dark:text-gray-400">{member.role}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{member.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
