import React, { useEffect, useState } from "react";
import BookCart from "../BookCard/BookCard";
import axios from "axios";
function Favourites() {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);
  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="text-5xl font-semibold h-[100%] flex items-center justify-center w-full flex-col ">
          No Favourite Books
          <img src="favourite.jpg" alt="image" className="h-[20vh] my-8" />
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCart data={items} Favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Favourites;
