import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductAdd from "./pages/ProductAdd";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
import CategoryProductPage from "./pages/CategoryProductPage";
import BrandProducts from "./pages/BrandProducts";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminViewProducts from "./pages/AdminViewProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminViewOrders from "./pages/AdminViewOrders";
import AdminViewUsers from "./pages/AdminViewUsers";
import AdminViewCategories from "./pages/AdminViewCategories";
import AdminViewBrands from "./pages/AdminViewBrands";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const { isAdminLogged } = useContext(UserContext);

  return (
    <>
      {isAdminLogged ? "" : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/category/:c" element={<CategoryProductPage />} />
        <Route path="/brands/:b" element={<BrandProducts />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />

        <Route
          path="/admin"
          element={isAdminLogged ? <AdminHome /> : <AdminLogin />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="view-products" element={<AdminViewProducts />} />
          <Route path="add-product" element={<ProductAdd />} />
          <Route path="view-brands" element={<AdminViewBrands />} />
          <Route path="view-categories" element={<AdminViewCategories />} />
          <Route path="view-users" element={<AdminViewUsers />} />
          <Route path="view-orders" element={<AdminViewOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
