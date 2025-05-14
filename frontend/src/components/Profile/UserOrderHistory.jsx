import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setorderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      setorderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full p-0 md:p-4">
          <h1 className="text-3xl md:text-5xl font-semibold mb-8">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="bg-gray-300 mt-4 w-full rounded py-2 px-4 flex gap-4">
            <div className="w-[3%]">
              <h1 className="text-center font-semibold">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center font-semibold">Book</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="text-center font-semibold">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="text-center font-semibold">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="text-center font-semibold">Status</h1>
            </div>
            <div className="w-[5%] hidden md:block">
              <h1 className="text-center font-semibold">Mode</h1>
            </div>
          </div>

          {orderHistory.map((items, i) => (
            <div
              key={items._id || i}
              className="w-full rounded py-2 px-4 flex gap-4 hover:cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-detail/${items.book._id}`}
                  className="hover:text-blue-500 text-center block"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="truncate">{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className="w-[9%]">
                <h1 className="text-center">{items.book.price}</h1>
              </div>
              <div className="w-[16%]">
                {items.status === "Order placed" ? (
                  <h1 className="text-center text-yellow-500 font-semibold">
                    {items.status}
                  </h1>
                ) : items.status === "Cancelled" ? (
                  <h1 className="text-center text-red-500 font-semibold">
                    {items.status}
                  </h1>
                ) : (
                  <h1 className="text-center text-green-500 font-semibold">
                    {items.status}
                  </h1>
                )}
              </div>
              <div className="w-[5%] hidden md:block">
                <h1 className="text-sm text-center">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
