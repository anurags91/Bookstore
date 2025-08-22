import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoBookSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(3, 3);
  }
  if (isLoggedIn == true && role === "user") {
    links.splice(5, 1);
  }
  if (isLoggedIn == true && role === "admin") {
    links.splice(4, 1);
  }
  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 relative flex bg-yellow-500 text-white px-8 py-4  justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <IoBookSharp className="text-xl mt-1" />
          <h1 className="text-xl font-semibold font-mono">BookHeaven</h1>
        </Link>

        <div className="nav-link-bookheaven block md:flex items-center gap-4 font-semibold">
          <div className=" hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center">
                {items.title === "Profile" ||
                items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className=" bg-blue-500 text-white font-semibold py-2  px-4 rounded hover:text-black transition duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-black transition duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:flex gap-4 items-center">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/login"
                  className="px-2 py-1 border border-yellow-800 rounded hover:bg-white hover:text-zinc-800 transition duration-300 outline-none"
                >
                  Login
                </Link>
                <Link
                  to="/Signup"
                  className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          <button
            className="block md:hidden text-white text-2xl hover:text-black mt-2"
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FiMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-gray-100 mt-16 fixed top-0 right-0 w-full sm:w-2/3 md:w-1/3 z-40 flex flex-col items-end justify-start px-2 md:hidden`}
      >
        {/* Cross Icon */}
  <button
    className="absolute top-4 left-4 text-3xl text-gray-700 hover:text-black"
    onClick={() => setMobileNav("hidden")}
  >
    <RxCross2 size={28} />
    
  </button>
        {links.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="text-2xl md:text-3xl font-semibold mb-8 hover:text-black transition duration-300"
            
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        <div className="flex flex-col justigy-center"
        onClick={() =>
  MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
}>
  <Link
    to="/login"
    className="px-8 mb-6 text-xl md:text-2xl font-semibold py-2 border border-yellow-800 rounded hover:bg-white hover:text-zinc-800 transition duration-300"
  >
    Login
  </Link>

  <Link
    to="/signup"
    className="px-8 text-xl md:text-2xl font-semibold py-2 bg-blue-500 text-white rounded hover:bg-white hover:text-zinc-800 transition duration-300"
  >
    Signup
  </Link>
</div>

      </div>
    </>
  );
};

export default Navbar;
