import { createContext, useEffect, useState } from "react";
import { getCartItems } from "../services/allAPIS";

export const CartContext = createContext();
export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getCartItems(reqHeader);
      console.log(result.data);
      setCartItems(result.data.products)
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  const value = { cartItems, setCartItems };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
