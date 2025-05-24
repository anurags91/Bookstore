import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState();
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-z1t8.onrender.com/api/v1/get-all-orders",
          { headers }
        );
        console.log("Fetched Orders:", response.data.data);
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };
  const submitChanges = async (i) => {
    // const id = OrderHistory[i]._id;
    const id = allOrders[i]._id;

    const response = await axios.put(
      `https://bookstore-z1t8.onrender.com/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    alert(response.data.message);
    window.location.reload();
  };
  const ordersToDisplay = allOrders ? allOrders.slice(0, -1) : [];
  // allOrders && allOrders.splice(allOrders.length - 1, 1);
  return (
    <>
      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 ">
          <h1 className="text-3xl md:text-5xl mb-8 font-semibold">
            All Orders
          </h1>
          <div className="bg-gray-300 mt-4 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center font-semibold">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="text-center font-semibold">Book</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="text-center font-semibold">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="text-center font-semibold">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="text-center font-semibold">Status</h1>
            </div>

            <div className="w-[10%] md:w-[5%] text-center flex-shrink-0">
              <h1 className="mt-1 ml-4">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {allOrders.map((items, i) => (
            <div
              key={i}
              className="w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-200 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%] text-center">{i + 1}</div>

              <div className="w-[40%] md:w-[22%] text-center">
                <Link
                  to={`/view-book-detail/${items.book._id}`}
                  className="hover:text-blue-500"
                >
                  {items.book.title}
                </Link>
              </div>

              <div className="w-0 md:w-[45%] text-center hidden md:block">
                {items.book.desc.slice(0, 50)}...
              </div>

              <div className="w-[17%] md:w-[9%] text-center">
                ₹ {items.book.price}
              </div>

              <div className="w-[30%] md:w-[16%] text-center">
                <button onClick={() => setOptions(i)}>
                  {items.status === "Order Placed" ? (
                    <span className="text-yellow-500">{items.status}</span>
                  ) : items.status === "Cancelled" ? (
                    <span className="text-red-500">{items.status}</span>
                  ) : (
                    <span className="text-green-500">{items.status}</span>
                  )}
                </button>
                <div
                  className={`${
                    Options === i ? "flex justify-center mt-1" : "hidden"
                  }`}
                >
                  <select
                    className="bg-gray-200"
                    onChange={change}
                    value={Values.status}
                  >
                    {[
                      "Order Placed",
                      "Out for delivery",
                      "Delivered",
                      "Cancelled",
                    ].map((val, idx) => (
                      <option value={val} key={idx}>
                        {val}
                      </option>
                    ))}
                  </select>
                  <button
                    className="text-green-500 hover:text-pink-600 mx-2"
                    onClick={() => {
                      setOptions(-1);
                      submitChanges(i);
                    }}
                  >
                    <FaCheck />
                  </button>
                </div>
              </div>

              <div className="w-[10%] md:w-[5%] text-center flex-shrink-0">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
