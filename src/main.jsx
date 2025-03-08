import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProdvider } from "./Context/ProductContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { OrderContextProvider } from "./Context/OrderContext.jsx";
import { CategoryContextProvider } from "./Context/CategoryContext.jsx";
import { BrandContextProvider } from "./Context/BrandContext.jsx";
import {  FavouriteContextProvider } from "./Context/FavouriteContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductContextProdvider>
        <UserContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <CategoryContextProvider>
                <BrandContextProvider>
                  <FavouriteContextProvider>
                    <App />
                  </FavouriteContextProvider>
                </BrandContextProvider>
              </CategoryContextProvider>
            </OrderContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ProductContextProdvider>
    </BrowserRouter>
  </StrictMode>
);
