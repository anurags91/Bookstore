import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axois from "axios";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
function Signup() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    if (
      Values.username === "" ||
      Values.email === "" ||
      Values.password === "" ||
      Values.address === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);

      const response = await axois.post(
        "https://bookstore-z1t8.onrender.com/api/v1/sign-up",
        Values,
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow h-auto bg-gray-300 px-4 py-8 flex items-center justify-center">
        {/* <div className="bg-gray-200 rounded-lg px-6 py-5 w-full md:w-3/6 lg:w-2/6"> */}
        <div className="bg-gray-100 rounded-lg w-full md:w-4/6 lg:w-3/6 flex overflow-hidden shadow-lg">
          {/* Left Image Section */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1750698147237-2ca68f95b501?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D"
              alt="Login"
              className="w-4/5 h-auto rounded-lg flex items-center justify-center scale-110 hover:scale-120 transition-transform duration-300


"
            />
          </div>
          <div className="w-full md:w-1/2 px-8 py-6">
            <p className="text-2xl font-bold ">Sign Up</p>
            <div className="mt-4">
              <div>
                <label className="mt-4">Username</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border-2 rounded"
                  name="username"
                  placeholder="username"
                  required
                  value={Values.username}
                  onChange={change}
                />
                <label>Email</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border-2 rounded"
                  name="email"
                  placeholder="email"
                  required
                  value={Values.email}
                  onChange={change}
                />
                <label className="mt-4">Password</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border-2 rounded"
                  name="password"
                  placeholder="password"
                  required
                  value={Values.password}
                  onChange={change}
                />
                <label>Address</label>
                <textarea
                  className="w-full mt-2 p-2 border-2 rounded"
                  required
                  placeholder="address"
                  name="address"
                  value={Values.address}
                  onChange={change}
                />
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded cursor-pointer"
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader />
                      <span>Signing up...</span>
                    </div>
                  ) : (
                    "Signup"
                  )}
                </button>
                <p className="flex mt-4 items-center justify-center font-semibold">
                  Or
                </p>
                <p className="flex mt-4 items-center justify-center font-semibold">
                  Already have an account? &nbsp;
                  <Link to="/login" className="hover:text-blue-500">
                    <u>Login</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
