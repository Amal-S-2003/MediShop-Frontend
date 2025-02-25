import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProdcutContextProdvider } from "./Context/ProductContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProdcutContextProdvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ProdcutContextProdvider>
    </BrowserRouter>
  </StrictMode>
);
