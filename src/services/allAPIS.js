import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";

export const loginAPI=async(reqBody)=>{
  return await commonAPI("POST", `${server_url}/login`, reqBody, "");
}
export const registerAPI=async(reqBody)=>{
  return await commonAPI("POST", `${server_url}/register`, reqBody, "");
}

export const addProductAPI = async (reqBody,reqHeader) => {   
    return await commonAPI("POST", `${server_url}/add-product`, reqBody, reqHeader);
  };

  // getAllProducts
  export const getAllProducts=async()=>{
    return await commonAPI("GET",`${server_url}/get-all-products`,"","")
  }

  // getProductDetails
  export const getProductDetails=async(id)=>{
    return await commonAPI("GET",`${server_url}/get-product-details/${id}`,"","")
  }

