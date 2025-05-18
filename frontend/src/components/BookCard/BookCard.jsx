import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
function BookCart({ data, Favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "https://bookstore-z1t8.onrender.com/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-gray-100 rounded p-4 flex flex-col w-[180px] h-[300px] ">
      <Link to={`/view-book-detail/${data._id}`}>
        <div className="w-full h-[170px] bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          <img
            src={data.url}
            alt={data.title}
            className="object-contain h-full w-full"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold truncate">{data.title}</h3>
        <p className="mt-1 text-sm text-gray-700 truncate">by {data.author}</p>
        <p className="mt-1 text-lg font-semibold text-black">₹{data.price}</p>
      </Link>

      {Favourite && (
        <button
          className="text-2xl text-red-600 ml-auto cursor-pointer mb-2"
          onClick={handleRemoveBook}
        >
          <MdDelete />
        </button>
      )}
    </div>
  );
}

export default BookCart;
