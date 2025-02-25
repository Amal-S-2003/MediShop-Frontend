import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductAdd from "./pages/ProductAdd";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
  
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
          <Route path="add-product" element={<ProductAdd />} />
        <Route path="product-details/:id" element={<ProductDetailsPage />} />
        {/* <Route path="admin" element={<Login />}>
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
