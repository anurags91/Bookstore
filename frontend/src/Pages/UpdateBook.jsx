import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "https://bookstore-z1t8.onrender.com/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-detail/${id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="h-[100%] p-0 md:p-4">
        <h1 className="text-3xl md:text-5xl font-semibold mb-8">Update Book</h1>
        <div className="p-4 rounded bg-gray-200">
          <div>
            <label htmlFor="" className="">
              Image
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-100 p-2 outline-none"
              placeholder="URL of the image"
              name="url"
              required
              value={Data.url}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="">
              Title of the Book
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2  bg-gray-100 outline-none"
              placeholder="Title of the book"
              name="title"
              required
              value={Data.title}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="">
              Author of the Book
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2  bg-gray-100  p-2 outline-none"
              placeholder="Author of the image"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label htmlFor="" className="">
                Language
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 bg-gray-100 outline-none"
                placeholder="language of book"
                name="language"
                required
                value={Data.language}
                onChange={change}
              />
            </div>
            <div className="w-3/6">
              <label htmlFor="" className="">
                Price
              </label>
              <input
                type="number"
                className="w-full mt-2 p-2 bg-gray-100  outline-none"
                placeholder="Price of book"
                name="price"
                required
                value={Data.price}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="">
              Description of the book
            </label>
            <textarea
              className="w-full mt-2 bg-gray-100  outline-none p-2"
              rows="5"
              placeholder=" Description of the book "
              name="desc"
              required
              value={Data.desc}
              onChange={change}
            />
          </div>
          <button
            className="mt-4 px-3 bg-blue-500 font-semibold py-2 hover:bg-blue-600 transition-all"
            onClick={submit}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
