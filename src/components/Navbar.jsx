import React, { useContext, useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { getSearchResults } from "../services/allAPIS";
import { server_url } from "../services/server_url";
import { CartContext } from "../Context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { userLoggedIn } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
      document.documentElement.style.setProperty("--navbar-height", `${navbarRef.current.offsetHeight}px`);
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav ref={navbarRef} className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/medi.jpg" alt="Medizintek Logo" className="h-12 w-auto" />
              <span className="ml-2 text-xl font-semibold text-gray-700">Medizintek</span>
            </Link>

            {/* Search Bar */}
            <div className="relative hidden md:flex w-1/3 mx-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink to="/" className="text-gray-600 hover:text-gray-900 transition font-medium">Home</NavLink>
              <NavLink to="/about" className="text-gray-600 hover:text-gray-900 transition font-medium">About</NavLink>

              {/* Cart */}
              <NavLink to="/cart" className="relative text-gray-600 hover:text-gray-900 transition font-medium">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {userLoggedIn ? (
                <NavLink to="/profile" className="text-gray-600 hover:text-gray-900 transition font-medium">Profile</NavLink>
              ) : (
                <NavLink to="/login" className="text-gray-600 hover:text-gray-900 transition font-medium">Login</NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-3 py-4">
            <NavLink to="/" className="text-gray-700 hover:text-gray-900 transition font-medium" onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-gray-900 transition font-medium" onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/cart" className="relative text-gray-700 hover:text-gray-900 transition font-medium" onClick={() => setIsOpen(false)}>Cart</NavLink>
            {userLoggedIn ? (
              <NavLink to="/profile" className="text-gray-700 hover:text-gray-900 transition font-medium" onClick={() => setIsOpen(false)}>Profile</NavLink>
            ) : (
              <NavLink to="/login" className="text-gray-700 hover:text-gray-900 transition font-medium" onClick={() => setIsOpen(false)}>Login</NavLink>
            )}
          </div>
        </div>
      )}

      {/* Content Below Navbar */}
      <div className="mt-[var(--navbar-height)] ">
      
      </div>
    </>
  );
}

export default Navbar;
