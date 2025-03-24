import React, { useContext, useEffect } from "react";
import ProductListing from "../components/ProductListing";
import { ProductContext } from "../Context/ProductContext";
import Footer from "../components/Footer";
import BrandsBanner from "../components/BrandsBanner";
import HomeBanner from "../components/HomeBanner";
import CategoryBanner from "../components/CategoryBanner";

function Home() {
  const { allProducts, setAllProducts } = useContext(ProductContext);
  useEffect(() => {
    console.log(allProducts);
  }, []);
  return (
    <div className="">
      {/* Banner: Simple & Professional */}
      <HomeBanner />

      {/* Discount & Offer Based Banner with 8 Images in a Single Row */}
      <CategoryBanner />
      {/* Popular brands */}
      <BrandsBanner />

      {/* Prodcuts Listing */}
      <ProductListing allProducts={allProducts} />

      <Footer />
    </div>
  );
}

export default Home;
