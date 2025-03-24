import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandContext } from "../Context/BrandContext";
import { server_url } from "../services/server_url";
import { motion, AnimatePresence } from "framer-motion";

function BrandsBanner() {
  const { brands } = useContext(BrandContext);
  const navigate = useNavigate();
  const [displayedBrands, setDisplayedBrands] = useState([]);

  // Function to pick 5 random brands
  const getRandomBrands = () => {
    if (brands.length <= 5) return brands;
    const shuffled = [...brands].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  useEffect(() => {
    setDisplayedBrands(getRandomBrands());

    const interval = setInterval(() => {
      setDisplayedBrands(getRandomBrands());
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [brands]);

  return (
    <div className="text-center p-6 border-t-2 border-gray-200 bg-white">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Brands</h2>
      <p className="text-lg text-gray-600 mb-6">Trusted by millions around the world</p>

      {/* Brand Logos Section with Animation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 bg-gray-100 rounded-lg relative overflow-hidden">
        <AnimatePresence mode="wait">
          {displayedBrands.map((brand) => (
            <motion.div
              key={brand.brandName}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Link
                to={`/brands/${brand.brandName}`}
                className="group flex flex-col items-center p-4 rounded-xl shadow-md bg-blue-100 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition">
                  <img
                    src={`${server_url}/uploads/${brand.image}`}
                    alt={brand.brandName}
                    className="h-16 object-contain"
                  />
                </div>
                <span className="mt-3 text-gray-800 font-semibold text-lg group-hover:text-blue-600 transition">
                  {brand.brandName}
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Explore More Brands Button */}
      <button
        onClick={() => navigate("/view-all-brands")}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md"
      >
        Explore More Brands →
      </button>
    </div>
  );
}

export default BrandsBanner;
