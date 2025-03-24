import { createContext, useEffect, useState } from "react";
import { getCartItems } from "../services/allAPIS";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return; // No token, no API call

      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getCartItems(reqHeader);

      if (response?.data?.products) {
        setCartItems(response.data.products);
      } else {
        console.warn("Cart items response is empty.");
      }
    } catch (error) {
      console.warn("Could not fetch cart items. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
};
