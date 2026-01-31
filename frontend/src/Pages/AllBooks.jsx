import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const Allbooks = () => {
  const [Data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://bookstore-z1t8.onrender.com/api/v1/get-all-book?page=${page}&limit=6&search=${search}`,
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching books :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, search]);
  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-500 mt-4 ml-2 font-semibold">
        All Books
      </h4>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search by Title or Author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to page 1 when searching
          }}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <>
          <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Data && Data.length > 0 ? (
              Data.map((items, i) => (
                <div key={i}>
                  <BookCard data={items} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No books found.
              </p>
            )}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 my-6">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            <span className="text-lg font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Allbooks;
