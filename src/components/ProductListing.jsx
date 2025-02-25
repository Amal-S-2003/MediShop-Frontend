import React from "react";
import { server_url } from "../services/server_url";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function ProductListing({ allProducts }) {
  console.log(allProducts, "allproducts in product listing");

  const groupedProducts = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-12">
            {/* Category Name */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <Link to={`/product-details/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
