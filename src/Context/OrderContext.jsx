import { createContext, useEffect, useState } from "react";
import { getAllOrders, getOrders } from "../services/allAPIS";

export const OrderContext = createContext();
export const OrderContextProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
    fetchUserOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getOrders(reqHeader);
      console.log(response);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getAllOrders(reqHeader);
      if (response.data.length>0) {
        
      }
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log(response);

      setUserOrders(sortedOrders);
      // setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const value = {
    orders,
    setOrders,
    fetchOrders,
    fetchUserOrders,
    userOrders,
    setUserOrders,
  };
  return (
    <OrderContext.Provider value={value}>
      {props.children}
    </OrderContext.Provider>
  );
};
