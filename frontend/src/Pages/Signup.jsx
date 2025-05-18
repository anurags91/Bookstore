import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axois from "axios";
function Signup() {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axois.post(
          "https://bookstore-z1t8.onrender.com/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow h-auto bg-gray-300 px-4 py-8 flex items-center justify-center">
        <div className="bg-gray-200 rounded-lg px-6 py-5 w-full md:w-3/6 lg:w-2/6">
          <p className="text-xl">Sign Up</p>
          <div className="mt-4">
            <div>
              <label className="mt-4">Username</label>
              <input
                type="text"
                className="w-full bg-gray-100 mt-2 p-2 rounded outline-none"
                name="username"
                placeholder="username"
                required
                value={Values.username}
                onChange={change}
              />
              <label>Email</label>
              <input
                type="text"
                className="w-full bg-gray-100 mt-2 p-2 rounded outline-none"
                name="email"
                placeholder="email"
                required
                value={Values.email}
                onChange={change}
              />
              <label className="mt-4">Password</label>
              <input
                type="password"
                className="w-full bg-gray-100 mt-2 p-2 rounded outline-none"
                name="password"
                placeholder="password"
                required
                value={Values.password}
                onChange={change}
              />
              <label>Address</label>
              <textarea
                className="w-full mt-2 bg-gray-100 p-2 rounded outline-none"
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
              >
                Signup
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
  );
}

export default Signup;
