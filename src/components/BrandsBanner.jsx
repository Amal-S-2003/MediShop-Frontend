import React from "react";
import { Link } from "react-router-dom";

function BrandsBanner() {
  const brands = [
    { name: "Romsons", image: "brand-romsons.png" },
    { name: "Polymed", image: "brand-polymed.png" },
    { name: "Coloplast", image: "brand-coloplast.png" },
    { name: "3M", image: "brand-3m.png" },
    { name: "DrMorepen", image: "brand-Dr-morepen.png" },
    { name: "Adlisc", image: "brand-adlisc.png" },
  ];

  return (
    <div className="text-center p-6 border-t-2 border-gray-100">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Popular Brands</h2>
      <p className="text-xl text-gray-600 mb-6">Trusted by millions around the world</p>

      {/* Brand Logos Section */}
      <div className="flex flex-wrap justify-center items-center gap-16 p-6 bg-gray-100 rounded-lg">
        {brands.map((brand) => (
          <Link key={brand.name} to={`/brands/${brand.name}`} className="transition-transform transform hover:scale-110 ">
            <img src={brand.image} alt={brand.name} className="h-20 sm:h-24" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BrandsBanner;
