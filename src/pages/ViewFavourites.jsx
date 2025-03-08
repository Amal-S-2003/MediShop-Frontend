import React, { useContext, useEffect, useState } from "react";
import { getUserFavourites, removeFromFavourites } from "../services/allAPIS";
import { toast } from "react-toastify";
import { server_url } from "../services/server_url";
import { FaTrash, FaTag, FaBoxOpen } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FavouriteContext } from "../Context/FavouriteContext";

function ViewFavourites() {
  const {
    favouriteItems,
    setFavouriteItems,
    loading,
    setLoading,
    fetchFavourites,
  } = useContext(FavouriteContext);

  // ✅ Remove from Favourites
  const handleRemove = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please log in.");
      return;
    }
    const header = { authorization: `Bearer ${token}` };

    try {
      const result=await removeFromFavourites(productId, header);
      console.log(result);
      
      setFavouriteItems(
        favouriteItems.filter((item) => item.productId._id !== productId)
      );
      toast.success("Removed from favourites!");
      fetchFavourites();
    } catch (error) {
      toast.error("Failed to remove from favourites.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-grry-600">
        Your Favourite Products ❤️
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : favouriteItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No favourite products found.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favouriteItems.map(({ productId }) => (
            <div
              key={productId._id}
              className="border p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={`${server_url}/uploads/${productId.productImage}`}
                  alt={productId.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemove(productId._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
              <h3 className="font-bold text-lg mt-3 text-gray-800">
                {productId.name}
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <FaBoxOpen className="text-blue-500" /> ${productId.price}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaTag className="text-green-500" /> Brand: {productId.brand}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <MdCategory className="text-purple-500" /> Category:{" "}
                {productId.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewFavourites;
