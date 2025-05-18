import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axois from "axios";
import { useDispatch } from "react-redux";
const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (Values.email === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axois.post(
          "https://bookstore-z1t8.onrender.com/api/v1/sign-in",
          Values
        );
        // console.log(response.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
        // navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow h-auto bg-gray-200 px-4 py-8 flex items-center justify-center">
        <div className="bg-gray-100 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-xl">Login</p>
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
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
                onClick={submit}
              >
                Login
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
  );
};

export default Login;
