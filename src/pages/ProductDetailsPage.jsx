import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, addToFavourites, getProductDetails } from "../services/allAPIS";
import { server_url } from "../services/server_url";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../Context/CartContext";
import ProductReviews from "../components/ProductReviews";
import { UserContext } from "../Context/UserContext";
import { FavouriteContext } from "../Context/FavouriteContext";
import { ShoppingCartIcon, HeartIcon, TagIcon, CubeIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const userId = sessionStorage.getItem("existing_User_Id");
  const { loggedUser } = useContext(UserContext);
  const { fetchCartItems } = useContext(CartContext);
  const { fetchFavourites } = useContext(FavouriteContext);

  const fetchProductDetails = async () => {
    try {
      const productDetails = await getProductDetails(id);
      console.log("Fetched Product:", productDetails);
      setProduct(productDetails.data[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const cartFunction = async () => {
    const id = product._id;
    const productData = {
      productId: id,
      quantity: 1,
    };

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await addToCart(productData, reqHeader);
      if (result.status == 200) {
        toast.success("Product added to cart");
        fetchCartItems();
      } else {
        toast.warn("Product add to cart is failed!");
      }
    }
  };

  const addFavourite = async () => {
    const id = product._id;
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await addToFavourites(id, reqHeader);
      if (result.status == 200) {
        fetchFavourites();
        toast.success("Product added to favourites successfully");
      } else {
        toast.success(result.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-600 animate-pulse">Loading product details...</p>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto my-10 p-6">
      {/* Product Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 flex justify-center">
          <img src={`${server_url}/uploads/${product.productImage}`} alt={product.name} className="w-80 h-80 object-contain  border-gray-600 pr-20" />
        </motion.div>

        {/* Product Details */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <TagIcon className="w-6 h-6 text-gray-700" /> {product.name}
          </h2>
          <p className="text-xl font-semibold text-gray-700">₹{product.price}</p>
          <p className="text-gray-600 flex items-center gap-2">
            <CubeIcon className="w-5 h-5 text-gray-500" /> <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-gray-600">
            <strong>Total Quantity:</strong> {product.totalQuantity}
          </p>

          {/* Descriptions */}
          {product?.descriptions?.length > 0 && (
            <div>
              <strong>Descriptions:</strong>
              <ul className="list-disc ml-5 text-gray-600">
                {product.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={cartFunction} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={addFavourite} className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
              <HeartIcon className="w-5 h-5" /> Add to Favorites
            </motion.button>
          </div>
        </motion.div>
      </div>
      <ProductReviews productId={product._id} user={loggedUser} />
      <ToastContainer position="top-center" />
    </motion.div>
  );
};

export default ProductDetailsPage;
