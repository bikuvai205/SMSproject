import React from "react";
import { motion } from "framer-motion";
import UI from "../assets/image/UI.png";
import Role from "../assets/image/Roles.png";
import Add from "../assets/image/Enroll.png";
import Attend from "../assets/image/Attendance.png";
import Result from "../assets/image/Result.png";
import Notice from "../assets/image/Notice.png";

const Features = () => {
  const featuresList = [
    {
      title: "Simple UserInterface",
      desc: "Clean dashboard for students, teachers to access all features without confusion.",
      icon: UI
    },
    {
      title: "Multi-User Roles",
      desc: "Assign customized roles for admin, teachers, students with controlled access.",
      icon: Role
    },
    {
      title: "Simple Student Enrollment",
      desc: "Quick and easy student registration with a clean form layout and instant confirmation alerts.",
      icon: Add
    },
    {
      title: "Notice Board",
      desc: "Display school notices and announcements instantly with simple publishing tools.",
      icon: Notice
    },
    {
      title: "Attendance Management",
      desc: "Easily monitor and manage attendance with intuitive dashboards, filters, and visual summaries.",
      icon: Attend
    },
    {
      title: "Result Export",
      desc: "Download student results in PDF format for easy sharing, printing, and record keeping.",
      icon: Result
    }
  ];

  return (
    <div className="mx-auto px-5 py-16 md:px-10 md:py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto w-full max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.6 }}
          className="text-4xl font-extrabold text-blue-900 dark:text-white md:text-5xl"
        >
          Adhyanam <span className="text-blue-700">Features</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.6 }}
          className="mx-auto mb-8 mt-4 max-w-[528px] md:mb-12 lg:mb-16"
        >
          <p className="text-lg text-blue-700 dark:text-gray-300">
            Adhyanam provides all-in-one tools to help schools and colleges manage academic, administrative, and communication tasks efficiently.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
        {featuresList.map((feature, index) => {
          const direction = index % 2 === 0 ? -50 : 50;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-8 flex flex-col rounded-2xl border border-blue-300 bg-white p-8 shadow-lg dark:border-gray-600 dark:bg-gray-800 lg:mb-4"
            >
              <div className="absolute -top-8 right-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-100 shadow-md dark:border-gray-500 dark:bg-gray-700 lg:right-8">
                <img
                  src={feature.icon}
                  alt="Feature Icon"
                  className="h-12"
                />
              </div>
              <p className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
                {feature.title}
              </p>
              <p className="text-blue-700 dark:text-gray-300">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
