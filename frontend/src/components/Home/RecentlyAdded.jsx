import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";
const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-z1t8.onrender.com/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <h4 className="text-2xl sm:text-3xl text-yellow-500 text-center sm:text-left">
          Recently Added Books
        </h4>

        {!Data && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}

        <div className="my-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Data &&
            Data.map((items, i) => (
              <div key={i}>
                <BookCard data={items} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecentlyAdded;
