import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState();
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(res.data.data);
    };
    fetch();
  }, [cart]);
  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        {
          id: localStorage.getItem("id"),
          order: cart,
        },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-12 h-screen py-8">
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-full flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold">Empty Cart</h1>
            <img src="cart.png" alt="empty-cart" className="lg:h-[50vh]" />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold mb-8">Your Cart</h1>
          {cart.map((item, i) => (
            <div
              className="bg-gray-300 w-full rounded flex flex-col md:flex-row justify-between items-start mx-4 my-4 p-4"
              key={i}
            >
              {/* Image */}
              <img
                src={item.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover rounded mb-4 md:mb-0 mr-4"
              />

              {/* Content Block */}
              <div className="flex flex-col md:flex-row justify-between items-start w-full mr-4">
                {/* Text Section */}
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold">{item.title}</h1>

                  <div className="mt-2">
                    <p className="text-base hidden lg:block">
                      {item.desc.slice(0, 100)}
                    </p>
                    <p className="text-base hidden md:block lg:hidden">
                      {item.desc.slice(0, 65)}
                    </p>
                    <p className="text-base block md:hidden">
                      {item.desc.slice(0, 100)}
                    </p>
                  </div>
                </div>

                {/* Price & Delete Button */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    ₹{item.price}
                  </h2>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 cursor-pointer"
                    onClick={() => deleteItem(item._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex item-center justify-end ">
          <div className="p-4 rounded bg-gray-200">
            <h1 className="text-3xl font-semibold ">Total Amount</h1>
            <div className="mt-3 flex items -center justify-between text-xl">
              <h2>{cart.length} Books</h2> <h2>₹ {total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="rounded px-4 py-2 flex justify-center w-full font-semibold bg-yellow-500 cursor-pointer"
                onClick={PlaceOrder}
              >
                {" "}
                Place a Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
