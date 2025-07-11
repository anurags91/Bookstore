import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const Allbooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-z1t8.onrender.com/api/v1/get-all-book"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-500 mt-4 ml-2 font-semibold">
        All Books
      </h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Allbooks;
