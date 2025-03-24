import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BrandContext } from "../Context/BrandContext";
import { server_url } from "../services/server_url";

function ViewAllBrands() {
  const { brands } = useContext(BrandContext);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Explore All Brands
      </h1>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <Link
              key={brand.brandName}
              to={`/brands/${brand.brandName}`}
              className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform"
            >
              <img
                src={`${server_url}/uploads/${brand.image}`}
                alt={brand.brandName}
                className="h-24 object-contain mb-2"
              />
              <span className="text-gray-700 font-medium text-lg">{brand.brandName}</span>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No brands available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllBrands;
