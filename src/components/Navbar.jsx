import React, { useContext, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
  useEffect(() => {
    
    setCartCount(cartItems.length)
  }, [cartItems]);
  
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce Effect for Search
  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      const delayDebounce = setTimeout(async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = { authorization: `Bearer ${token}` };
          try {
            const result = await getSearchResults(query, reqHeader);
            setSuggestions(result?.data || []);
          } catch (error) {
            console.error("Search API Error:", error);
            setSuggestions([]);
          }
        }
        setLoading(false);
      }, 300);

      return () => clearTimeout(delayDebounce);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <nav className="bg-white shadow-lg px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/medi.jpg" alt="Medizintek Logo" className="h-12 w-auto" />
            <span className="ml-2 text-xl font-semibold text-gray-700">
              Medizintek
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:flex w-1/4 mx-6">
            <input
              type="text"
              placeholder="Find anything here..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />

            {/* Search Suggestions Dropdown */}
            {query.length > 1 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 p-2 z-10">
                <ul className="max-h-64 overflow-y-auto custom-scrollbar">
                  {loading ? (
                    <li className="text-center py-3 text-gray-500">Searching...</li>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((product) => (
                      <li key={product._id}>
                        <Link
                          to={`/product-details/${product._id}`}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
                          onClick={() => setQuery("")}
                        >
                          <img
                            src={`${server_url}/uploads/${product.productImage}`}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md mr-3 shadow-md"
                          />
                          <div>
                            <p className="text-gray-800 font-medium">{product.name}</p>
                            <p className="text-gray-600 font-semibold">${product.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="text-center py-3 text-gray-500">No products found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                  isActive && "text-white bg-gray-600"
                }`
              }
            >
              Home
            </NavLink>

            {/* Cart NavLink with Badge */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                  isActive && "text-white bg-gray-600"
                }`
              }
            >
              Cart
              {/* {cartItems > 0 && ( */}
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              {/* )} */}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                  isActive && "text-white bg-gray-600"
                }`
              }
            >
              About
            </NavLink>

            {userLoggedIn ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
