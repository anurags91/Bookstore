import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axois from "axios";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader/Loader";
import toast from "react-hot-toast";
const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    if (Values.email === "" || Values.password === "") {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await axois.post(
        "https://bookstore-z1t8.onrender.com/api/v1/sign-in",
        Values,
      );

      // console.log(response.data);
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/profile");
      // navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow h-auto bg-gray-200 px-4 py-8 flex items-center justify-center">
        {/* <div className="bg-gray-100 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6"> */}
        <div className="bg-gray-100 rounded-lg w-full md:w-4/6 lg:w-3/6 flex overflow-hidden shadow-lg">
          {/* Left Image Section */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1749136923265-76d33573af6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8"
              alt="Login"
              className="w-4/5 h-auto rounded-lg overflow-hidden scale-110 hover:scale-120 transition-transform duration-300 "
            />
          </div>
          <div className="w-full md:w-1/2 px-8 py-6">
            <p className="text-2xl font-bold">Login</p>
            <div className="mt-4">
              <div>
                <label className="mt-4">Email</label>
                <input
                  type="email"
                  className="w-full mt-2 p-2 border-2 rounded"
                  name="email"
                  value={Values.email}
                  onChange={change}
                  required
                />
                <label className="mt-4">Password</label>
                <input
                  type="password"
                  className="w-full mt-2 p-2 border-2 rounded"
                  name="password"
                  value={Values.password}
                  onChange={change}
                  required
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
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="flex mt-4 items-center justify-center font-semibold">
                  Or
                </p>
                <p className="flex mt-4 items-center justify-center font-semibold">
                  Don't have an account? &nbsp;
                  <Link to="/signup" className="hover:text-blue-500">
                    <u>Signup</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
