import React from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4 ">
          <Link
            to="/profile"
            className="font-semibold w-full  text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="font-semibold w-full text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="font-semibold w-full text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4 ">
          <Link
            to="/profile"
            className="font-semibold w-full  text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="font-semibold w-full text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            Add Books
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileNav;
