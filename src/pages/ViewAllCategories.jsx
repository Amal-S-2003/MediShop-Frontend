import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../Context/CategoryContext";
import { server_url } from "../services/server_url";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function ViewAllCategories() {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="container mx-auto px-6 py-12  min-h-screen">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8  drop-shadow-lg">
        Explore All Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.length > 0 ? (
          categories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/category/${encodeURIComponent(category.categoryName)}`}
                className="relative flex flex-col items-center p-6 bg-gray-800 shadow-lg rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1 text-center group"
              >
                {/* Category Icon Background */}
                <div className="w-20 h-20 flex justify-center overflow-hidden items-center rounded-full bg-gray-700 shadow-md mb-3">
                  <img
                    src={`${server_url}/uploads/${category.image}`}
                    alt={category.categoryName}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Category Name */}
                <span className="text-white font-semibold text-sm">
                  {category.categoryName}
                </span>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ViewAllCategories;
