import Header from "../components/Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/slices/booksSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <Header />
      <div className="min-h-screen">
        <h1 className="text-3xl text-center font-bold mt-10">Borrowed Books</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
