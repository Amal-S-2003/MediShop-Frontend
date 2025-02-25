import React, { useContext, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLoggedIn } = useContext(UserContext);
  return (
    <nav className="bg-white shadow-lg px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/medi.jpg"
              alt="Medizintek Logo"
              className="h-12 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-green-700">
              Medizintek
            </span>
          </div>

          {/* Search Bar (Hidden in Mobile) */}
          <div className="hidden md:flex w-1/4 mx-6 relative">
            <input
              type="text"
              placeholder="Find anything here..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                  isActive && "text-white bg-gray-600 "
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                  isActive && "text-white bg-gray-600"
                }`
              }
            >
              Cart
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

            {/* <NavLink to="/login" className={({ isActive }) =>
                  `text-gray-600 py-1 px-3 rounded-full hover:text-white hover:bg-gray-600 ${
                    isActive && "text-white bg-gray-600"
                  }`
                }>
              About
            </NavLink> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 py-2 relative">
          <input
            type="text"
            placeholder="Find anything here..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <MagnifyingGlassIcon className="absolute left-6 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:text-green-600"
          >
            Home
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:text-green-600"
          >
            Card
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:text-green-600"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:text-green-600"
          >
            About
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
