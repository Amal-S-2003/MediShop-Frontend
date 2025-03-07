import { createContext, useEffect, useState } from "react";
import { viewBrands } from "../services/allAPIS";

export const BrandContext = createContext();

export const BrandContextProvider = ( props ) => {
    const [brands,setBrands]=useState([])
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }
  
    const reqHeader = { authorization: `Bearer ${token}` };
  
    const fetchBrands = async () => {
      try {
        const response = await viewBrands(reqHeader);
        if (response.status === 200) {
          setBrands(response.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
  
    useEffect(() => {
        fetchBrands();
    }, []);
  const value = {brands,setBrands,fetchBrands};
  return (
    <BrandContext.Provider value={value}>
      {props.children}
    </BrandContext.Provider>
  );
};
