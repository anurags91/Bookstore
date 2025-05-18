import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  {
    src: "https://images.pexels.com/photos/3952090/pexels-photo-3952090.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Book 1",
  },
  {
    src: "https://images.pexels.com/photos/4861363/pexels-photo-4861363.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Book 2",
  },
  {
    src: "https://images.pexels.com/photos/4865737/pexels-photo-4865737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Book 3",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="h-auto md:h-[75vh] flex flex-col md:flex-row items-center justify-center px-4 py-8 md:py-0 gap-8">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-yellow-400">
          Discover your Next Read
        </h1>
        <p className="mt-4 text-base sm:text-lg text-black max-w-md">
          Discover your next great read from thousands of titles. From timeless
          classics to modern bestsellers — we’ve got it all. Shop easily, read
          endlessly, and let stories unfold.
        </p>
        <div className="mt-6">
          <Link
            to="/all-books"
            className="text-yellow-500 text-base sm:text-lg font-semibold border border-yellow-500 px-6 py-2 sm:px-10 sm:py-3 hover:bg-yellow-500 hover:text-white rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right Side - Carousel */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative overflow-hidden rounded-xl shadow-lg">
          <div
            className="flex transition-transform duration-1000"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                className="w-full flex-shrink-0 object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
