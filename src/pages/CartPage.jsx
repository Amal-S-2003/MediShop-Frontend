import React, { useEffect, useState, useContext } from "react";
// import {  removeFromCart, clearCart } from "../services/cartAPI";
import { server_url } from "../services/server_url";
import { Link } from "react-router-dom";
import { getCartItems, removeCartItem } from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";

function CartPage() {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("in cart");
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          authorization: `Bearer ${token}`,
        };
        const response = await getCartItems(reqHeader);
        console.log(response.data);

        setCart(response.data || { products: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          authorization: `Bearer ${token}`,
        };
        const result = await removeCartItem(productId,reqHeader);
        console.log(result);

        if (result.status == 200) {
          toast.success("Item removed from cart");
        } else {
          toast.warn("Item not removed from cart");
        }
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCart({ products: [], totalPrice: 0 });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {loading ? (
        <p>Loading cart...</p>
      ) : cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.products.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img
                  src={`${server_url}/uploads/${item.productImage}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: ${cart.totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
          </div>
          <Link
            to="/checkout"
            className="block text-center bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-700"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
