import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { server_url } from "../services/server_url";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function CategoryBanner() {
  const { categories } = useContext(CategoryContext);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const navigate = useNavigate();

  // Function to shuffle & show 5 random categories every 5 seconds
  useEffect(() => {
    if (categories.length > 0) {
      const updateCategories = () => {
        const shuffled = [...categories].sort(() => 0.5 - Math.random());
        setVisibleCategories(shuffled.slice(0, 5));
      };
      updateCategories(); // Initial call
      const interval = setInterval(updateCategories, 5000);
      return () => clearInterval(interval);
    }
  }, [categories]);

  return (
    <div className="relative bg-gray-900 py-12 px-6 text-center text-white">
      {/* Title & Subtitle */}
      <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-lg">
        Discover Our Categories
      </h1>
      <p className="text-lg text-gray-300 mt-2">
        Find the best healthcare products & medical essentials
      </p>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-8 px-4">
        {visibleCategories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${encodeURIComponent(category.categoryName)}`}
            className="  transition transform hover:scale-105"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 flex justify-center items-center rounded-full overflow-hidden bg-green-100 shadow-md">
                <img
                  src={`${server_url}/uploads/${category.image}`}
                  alt={category.categoryName}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-white font-semibold text-lg mt-3">
                {category.categoryName}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Explore More Categories Button */}
      <button
        onClick={() => navigate("/view-all-categories")}
        className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all shadow-md"
      >
        Explore More Categories →
      </button>
    </div>
  );
}

export default CategoryBanner;
