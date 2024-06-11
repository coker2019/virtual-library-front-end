import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { images } from '../Assets';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Memoize the books from the Redux store
  const books = useSelector((state) => state.books || []);
  const memoizedBooks = useMemo(() => books, [books]);

  console.log('memoizedBooks:', memoizedBooks); // Debugging line

  // Memoize the searchBooks function
  const searchBooks = useCallback((query, category = '') => {
    if (!Array.isArray(memoizedBooks)) {
      return [];
    }
    return memoizedBooks.filter((book) =>
      (category === '' || book.category === category) &&
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [memoizedBooks]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  // Ensure useEffect dependencies are stable
  useEffect(() => {
    setFilteredBooks(searchBooks(searchQuery));
  }, [searchQuery, searchBooks]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchIconClick = () => {
    setFilteredBooks(searchBooks(searchQuery));
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      <div className="min-h-screen bg-orange-200">
        <div className="justify-center items-center p-5 mt-16">
          <h1 className="text-3xl text-center font-bold mt-10">Welcome to the Library</h1>
          <p className="mt-4 text-lg text-center">Explore our collection of books.</p>
        </div>

        <div className="p-5 mt-10">
          <div className="flex flex-col items-center">
            <div className="bg-slate-50 flex w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto items-center border border-gray-700 ring-primaryBlack rounded-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for books..."
                className="w-full relative text-center p-2 outline-none rounded-lg"
              />
              <img
                src={images.search}
                className="h-6 w-6 ml-2 cursor-pointer"
                alt="Search Icon"
                onClick={handleSearchIconClick}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {Array.isArray(filteredBooks) && filteredBooks.map((book) => (
              <div key={book.id} className="bg-white p-4 shadow-md rounded-md">
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
