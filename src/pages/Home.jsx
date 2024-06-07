
import React, { useState } from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { images } from '../Assets';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get the list of books from Redux store
  const books = useSelector((state) => state.books) || [];

  // Function to handle changes in the search input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the list of books based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <Header />
      <div 
        className="min-h-screen bg-orange-200"
      >
        <div className="justify-center items-center p-5 mt-16">
          <h1 className="text-3xl text-center font-bold mt-5">Welcome to the Library</h1>
          <p className="mt-4 text-lg text-center">Explore our collection of books.</p>
        </div>

        <div className="p-5 mt-10">
          <div className=" bg-slate-50 flex max-w-md mx-auto items-center border border-gray-300 rounded-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search for books..."
              className="w-full  p-2 outline-none rounded-xl"
            />
            <img src={images.search} className="h-6 w-6 ml-2 " alt="Search Icon" />
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
