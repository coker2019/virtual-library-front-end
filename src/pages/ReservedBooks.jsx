import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservedBooks } from '../redux/slices/reservedBooksSlice';
import Header from '../components/Header';

const ReservedBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.reservedBooks);

  useEffect(() => {
    dispatch(fetchReservedBooks());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <Header />
      <div className="min-h-screen bg-orange-200">
        <h1 className="text-3xl text-center font-bold mt-10">Reserved Books</h1>
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

export default ReservedBooks;
