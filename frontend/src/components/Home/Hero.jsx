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
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center px-4">
      {/* Left Side */}
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-400 text-center lg:text-left">
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

      {/* Right Side - Carousel */}
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <div className="w-full max-w-xl relative overflow-hidden rounded-xl shadow-lg">
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
