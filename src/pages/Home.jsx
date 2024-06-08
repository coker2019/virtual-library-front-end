import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { images } from '../Assets';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const books = useSelector((state) => state.books) || [];

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

 
  const handleSearchIconClick = () => {
    setFilteredBooks(searchBooks(searchQuery, selectedCategory));
  };

  const searchBooks = (query, category) => {
    return books.filter((book) =>
      (category === '' || book.category === category) &&
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Initially display all books
  const [filteredBooks, setFilteredBooks] = useState(books);

  return (
    <div className="container mx-auto">
      <Header />
      <div className="min-h-screen bg-orange-200">
        <div className="justify-center items-center p-5 mt-16">
          <h1 className="text-3xl text-center font-bold mt-5">Welcome to the Library</h1>
          <p className="mt-4 text-lg text-center">Explore our collection of books.</p>
        </div>

        <div className="p-5 mt-10">
          <div className="flex flex-col items-center">
            <div className="bg-slate-50 flex w-[50%] mx-auto items-center border border-gray-300 rounded-lg">
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
                onClick={handleSearchIconClick}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {/* Display filtered list of books */}
            {filteredBooks.map((book) => (
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
