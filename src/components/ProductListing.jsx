import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductListing({ allProducts = [] }) {
  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No products available.
      </div>
    );
  }

  // Group products by category
  const groupedProducts = allProducts.reduce((acc, product) => {
    const category = product?.category || "Uncategorized"; // Fallback for missing category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-12">
          {/* Category Header */}
          <div className="flex justify-between items-center border-b-2 pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h2>

            {/* "View All" Button applied to every category */}
            <Link
              to={`/category/${encodeURIComponent(category)}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View All →
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.slice(0, 8).map((product) => (
              <Link key={product?._id} to={`/product-details/${product?._id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
