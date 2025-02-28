import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/allAPIS";

export const ProdcutContext = createContext();
export const ProdcutContextProdvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllproducts = async () => {
    const result = await getAllProducts();    
    setAllProducts(result.data);
  };  
  useEffect(() => {
    fetchAllproducts();
  }, []);
  const value = { allProducts, setAllProducts,fetchAllproducts };
  return (
    <ProdcutContext.Provider value={value}>
      {props.children}
    </ProdcutContext.Provider>
  );
};
