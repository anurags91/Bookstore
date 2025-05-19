import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-z1t8.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "https://bookstore-z1t8.onrender.com/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "https://bookstore-z1t8.onrender.com/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      "https://bookstore-z1t8.onrender.com/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <>
      {Data && (
        <div className="px-4  md:px-12 py-8 flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6  p-4">
            {/* Make flex-col on mobile so image is above icons */}
            <div className="flex flex-col lg:flex-row items-center p-4 rounded gap-4">
              <img
                src={Data.url}
                alt="Book"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col gap-4 mt-4 lg:mt-0">
                  <button
                    className="bg-white rounded-full text-3xl p-2 text-red-500 flex items-center justify-center cursor-pointer"
                    onClick={handleFavourite}
                  >
                    <FaHeart />{" "}
                    <span className="ms-4-block lg:hidden px-2">
                      Favourites
                    </span>
                  </button>
                  <button
                    className="text-white  rounded mt-8 md:mt-0 lg:rounded-full text-4xl lg:text-3xl p-3  lg:mt-8 bg-blue-500 flex items-center justify-center cursor-pointer"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4-block lg:hidden px-2">
                      {" "}
                      Add to cart
                    </span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col gap-4 mt-4 lg:mt-0">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white rounded-full text-3xl p-2  flex items-center justify-center cursor-pointer"
                  >
                    <FaEdit />
                    <span className="ms-4-block lg:hidden ">Edit</span>
                  </Link>
                  <button
                    className="text-white rounded lg:rounded-full text-2xl lg:text-3xl p-3 mt-8 md:mt-0 lg:mt-8 flex items-center justify-center bg-red-500 cursor-pointer"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                    <span className="ms-4-block lg:hidden px-2">
                      {" "}
                      Delete Book
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full sm:w-3/6 text-center sm:text-left">
            <h1 className="font-semibold text-3xl">{Data.title}</h1>
            <p className="font-semibold">by - {Data.author}</p>
            <p className="mt-4 text-xl">{Data.desc}</p>
            <p className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-xl font-semibold">Price: {Data.price}</p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
