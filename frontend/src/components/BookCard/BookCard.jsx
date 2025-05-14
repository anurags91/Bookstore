import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookCart({ data, Favourite }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  return (
    <div className="bg-gray-300 rounded p-4 flex flex-col">
      <Link to={`/view-book-detail/${data._id}`}>
        <div className="  ">
          <div className="bg-gray-100 rounded flex item-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 ">by {data.author}</p>
          <p className="mt-2 text-xl font-semibold">₹{data.price}</p>
        </div>
      </Link>
      {Favourite && (
        <button
          className="bg-gray-100 px-4 py-2 rounded border border-black-300 text-black  mt-4 cursor-pointer hover:bg-gray-300 font-semibold"
          onClick={handleRemoveBook}
        >
          Remove from favourite
        </button>
      )}
    </div>
  );
}

export default BookCart;
