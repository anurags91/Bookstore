import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className=" w-full mb:12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className=" text-4xl lg:text-6xl font-semibold text-yellow-400 text-center lg:text-left ">
          Discover your Next Read
          <p className="mt-4 text-xl text-black text-center lg:text-left">
            Discover your next great read from thousands of titles. From
            timeless classics to modern bestsellers — we’ve got it all. Shop
            easily, read endlessly, and let stories unfold.
          </p>
          <div className="mt-8">
            <Link
              to="/all-books"
              className="text-yellow-500 text-xl lg:text-2xl font-semibold border border-yellow-500 px-10 py-3 hover:bg-yellow-500 hover:text-white rounded-full"
            >
              Discover Books
            </Link>
          </div>
        </h1>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img src="./Hero2.png" alt="Hero" className="mt-8 lg:mt-0" />
      </div>
    </div>
  );
}

export default Hero;
