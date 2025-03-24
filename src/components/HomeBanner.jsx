import React from "react";
import { motion } from "framer-motion";
import {  FaHeartbeat } from "react-icons/fa";

function HomeBanner() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-100 px-6 py-12 lg:py-20">
      {/* Left Content */}
      <motion.div
        className="text-center lg:text-left lg:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-700">
          <h1 className="font-bold text-4xl md:text-6xl text-gray-700">
            Your Health, Our Priority
          </h1>
        </div>
        <h2 className="font-medium text-lg md:text-xl text-gray-600">
          Trusted Medicines & Healthcare Products at Your Fingertips
        </h2>

        <motion.button
          className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeartbeat className="text-lightBlue-400 text-xl" />
          <span>Explore Products</span>
        </motion.button>
      </motion.div>

      {/* Right Image - Reduced to Half Size */}
      <motion.img
        src="./banner-doc.png"
        alt="Healthcare Banner"
        className="w-1/4 md:w-1/4 lg:w-1/4 mt-8 lg:mt-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}

export default HomeBanner;
