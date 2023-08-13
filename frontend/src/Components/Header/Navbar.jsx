import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import the Link component

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const isAdmin =
    isAuthenticated && user && user.user && user.user.role === "admin";
  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[black]">REPLIQ Limited</h1>
      <ul className="hidden md:flex">
        <li className="p-4">
          <Link to="/" className="text-blue-500 font-bold hover:underline">
            Home
          </Link>
        </li>
        {isAuthenticated ? (
          <li className="p-4">
            <Link
              to="/account"
              className="text-blue-500 font-bold hover:underline"
            >
              Account
            </Link>
          </li>
        ) : (
          <li className="p-4">
            <Link
              to="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="p-4">
            <Link
              to="/dashboard"
              className="text-blue-500 font-bold hover:underline"
            >
              Dashboard
            </Link>
          </li>
        )}
        <li className="p-4">
          <Link to="/cart" className="text-blue-500 font-bold hover:underline">
            Cart
          </Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} className="text-blue-500" />
        ) : (
          <AiOutlineMenu size={20} className="text-blue-500" />
        )}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[blue] m-4">REPLIQ.</h1>
        <li className="p-4 border-b border-gray-600">
          <Link to="/" className="text-blue-500 font-bold hover:underline">
            Home
          </Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link
            to="/company"
            className="text-blue-500 font-bold hover:underline"
          >
            Account
          </Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link
            to="/resources"
            className="text-blue-500 font-bold hover:underline"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
