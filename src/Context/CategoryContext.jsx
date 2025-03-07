import { createContext, useEffect, useState } from "react";
import { viewCategories } from "../services/allAPIS";

export const CategoryContext = createContext();

export const CategoryContextProvider = ( props ) => {
    const [categories,setCategories]=useState([])
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }
  
    const reqHeader = { authorization: `Bearer ${token}` };
  
    const fetchCategories = async () => {
      try {
        const response = await viewCategories(reqHeader);
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);
  const value = {categories,setCategories,fetchCategories};
  return (
    <CategoryContext.Provider value={value}>
      {props.children}
    </CategoryContext.Provider>
  );
};
