import React, { useState } from "react";
import axios from "axios";
const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "BookImage");
    formData.append("cloud_name", "dnu1tzc7e");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnu1tzc7e/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);
      setData({ ...Data, url: data.secure_url });
    } catch (err) {
      console.error("Image Upload Error:", err);
      alert("Failed to upload image.");
    }
  };

  const submit = async () => {
    try {
      if (
        Data.image === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
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
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold mb-8">Add Book</h1>
      <div className="p-4 rounded bg-gray-200">
        <div>
          <label htmlFor="" className="">
            Image
          </label>
          <input
            type="file"
            className="w-full mt-2 bg-gray-100 p-2 outline-none"
            placeholder="upload the image"
            name="url"
            accept="image/*"
            required
            onChange={handleImageUpload}
          />
          {Data.url && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">Image Preview:</p>
              <img
                src={Data.url}
                alt="Uploaded"
                className="mt-2 w-64 h-64 object-cover rounded border"
              />
            </div>
          )}
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
            className="w-full mt-2 p-2  bg-gray-100 outline-none"
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
          Add Book
        </button>
      </div>
    </div>
  );
};
export default AddBook;
