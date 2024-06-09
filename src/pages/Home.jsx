
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BookList from './BookList';
import { images } from '../Assets';

const Home = () => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const selectedCategory = location.state?.category || '';
  const books = useSelector((state) => state.books.books) || [];

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchBooks = (query, category) => {
    return books.filter((book) =>
      (category === '' || book.category === category) &&
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    setFilteredBooks(searchBooks(searchQuery, selectedCategory));
  }, [searchQuery, selectedCategory, books]);

  const [filteredBooks, setFilteredBooks] = useState(books);

  return (
    <div className="container mx-auto">
      <Header />
      <div className="min-h-screen bg-orange-200">
        <div className="justify-center items-center p-5 mt-16">
          <h1 className="text-3xl text-center font-bold mt-10">Welcome to the Library</h1>
          <p className="mt-4 text-lg text-center">Explore our collection of books.</p>
        </div>

        <div className="p-5 mt-10">
          <div className="flex flex-col items-center">
            <div className="bg-slate-50 flex w-[50%] mx-auto items-center border border-gray-700 ring-primaryBlack rounded-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search for books..."
                className="w-full relative text-center p-2 outline-none rounded-xl"
              />
              <img
                src={images.search}
                className="h-6 w-6 ml-2 cursor-pointer"
                alt="Search Icon"
                onClick={() => setFilteredBooks(searchBooks(searchQuery, selectedCategory))}
              />
            </div>
          </div>

          <BookList books={filteredBooks} />
        </div>
      </div>
    </div>
  );
};

export default Home;

